import { useEffect, useRef } from 'react';

const MAX_RIPPLES = 4;
const RIPPLE_LIFETIME = 2.8;
const VERTEX_SHADER = `
  attribute vec2 aPosition;
  varying vec2 vUv;

  void main() {
    vUv = aPosition * 0.5 + 0.5;
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision mediump float;

  uniform vec2 uResolution;
  uniform float uTime;
  uniform float uTheme;
  uniform vec4 uRipples[${MAX_RIPPLES}];
  varying vec2 vUv;

  void main() {
    float time = uTime * 0.22;
    float aspect = uResolution.x / uResolution.y;
    vec2 surface = vUv * vec2(aspect, 1.0);
    vec2 flow = vec2(0.0);
    float rippleLight = 0.0;

    for (int i = 0; i < ${MAX_RIPPLES}; i++) {
      vec4 ripple = uRipples[i];
      float age = uTime - ripple.z;
      if (age < 0.0 || age > ${RIPPLE_LIFETIME}) continue;

      vec2 delta = surface - ripple.xy * vec2(aspect, 1.0);
      float distanceToRipple = length(delta);
      float fade = exp(-age * 1.05) * ripple.w;
      float ring = sin(distanceToRipple * 76.0 - age * 10.0);
      float envelope = exp(-distanceToRipple * 5.2);
      flow += normalize(delta + vec2(0.0001)) * ring * envelope * fade * 0.026;
      rippleLight += pow(max(0.0, sin(distanceToRipple * 76.0 - age * 10.0)), 12.0)
        * envelope * fade * 0.18;
    }

    vec2 p = (surface + flow) * vec2(3.4, 4.2);
    float waveA = sin(p.x * 3.2 + sin(p.y * 1.7 + time) * 0.78 + time * 0.18);
    float waveB = sin(p.y * 3.55 + sin(p.x * 1.55 - time * 0.82) * 0.74 - time * 0.14);
    float causticProduct = abs(waveA * waveB);
    float caustics = pow(max(0.0, 0.22 - causticProduct), 2.0) * 3.8;

    float rayShape = sin(
      (vUv.x * 8.0 + sin(vUv.y * 4.2 + time * 0.35) * 0.42 + time * 0.08) * 3.14159
    );
    float rays = pow(max(0.0, rayShape), 18.0) * smoothstep(0.08, 0.96, vUv.y);
    float sunGlow = exp(-length((vUv - vec2(0.34, 1.02)) * vec2(1.0, 1.8)) * 2.4);

    vec3 deepWater = mix(vec3(0.3, 0.65, 0.73), vec3(0.008, 0.055, 0.16), uTheme);
    vec3 midWater = mix(vec3(0.53, 0.83, 0.84), vec3(0.012, 0.19, 0.34), uTheme);
    vec3 sunlitWater = mix(vec3(0.84, 0.97, 0.92), vec3(0.035, 0.36, 0.47), uTheme);
    float depth = smoothstep(0.0, 0.95, vUv.y);
    vec3 color = mix(deepWater, midWater, smoothstep(0.0, 0.66, depth));
    color = mix(color, sunlitWater, smoothstep(0.55, 1.0, depth) * 0.74);
    color += vec3(0.02, 0.12, 0.16) * sunGlow * 0.44;
    color += vec3(0.3, 0.84, 0.91) * (caustics * 0.82 + rippleLight);
    color += vec3(0.12, 0.62, 0.78) * rays * 0.13;

    gl_FragColor = vec4(color, 1.0);
  }
`;

interface Ripple {
  x: number;
  y: number;
  time: number;
  strength: number;
}

interface NavigatorConnection extends Navigator {
  connection?: { saveData?: boolean };
}

