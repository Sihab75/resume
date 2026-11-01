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
    <section id="projects" className="py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 md:mb-12 gap-4">
          <div>
            <span className="text-blue-600 dark:text-cyan-400 font-bold uppercase tracking-widest text-xs flex items-center gap-1.5">
              <FolderGit2 className="w-3.5 h-3.5" />
              Portfolio Showcase
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1.5 tracking-tight">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300">Projects</span>
            </h2>
          </div>

          {/* GitHub Profile Button */}
          <a
            href={personalProfile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-blue-500 dark:hover:border-cyan-400 text-slate-800 dark:text-slate-200 font-semibold px-5 py-2.5 rounded-full transition-all cursor-pointer duration-300 text-xs sm:text-sm shadow-xs hover:shadow-blue-500/10 active:scale-95"
          >
            <GithubIcon className="w-4 h-4" />
            <span>View All on GitHub</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-blue-500 dark:text-cyan-400" />
          </a>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-10" role="group" aria-label="Project filter categories">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedFilter(tab)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                selectedFilter === tab
                  ? 'bg-blue-600 text-white dark:bg-cyan-500 dark:text-slate-950 shadow-md shadow-blue-500/20'
                  : 'bg-white dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200/80 dark:border-slate-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
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
            className="w-full inline-flex items-center justify-center gap-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold px-6 py-3 rounded-full text-xs"
          >
            <GithubIcon className="w-4 h-4" />
            <span>View All on GitHub (@Sihab75)</span>
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
