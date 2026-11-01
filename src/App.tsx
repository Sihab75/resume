import React from 'react';
import { useTheme } from './hooks/useTheme';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { Competitive } from './sections/Competitive';
import { Education } from './sections/Education';
import { ResumeSection } from './sections/Resume';
import { Contact } from './sections/Contact';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Skip to Main Content Link for Keyboard and Screen Readers */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-cyan-500 focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none font-semibold text-xs uppercase tracking-wider"
      >
        Skip to main content
      </a>

      {/* Sticky Top Navigation */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Main Content Sections */}
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Competitive />
        <Education />
        <ResumeSection />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
