import React, { useEffect } from 'react';
import { X, ExternalLink, CheckCircle2, Cpu, Layers } from 'lucide-react';
import { GithubIcon } from './Icons';
import type { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm"
    >
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Card */}
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-4 sm:p-8 z-10">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal dialog"
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="pr-8 sm:pr-10">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
              {project.category}
            </span>
            <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              Status: {project.status}
            </span>
          </div>

          <h3 id="modal-project-title" className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
            {project.title}
          </h3>
          <p className="text-xs sm:text-sm md:text-base text-cyan-600 dark:text-cyan-400 font-medium mt-1">
            {project.subtitle}
          </p>
        </div>

        {/* Tagline / Overview */}
        <div className="mt-4 sm:mt-5 p-3.5 sm:p-4 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200/80 dark:border-slate-800">
          <p className="text-xs sm:text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Tech Stack */}
        <div className="mt-5 sm:mt-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5 mb-2.5">
            <Cpu className="w-3.5 h-3.5 text-cyan-500" />
            Technologies Used
          </h4>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700/60"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Key Features */}
        <div className="mt-5 sm:mt-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5 mb-3">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            Core Capabilities & Modules
          </h4>
          <ul className="space-y-2 sm:space-y-2.5">
            {project.keyFeatures.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 shrink-0" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Architecture & Engineering Details */}
        {project.architectureDetails.length > 0 && (
          <div className="mt-5 sm:mt-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5 mb-3">
              <Layers className="w-3.5 h-3.5 text-blue-500" />
              Architecture & System Design Highlights
            </h4>
            <div className="space-y-2 p-3 sm:p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              {project.architectureDetails.map((arch, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-cyan-500 font-bold">•</span>
                  <span>{arch}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-6 sm:mt-8 pt-4 sm:pt-5 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-cyan-600 dark:hover:bg-cyan-400 transition-colors shadow-sm"
          >
            <GithubIcon className="w-4 h-4" />
            <span>View Source on GitHub</span>
          </a>

          {project.liveDemoUrl && (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-cyan-500 hover:bg-cyan-600 text-white transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live Demonstration</span>
            </a>
          )}

          <button
            onClick={onClose}
            type="button"
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ml-auto cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
