import React from 'react';
import { useTheme } from './hooks/useTheme';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { Skills } from './sections/Skills';
import { About } from './sections/About';
import { Projects } from './sections/Projects';
import { Services } from './sections/Services';
import { Education } from './sections/Education';
import { Competitive } from './sections/Competitive';
import { ResumeSection } from './sections/Resume';
import { Contact } from './sections/Contact';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] dark:bg-[#030712] text-slate-900 dark:text-slate-100 transition-colors duration-300 antialiased overflow-x-hidden selection:bg-blue-500/20 selection:text-blue-600 dark:selection:text-cyan-400">
      
      {/* Subtle Background Grid Pattern */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-grid-pattern opacity-60 dark:opacity-30" />

      {/* Atmospheric Ambient Glow Orbs (Electric Blue, Violet, Cyan) */}
      <div className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center overflow-hidden">
        <div className="w-[650px] h-[650px] -top-24 -left-24 absolute rounded-full blur-[140px] bg-blue-500/15 dark:bg-blue-600/10" />
        <div className="w-[700px] h-[700px] top-1/3 -right-32 absolute rounded-full blur-[150px] bg-violet-500/15 dark:bg-violet-600/10" />
        <div className="w-[600px] h-[600px] -bottom-24 left-1/4 absolute rounded-full blur-[130px] bg-cyan-500/15 dark:bg-cyan-500/10" />
      </div>

      {/* Skip to Main Content Link for Keyboard and Screen Readers */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none font-semibold text-xs uppercase tracking-wider"
      >
        Skip to main content
      </a>

      {/* Sticky Top Navigation */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Main Content Sections */}
      <main id="main-content" className="relative z-10 w-full">
        <Hero />
        <Skills />
        <About />
        <Projects />
        <Services />
        <Education />
        <Competitive />
        <ResumeSection />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
