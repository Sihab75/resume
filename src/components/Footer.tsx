import React from 'react';
import { ArrowUp, MessageSquare, Code2, Globe } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalProfile } from '../data/profile';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-24 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-950/80 py-12 no-print transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left Brand */}
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md">
              <span className="font-mono font-bold text-sm">&lt;KJ/&gt;</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {personalProfile.fullName}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                CSE Student • {personalProfile.university} • Batch {personalProfile.batch}
              </p>
            </div>
          </div>

          {/* Center Social Icons */}
          <div className="flex items-center gap-3">
            <a
              href={personalProfile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-cyan-500 transition-colors shadow-sm"
              title="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={personalProfile.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500 transition-colors shadow-sm"
              title="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={personalProfile.codeforcesUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Codeforces Profile"
              className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-red-500 hover:border-red-500 transition-colors shadow-sm"
              title="Codeforces"
            >
              <Code2 className="w-4 h-4" />
            </a>
            <a
              href={`https://wa.me/${personalProfile.whatsApp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Chat"
              className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-emerald-500 hover:border-emerald-500 transition-colors shadow-sm"
              title="WhatsApp"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
            <a
              href={personalProfile.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook Profile"
              className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-blue-500 hover:border-blue-500 transition-colors shadow-sm"
              title="Facebook"
            >
              <Globe className="w-4 h-4" />
            </a>
          </div>

          {/* Right Back to top button */}
          <button
            onClick={scrollToTop}
            type="button"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-200/60 dark:hover:bg-slate-900 transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800/60 text-center text-xs text-slate-500 dark:text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} {personalProfile.fullName}. Designed with clean software craftsmanship.</p>
          <p className="font-mono text-[11px]">
            Data easily customizable in <code className="bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded text-cyan-600 dark:text-cyan-400">src/data/profile.ts</code>
          </p>
        </div>
      </div>
    </footer>
  );
};
