import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalProfile } from '../data/profile';

interface NavbarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Calculate scroll progress percentage
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }

      // Track active section
      const sections = ['home', 'skills', 'about', 'projects', 'services', 'education', 'competitive', 'contact'];
      const scrollPos = window.scrollY + 140;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Focus', href: '#services', id: 'services' },
    { label: 'Education', href: '#education', id: 'education' },
    { label: 'Competitive', href: '#competitive', id: 'competitive' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 no-print ${
        isScrolled
          ? 'bg-white/80 dark:bg-[#030712]/80 backdrop-blur-xl border-b border-slate-200/70 dark:border-slate-800/70 shadow-sm dark:shadow-black/20'
          : 'bg-transparent py-2'
      }`}
    >
      {/* Scroll Progress Bar */}
      <div 
        className="absolute top-0 left-0 h-[2.5px] bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 transition-all duration-150 ease-out z-50"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo & Name */}
          <a
            href="#home"
            className="flex items-center gap-3 group shrink-0"
            aria-label="Md. Korimul Jaman - Home"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 text-white font-bold flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-all text-sm font-mono tracking-tight">
              &lt;KJ/&gt;
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                {personalProfile.fullName}
              </span>
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                CSE • Green University
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 font-medium" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'text-blue-600 dark:text-cyan-400 bg-blue-50/80 dark:bg-blue-950/40 shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 hover:bg-slate-100/70 dark:hover:bg-slate-800/50'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action Group */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Social Icons */}
            <a
              href={personalProfile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile (@Sihab75)"
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 rounded-full transition-colors hidden sm:inline-flex"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            <a
              href={personalProfile.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 hover:bg-blue-50 dark:hover:bg-slate-800/60 rounded-full transition-colors hidden sm:inline-flex"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>

            {/* Dark/Light Theme Toggle with Accessible Semantics */}
            <button
              onClick={toggleTheme}
              type="button"
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 transition-colors cursor-pointer"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              title={theme === 'dark' ? 'Activate Light Mode' : 'Activate Dark Mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 transition-transform duration-300 hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 transition-transform duration-300 hover:-rotate-12" />
              )}
            </button>

            {/* Prominent "Let's Connect" Button */}
            <a
              href="#contact"
              className="hidden md:inline-flex items-center gap-1.5 px-4.5 py-2 rounded-full text-xs sm:text-sm font-semibold text-blue-600 dark:text-cyan-400 border border-blue-500/40 dark:border-cyan-500/30 bg-blue-50/50 dark:bg-cyan-950/20 hover:bg-blue-600 hover:text-white dark:hover:bg-cyan-500 dark:hover:text-slate-950 transition-all duration-300 shadow-xs hover:shadow-blue-500/20 active:scale-95 whitespace-nowrap"
            >
              <span>Let's Connect</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 rounded-lg text-slate-700 dark:text-slate-200 lg:hidden hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-blue-600 dark:text-cyan-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav"
          className="lg:hidden absolute top-16 sm:top-20 right-4 left-4 p-5 rounded-2xl bg-white/95 dark:bg-[#0B0F17]/95 backdrop-blur-2xl border border-slate-200 dark:border-slate-800 shadow-2xl space-y-2 z-50 animate-in fade-in slide-in-from-top-4 duration-200"
        >
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-between ${
                    isActive
                      ? 'text-blue-600 dark:text-cyan-400 bg-blue-50 dark:bg-blue-950/40'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-blue-600'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-cyan-400" />}
                </a>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-full font-bold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/30 transition-all"
            >
              Let's Connect
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
