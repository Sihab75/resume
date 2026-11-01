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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'about', 'skills', 'projects', 'services', 'education', 'competitive', 'contact'];
      const scrollPos = window.scrollY + 120;

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

    window.addEventListener('scroll', handleScroll);
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
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'Education', href: '#education', id: 'education' },
    { label: 'Competitive', href: '#competitive', id: 'competitive' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 no-print ${
        isScrolled
          ? 'bg-white/85 dark:bg-black/85 backdrop-blur-xl border-b border-red-100/60 dark:border-zinc-800/80 shadow-md shadow-red-500/5'
          : 'bg-transparent py-2'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Name */}
          <a
            href="#home"
            className="flex items-center gap-3 group shrink-0"
            aria-label="Md. Korimul Jaman - Home"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 via-red-500 to-orange-500 text-white font-bold flex items-center justify-center shadow-lg shadow-red-500/30 group-hover:scale-105 transition-all text-sm font-mono tracking-tight">
              &lt;KJ/&gt;
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-extrabold tracking-tight uppercase text-slate-900 dark:text-white group-hover:text-red-500 transition-colors">
                {personalProfile.fullName}
              </span>
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                CSE • Green University
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 font-medium" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'text-red-500 font-bold border-b-2 border-red-500 bg-red-50/50 dark:bg-red-950/20'
                      : 'text-slate-700 dark:text-slate-300 hover:text-red-500 dark:hover:text-red-400 hover:bg-slate-100/80 dark:hover:bg-zinc-800/60'
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
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-zinc-800 rounded-full transition-colors hidden sm:inline-flex"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            <a
              href={personalProfile.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-[#0077B5] hover:bg-blue-50 dark:hover:bg-zinc-800 rounded-full transition-colors hidden sm:inline-flex"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>

            {/* Dark/Light Theme Toggle */}
            <button
              onClick={toggleTheme}
              type="button"
              className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
              ) : (
                <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
              )}
            </button>

            {/* Prominent "Let's Connect" Button */}
            <a
              href="#contact"
              className="hidden md:inline-flex items-center gap-1.5 px-4.5 py-2 rounded-full text-xs sm:text-sm font-bold text-red-500 border-2 border-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 shadow-sm hover:shadow-red-500/25 active:scale-95 whitespace-nowrap"
            >
              <span>Let's Connect</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 rounded-lg text-slate-700 dark:text-slate-200 lg:hidden hover:bg-slate-100 dark:hover:bg-zinc-800 focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-red-500" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav"
          className="lg:hidden absolute top-20 right-4 left-4 p-5 rounded-2xl bg-white/95 dark:bg-zinc-950/95 backdrop-blur-2xl border border-red-100 dark:border-zinc-800 shadow-2xl space-y-2 z-50 animate-in fade-in slide-in-from-top-4 duration-200"
        >
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-between ${
                    isActive
                      ? 'text-red-500 bg-red-50 dark:bg-red-950/30'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-zinc-900 hover:text-red-500'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-red-500" />}
                </a>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-zinc-800 flex items-center justify-between gap-3">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-full font-bold text-sm bg-red-500 hover:bg-red-600 text-white shadow-md shadow-red-500/30 transition-all"
            >
              Let's Connect
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
