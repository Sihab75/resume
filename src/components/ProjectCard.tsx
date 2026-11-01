import React from 'react';
import { ExternalLink, FolderGit2, Eye, Layers } from 'lucide-react';
import { GithubIcon } from './Icons';
import type { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onOpenDetails: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenDetails }) => {
  return (
    <div className="group rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-blue-500/50 dark:hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 p-6 sm:p-7 flex flex-col justify-between h-full">
      
      <div>
        {/* Top Header / Visual Canvas */}
        <div className="h-32 sm:h-36 w-full rounded-2xl bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-cyan-500/10 dark:from-blue-950/40 dark:via-slate-900 dark:to-cyan-950/20 border border-slate-200/60 dark:border-slate-800 p-4 flex flex-col justify-between relative overflow-hidden mb-5">
          {/* Ambient Glow */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-500/15 rounded-full blur-xl pointer-events-none" />

          <div className="flex items-center justify-between z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/90 dark:bg-slate-900/90 text-blue-700 dark:text-cyan-300 border border-blue-200/60 dark:border-blue-900/40 shadow-xs">
              <FolderGit2 className="w-3.5 h-3.5" aria-hidden="true" />
              {project.category}
            </span>
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {project.status}
            </span>
          </div>

          <div className="z-10 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              @{project.repoName}
            </span>
            <span className="w-8 h-8 rounded-full bg-blue-600 dark:bg-cyan-500 text-white dark:text-slate-950 flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-110 transition-transform">
              <Layers className="w-4 h-4" aria-hidden="true" />
            </span>
          </div>
        </div>

        {/* Project Title & Subtitle */}
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-xs font-semibold text-blue-600 dark:text-cyan-400 mt-1">
          {project.subtitle}
        </p>

        {/* Tagline */}
        <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
          {project.tagline}
        </p>

        {/* Key Features Preview */}
        <div className="mt-4 space-y-1.5">
          {project.keyFeatures.slice(0, 2).map((feat, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
              <span className="text-cyan-500 font-bold">•</span>
              <span className="line-clamp-1">{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section: Tech Stack & Actions */}
      <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800/80">
        
        {/* Tech Stack Badges */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-[11px] font-mono font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-800"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="px-2 py-1 text-[11px] font-mono font-medium rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-cyan-300 border border-blue-200/50 dark:border-blue-900/40">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>

        {/* Actions: View Details & Repository Link */}
        <div className="flex items-center justify-between gap-2">
          <button
            onClick={() => onOpenDetails(project)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-cyan-300 hover:bg-blue-600 hover:text-white dark:hover:bg-cyan-500 dark:hover:text-slate-950 transition-all cursor-pointer active:scale-95 border border-blue-200/60 dark:border-blue-800/60"
          >
            <Eye className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Details</span>
          </button>

          <div className="flex items-center gap-2">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub repo for ${project.title}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold bg-slate-900 hover:bg-black text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 shadow-xs transition-all active:scale-95"
              title="View GitHub Repository"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>

            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Live demo for ${project.title}`}
                className="p-2 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500 hover:text-white transition-colors"
                title="Live Demo"
              >
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
