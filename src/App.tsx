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
    <div className="relative min-h-screen bg-white dark:bg-black text-slate-900 dark:text-slate-100 transition-colors duration-300 antialiased overflow-x-hidden selection:bg-red-500/20 selection:text-red-500">
      
      {/* Ambient Radial Glow Backdrop inspired by reference */}
      <div className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center overflow-hidden">
        <div className="w-[850px] h-[850px] rounded-full blur-[140px] bg-gradient-to-r from-pink-400/25 via-red-400/20 to-orange-400/25 dark:from-red-600/15 dark:via-pink-600/10 dark:to-orange-500/15" />
      </div>

      {/* Skip to Main Content Link for Keyboard and Screen Readers */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-red-500 focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none font-semibold text-xs uppercase tracking-wider"
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