function isLowPowerDevice(): boolean {
  const cores = navigator.hardwareConcurrency;
  return window.innerWidth < 768 ||
    (cores > 0 && cores <= 4) ||
    Boolean((navigator as NavigatorConnection).connection?.saveData);
}

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function WaterDistortion() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const ripples: Ripple[] = [];
    let gl: WebGLRenderingContext | null = null;
    let program: WebGLProgram | null = null;
    let buffer: WebGLBuffer | null = null;
    let animationFrame = 0;
    let lastPointerTime = 0;
    let lastPointerX = 0;
    let lastPointerY = 0;
    let destroyed = false;
    let resolutionLocation: WebGLUniformLocation | null = null;
    let timeLocation: WebGLUniformLocation | null = null;
    let themeLocation: WebGLUniformLocation | null = null;
    let ripplesLocation: WebGLUniformLocation | null = null;
    let positionLocation = -1;

    const releaseRenderer = () => {
      if (gl && buffer) gl.deleteBuffer(buffer);
      if (gl && program) gl.deleteProgram(program);
      buffer = null;
      program = null;
      resolutionLocation = null;
      timeLocation = null;
      themeLocation = null;
      ripplesLocation = null;
      positionLocation = -1;
    };

    const setSize = () => {
      if (!gl) return;
      const width = window.innerWidth;
      const height = window.innerHeight;
      const ratio = Math.min(
        window.devicePixelRatio || 1,
        1.25,
        Math.sqrt(600_000 / (width * height))
      );
      const pixelWidth = Math.max(1, Math.round(width * ratio));
      const pixelHeight = Math.max(1, Math.round(height * ratio));
      if (canvas.width === pixelWidth && canvas.height === pixelHeight) return;

      canvas.width = pixelWidth;
      canvas.height = pixelHeight;
      gl.viewport(0, 0, pixelWidth, pixelHeight);
      if (resolutionLocation) gl.uniform2f(resolutionLocation, pixelWidth, pixelHeight);
    };

    const stopAnimation = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
    };

    const render = (frameTime: number) => {
      animationFrame = 0;
      if (destroyed || document.hidden || !gl || !program) return;

      const now = frameTime * 0.001;
      while (ripples.length > 0 && now - ripples[0].time > RIPPLE_LIFETIME) ripples.shift();
      const rippleData = new Float32Array(MAX_RIPPLES * 4);
      ripples.forEach((ripple, index) => {
        rippleData.set([ripple.x, ripple.y, ripple.time, ripple.strength], index * 4);
      });

      gl.useProgram(program);
      gl.uniform1f(timeLocation, now);
      gl.uniform1f(themeLocation, document.documentElement.classList.contains('dark') ? 1 : 0);
      gl.uniform4fv(ripplesLocation, rippleData);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrame = window.requestAnimationFrame(render);
    };

    const addRipple = (event: PointerEvent) => {
      if (destroyed || reducedMotion.matches || document.hidden || !gl || !program) return;
      if (event.pointerType === 'touch') return;

      const now = performance.now() * 0.001;
      const dx = event.clientX - lastPointerX;
      const dy = event.clientY - lastPointerY;
      const distanceSquared = dx * dx + dy * dy;
      if (event.type === 'pointermove' && (now - lastPointerTime < 0.055 || distanceSquared < 90)) return;

      lastPointerTime = now;
      lastPointerX = event.clientX;
      lastPointerY = event.clientY;
      const speedStrength = Math.min(1.5, Math.max(0.8, Math.sqrt(distanceSquared) / 18));
      ripples.push({
        x: event.clientX / window.innerWidth,
        y: 1 - event.clientY / window.innerHeight,
        time: now,
        strength: event.type === 'pointerdown' ? 1.55 : speedStrength
      });
      if (ripples.length > MAX_RIPPLES) ripples.shift();
    };

    const initialize = () => {
      stopAnimation();
      releaseRenderer();
      ripples.length = 0;

      if (reducedMotion.matches) {
        canvas.dataset.effect = 'disabled';
        return;
      }

      if (isLowPowerDevice()) {
        canvas.dataset.effect = 'fallback';
        return;
      }

      const context = canvas.getContext('webgl', {
        alpha: false,
        antialias: false,
        depth: false,
        stencil: false,
        powerPreference: 'high-performance'
      });
      if (!context) {
        canvas.dataset.effect = 'fallback';
        return;
      }

      const vertexShader = compileShader(context, context.VERTEX_SHADER, VERTEX_SHADER);
      const fragmentShader = compileShader(context, context.FRAGMENT_SHADER, FRAGMENT_SHADER);
      const nextProgram = context.createProgram();
      if (!vertexShader || !fragmentShader || !nextProgram) {
        if (vertexShader) context.deleteShader(vertexShader);
        if (fragmentShader) context.deleteShader(fragmentShader);
        if (nextProgram) context.deleteProgram(nextProgram);
        canvas.dataset.effect = 'fallback';
        return;
      }

      context.attachShader(nextProgram, vertexShader);
      context.attachShader(nextProgram, fragmentShader);
      context.linkProgram(nextProgram);
      context.deleteShader(vertexShader);
      context.deleteShader(fragmentShader);
      if (!context.getProgramParameter(nextProgram, context.LINK_STATUS)) {
        context.deleteProgram(nextProgram);
        canvas.dataset.effect = 'fallback';
        return;
      }

      gl = context;
      program = nextProgram;
      positionLocation = gl.getAttribLocation(program, 'aPosition');
      resolutionLocation = gl.getUniformLocation(program, 'uResolution');
      timeLocation = gl.getUniformLocation(program, 'uTime');
      themeLocation = gl.getUniformLocation(program, 'uTheme');
      ripplesLocation = gl.getUniformLocation(program, 'uRipples[0]');
      buffer = gl.createBuffer();
      if (!buffer) {
        releaseRenderer();
        canvas.dataset.effect = 'fallback';
        return;
      }

      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
      gl.useProgram(program);
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
      gl.disable(gl.BLEND);
      setSize();
      canvas.dataset.effect = 'webgl';
      animationFrame = window.requestAnimationFrame(render);
    };

    const handleVisibility = () => {
      if (document.hidden) {
        stopAnimation();
        ripples.length = 0;
      } else if (canvas.dataset.effect === 'webgl' && gl && program) {
        animationFrame = window.requestAnimationFrame(render);
      } else if (!reducedMotion.matches) {
        initialize();
      }
    };

    const handleResize = () => {
      if (reducedMotion.matches) {
        initialize();
      } else if (isLowPowerDevice()) {
        stopAnimation();
        releaseRenderer();
        ripples.length = 0;
        canvas.dataset.effect = 'fallback';
      } else if (gl && program) {
        setSize();
      } else {
        initialize();
      }
    };

    const handleContextLost = (event: Event) => {
      event.preventDefault();
      stopAnimation();
      releaseRenderer();
      canvas.dataset.effect = 'fallback';
    };

    initialize();
    window.addEventListener('pointermove', addRipple, { passive: true });
    window.addEventListener('pointerdown', addRipple, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    document.addEventListener('visibilitychange', handleVisibility);
    reducedMotion.addEventListener('change', initialize);
    canvas.addEventListener('webglcontextlost', handleContextLost);

    return () => {
      destroyed = true;
      stopAnimation();
      window.removeEventListener('pointermove', addRipple);
      window.removeEventListener('pointerdown', addRipple);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
      reducedMotion.removeEventListener('change', initialize);
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      releaseRenderer();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="water-distortion-canvas"
      aria-hidden="true"
      data-effect="initializing"
    />
  );
}
