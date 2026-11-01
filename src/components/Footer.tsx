import React from 'react';
import { ArrowUp, FileDown } from 'lucide-react';
import { GithubIcon, LinkedinIcon, CodeforcesIcon, CodeChefIcon } from './Icons';
import { personalProfile } from '../data/profile';
import { downloadResumePDF } from '../utils/pdfGenerator';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Services', href: '#services' },
    { label: 'Education', href: '#education' },
    { label: 'Competitive', href: '#competitive' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="relative mt-20 overflow-hidden bg-white/80 dark:bg-slate-950/90 text-slate-800 dark:text-white pt-16 pb-12 no-print border-t border-slate-200/80 dark:border-slate-800">
      
      {/* Top glowing accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 mb-12">
          
          {/* Column 1 (5 cols): Identity & Philosophy */}
          <div className="md:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white font-bold flex items-center justify-center shadow-lg shadow-blue-500/30 text-sm font-mono tracking-tight">
                &lt;KJ/&gt;
              </div>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                {personalProfile.fullName}
              </h3>
            </div>

            <p className="text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mt-2">
              CSE Student | Aspiring Software Engineer
            </p>

            <div className="w-12 h-[2px] bg-gradient-to-r from-blue-500 to-cyan-500 my-4 rounded-full" />

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
              Dedicated Computer Science undergraduate at Green University of Bangladesh (Batch 251). Passionate about algorithmic problem solving, clean software architecture, and modern full-stack web applications.
            </p>

            {/* Social Links Row */}
            <div className="flex items-center gap-2.5 mt-5">
              <a
                href={personalProfile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-black flex items-center justify-center transition-colors shadow-sm"
                title="GitHub Profile"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>

              <a
                href={personalProfile.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:bg-[#0077B5] hover:text-white flex items-center justify-center transition-colors shadow-sm"
                title="LinkedIn Profile"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>

              <a
                href={personalProfile.codeforcesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-colors shadow-sm"
                title="Codeforces Profile"
                aria-label="Codeforces Profile"
              >
                <CodeforcesIcon className="w-4 h-4" />
              </a>

              <a
                href={personalProfile.codechefUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:bg-[#5B4638] hover:text-white flex items-center justify-center transition-colors shadow-sm"
                title="CodeChef Profile"
                aria-label="CodeChef Profile"
              >
                <CodeChefIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2 (4 cols): Navigation with animated hover lines */}
          <div className="md:col-span-4">
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white mb-4">
              Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2.5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="group flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <span className="w-0 h-[2px] bg-blue-500 rounded-full transition-all duration-300 group-hover:w-3" />
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Column 3 (3 cols): Connect & Quick Resume */}
          <div className="md:col-span-3 flex flex-col justify-between">
            <div>
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white mb-4">
                Academic Hub
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Green University of Bangladesh<br />
                Dept. of Computer Science & Engineering<br />
                <span className="font-mono text-blue-600 dark:text-blue-400 font-semibold">Student ID: {personalProfile.studentId}</span>
              </p>
            </div>

            <div className="mt-5">
              <button
                onClick={downloadResumePDF}
                type="button"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-md shadow-blue-500/25 transition-all cursor-pointer active:scale-95"
              >
                <FileDown className="w-4 h-4" aria-hidden="true" />
                <span>Download Resume PDF</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>
            © {new Date().getFullYear()} <strong className="text-slate-900 dark:text-white">{personalProfile.fullName}</strong>. Green University of Bangladesh (Batch 251).
          </p>

          <button
            onClick={scrollToTop}
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 hover:border-blue-500/50 transition-all cursor-pointer shadow-sm"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>

      </div>
    </footer>
  );
};
