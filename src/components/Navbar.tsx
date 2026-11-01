import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, FileDown } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalProfile } from '../data/profile';
import { downloadResumePDF } from '../utils/pdfGenerator';

interface NavbarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
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
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'CP Profiles', href: '#competitive' },
    { label: 'Education', href: '#education' },
    { label: 'Resume', href: '#resume' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 no-print ${
        isScrolled
          ? 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 shadow-sm dark:shadow-black/20'
          : 'bg-transparent py-2'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2.5 group font-mono text-lg font-bold tracking-tight text-slate-900 dark:text-white"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <span className="font-mono font-black text-sm tracking-tighter">&lt;KJ/&gt;</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold leading-tight group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                Korimul Jaman
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                CSE • Green Univ
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 rounded-lg transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* GitHub Quick Link */}
            <a
              href={personalProfile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile (@Sihab75)"
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <GithubIcon className="w-5 h-5" />
            </a>

            {/* LinkedIn Quick Link */}
            <a
              href={personalProfile.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <LinkedinIcon className="w-5 h-5" />
            </a>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              type="button"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
            </button>

            {/* Download Resume Button */}
            <button
              onClick={downloadResumePDF}
              type="button"
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg shadow-sm hover:shadow transition-all cursor-pointer"
            >
              <FileDown className="w-4 h-4" />
              <span>Resume</span>
            </button>
          </div>

          {/* Mobile Menu & Theme Button */}
          <div className="flex sm:hidden items-center gap-1.5">
            <button
              onClick={toggleTheme}
              type="button"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-menu"
              className="p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-menu"
          className="sm:hidden bg-white/95 dark:bg-slate-950/98 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 shadow-2xl transition-all"
        >
          <div className="flex flex-col gap-1.5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="px-4 py-2.5 text-base font-medium text-slate-800 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800/80 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-3">
              <button
                onClick={() => {
                  downloadResumePDF();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold text-sm shadow-md cursor-pointer"
              >
                <FileDown className="w-4 h-4" />
                Download PDF Resume
              </button>
              <div className="flex justify-around pt-1">
                <a
                  href={personalProfile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                >
                  <GithubIcon className="w-4 h-4" /> GitHub
                </a>
                <a
                  href={personalProfile.linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  <LinkedinIcon className="w-4 h-4" /> LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
