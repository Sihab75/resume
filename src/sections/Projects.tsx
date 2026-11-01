import React, { useState } from 'react';
import { ArrowUpRight, FolderGit2 } from 'lucide-react';
import { GithubIcon } from '../components/Icons';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectModal } from '../components/ProjectModal';
import { projectsData } from '../data/projects';
import { personalProfile } from '../data/profile';
import type { Project } from '../types';

export const Projects: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const filterTabs = ['All', 'Android & Mobile', 'Algorithms & Systems', 'Academic & Practice', 'Web Applications'];

  const filteredProjects = selectedFilter === 'All'
    ? projectsData
    : projectsData.filter((p) => p.category === selectedFilter);

  return (
    <section id="projects" className="py-12 md:py-16 overflow-hidden">
      {/* Section Container Card inspired by reference */}
      <div className="w-[92%] max-w-7xl mx-auto rounded-[2.25rem] p-6 sm:p-8 md:p-12 bg-gradient-to-br from-pink-50/70 via-slate-50/90 to-white/95 dark:from-black dark:via-slate-900/90 dark:to-black border border-red-100/70 dark:border-zinc-800/80 shadow-xl shadow-red-500/5">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 md:mb-12 gap-4">
          <div>
            <span className="text-red-500 font-bold uppercase tracking-widest text-xs sm:text-sm flex items-center gap-1.5">
              <FolderGit2 className="w-4 h-4 text-red-500" />
              Portfolio
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mt-1.5">
              Recent <span className="text-red-500">Projects</span>
            </h2>
          </div>

          {/* "View all in github" Pill Button matching reference */}
          <a
            href={personalProfile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 border-2 border-red-500 text-slate-900 dark:text-white font-bold px-6 py-2 rounded-full hover:bg-red-500 hover:text-white transition-all cursor-pointer duration-300 text-xs sm:text-sm shadow-sm hover:shadow-red-500/20 active:scale-95"
          >
            <span>View all in GitHub</span>
            <ArrowUpRight className="w-4 h-4 text-red-500 group-hover:text-white" />
          </a>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 sm:gap-2 mb-10" role="group" aria-label="Project filter categories">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedFilter(tab)}
              className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedFilter === tab
                  ? 'bg-red-500 text-white shadow-md shadow-red-500/30'
                  : 'bg-white dark:bg-zinc-900 text-slate-600 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 border border-slate-200/80 dark:border-zinc-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenDetails={(p) => setActiveModalProject(p)}
            />
          ))}
        </div>

        {/* Mobile GitHub Button */}
        <div className="mt-8 text-center sm:hidden">
          <a
            href={personalProfile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 border-2 border-red-500 text-slate-900 dark:text-white font-bold px-6 py-3 rounded-full hover:bg-red-500 hover:text-white transition-all text-xs"
          >
            <GithubIcon className="w-4 h-4" />
            <span>View all in GitHub (@Sihab75)</span>
          </a>
        </div>

      </div>

      {/* Accessible Detail Modal */}
      {activeModalProject && (
        <ProjectModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />
      )}
    </section>
  );
};
