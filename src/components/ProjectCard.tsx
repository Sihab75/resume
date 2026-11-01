import React from 'react';
import { ExternalLink, FolderGit2, Sparkles, Layers } from 'lucide-react';
import { GithubIcon } from './Icons';
import type { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onOpenDetails: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenDetails }) => {
  return (
    <div className="relative p-[2px] rounded-[1.85rem] bg-gradient-to-br from-slate-200 via-slate-100 to-white dark:from-zinc-800 dark:via-zinc-900 dark:to-zinc-950 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-red-500/10 group flex flex-col">
      <div className="relative h-full w-full overflow-hidden rounded-[1.75rem] bg-white dark:bg-zinc-950 p-6 flex flex-col justify-between border border-slate-100 dark:border-zinc-800/80">
        
        <div>
          {/* Top Canvas / Visual Badge Header */}
          <div className="h-32 sm:h-36 w-full rounded-2xl bg-gradient-to-br from-red-500/10 via-orange-500/5 to-slate-100 dark:from-red-950/30 dark:via-zinc-900 dark:to-zinc-900 border border-red-100/60 dark:border-zinc-800/60 p-4 flex flex-col justify-between relative overflow-hidden mb-5">
            {/* Ambient Corner Glow */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-red-500/15 rounded-full blur-xl pointer-events-none" />

            <div className="flex items-center justify-between z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/90 dark:bg-black/80 text-red-600 dark:text-red-400 border border-red-200/50 dark:border-red-900/40 shadow-sm backdrop-blur-sm">
                <FolderGit2 className="w-3.5 h-3.5" />
                {project.category}
              </span>
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-200/80 dark:bg-zinc-800 text-slate-700 dark:text-slate-300">
                {project.status}
              </span>
            </div>

            <div className="z-10 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                @{project.repoName}
              </span>
              <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center shadow-md shadow-red-500/30 group-hover:scale-110 transition-transform">
                <Layers className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Project Title & Subtitle */}
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-red-500 transition-colors">
            {project.title}
          </h3>
          <p className="text-xs font-semibold text-orange-600 dark:text-orange-400 mt-1">
            {project.subtitle}
          </p>

          {/* Description */}
          <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
            {project.tagline}
          </p>

          {/* Key Features Preview */}
          <div className="mt-4 space-y-1.5">
            {project.keyFeatures.slice(0, 2).map((feat, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                <span className="text-red-500 font-bold">•</span>
                <span className="line-clamp-1">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section: Tech Stack & Actions */}
        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-zinc-800/80">
          
          {/* Tech Pills */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-[11px] font-mono font-medium rounded-lg bg-slate-100 dark:bg-zinc-900 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-zinc-800"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="px-2 py-1 text-[11px] font-mono font-medium rounded-lg bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border border-red-200/50 dark:border-red-900/30">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>

          {/* Actions: View Details + GitHub */}
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={() => onOpenDetails(project)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold bg-orange-500 hover:bg-orange-600 text-white shadow-sm hover:shadow-orange-500/25 transition-all cursor-pointer active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>View Details</span>
            </button>

            <div className="flex items-center gap-2">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`GitHub repo for ${project.title}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold bg-red-500 hover:bg-red-600 text-white shadow-sm hover:shadow-red-500/25 transition-all active:scale-95"
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
                  className="p-2 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-slate-300 hover:bg-red-500 hover:text-white transition-colors"
                  title="Live Demo"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
