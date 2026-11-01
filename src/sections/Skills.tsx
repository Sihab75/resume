import React from 'react';
import { 
  Code2, 
  Terminal, 
  Database, 
  GitBranch, 
  Smartphone, 
  Cpu, 
  Layers, 
  Binary, 
  FileCode, 
  Flame,
  Layout
} from 'lucide-react';
import { CppIcon, KotlinIcon, PythonIcon, ReactIcon } from '../components/Icons';
import { skillsData } from '../data/skills';

interface MarqueeSkill {
  name: string;
  category: string;
  icon: React.ReactNode;
}

export const Skills: React.FC = () => {
  const marqueeSkills: MarqueeSkill[] = [
    { name: 'C++17', category: 'Language', icon: <CppIcon className="w-6 h-6 text-red-500" /> },
    { name: 'Data Structures & STL', category: 'Algorithms', icon: <Binary className="w-6 h-6 text-orange-500" /> },
    { name: 'Kotlin', category: 'Language', icon: <KotlinIcon className="w-6 h-6 text-purple-500" /> },
    { name: 'Android / Compose', category: 'Mobile', icon: <Smartphone className="w-6 h-6 text-emerald-500" /> },
    { name: 'Python 3', category: 'Language', icon: <PythonIcon className="w-6 h-6 text-blue-500" /> },
    { name: 'C Language', category: 'Language', icon: <Code2 className="w-6 h-6 text-slate-600 dark:text-slate-300" /> },
    { name: 'Algorithms (Big-O)', category: 'Core CS', icon: <Cpu className="w-6 h-6 text-red-500" /> },
    { name: 'Git & GitHub', category: 'Tools', icon: <GitBranch className="w-6 h-6 text-orange-500" /> },
    { name: 'Room SQLite', category: 'Database', icon: <Database className="w-6 h-6 text-cyan-500" /> },
    { name: 'React.js', category: 'Web', icon: <ReactIcon className="w-6 h-6 text-cyan-400" /> },
    { name: 'TypeScript', category: 'Web', icon: <FileCode className="w-6 h-6 text-blue-400" /> },
    { name: 'Tailwind CSS', category: 'Styling', icon: <Layout className="w-6 h-6 text-teal-400" /> },
    { name: 'Linux / Terminal', category: 'Systems', icon: <Terminal className="w-6 h-6 text-amber-500" /> },
    { name: 'OOP Principles', category: 'Core CS', icon: <Layers className="w-6 h-6 text-indigo-500" /> },
  ];

  // Duplicate for seamless 0-gap infinite marquee scroll
  const duplicatedSkills = [...marqueeSkills, ...marqueeSkills];

  return (
    <section id="skills" className="py-12 md:py-16 overflow-hidden">
      {/* Section Container Card inspired by reference */}
      <div className="w-[92%] max-w-7xl mx-auto rounded-[2.25rem] p-6 sm:p-8 md:p-12 bg-gradient-to-br from-pink-50/70 via-slate-50/90 to-white/95 dark:from-black dark:via-slate-900/90 dark:to-black border border-red-100/70 dark:border-zinc-800/80 shadow-xl shadow-red-500/5">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 md:mb-12">
          <div>
            <span className="text-red-500 font-bold uppercase tracking-widest text-xs sm:text-sm flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-red-500" />
              Technical Competencies
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mt-1.5">
              Technologies & <span className="text-red-500">Skills</span>
            </h2>
          </div>
          <p className="mt-2 sm:mt-0 text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md text-left sm:text-right">
            Applied in algorithmic problem solving, native Android development, and coursework at Green University.
          </p>
        </div>

        {/* Infinite Animated Marquee Showcase */}
        <div className="relative overflow-hidden w-full py-4 select-none">
          {/* Edge Blur Gradients */}
          <div className="absolute top-0 bottom-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-pink-50 dark:from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-pink-50 dark:from-black to-transparent z-10 pointer-events-none" />

          {/* Marquee Track */}
          <div className="animate-marquee flex gap-4 sm:gap-6 py-2">
            {duplicatedSkills.map((skill, idx) => (
              <div
                key={`${skill.name}-${idx}`}
                className="relative p-[2px] rounded-2xl bg-gradient-to-br from-slate-200 via-slate-100 to-white dark:from-zinc-800 dark:via-zinc-900 dark:to-zinc-950 transition-all duration-300 min-w-[130px] md:min-w-[160px] group shrink-0 hover:scale-105"
              >
                <div className="flex flex-col items-center justify-center h-[100px] md:h-[130px] w-full rounded-[14px] bg-white dark:bg-zinc-950 border border-slate-100 dark:border-zinc-800/80 shadow-sm transition-all duration-300 group-hover:border-red-500/80 p-3">
                  <div className="p-2 md:p-2.5 rounded-xl mb-1.5 md:mb-2 bg-slate-50 dark:bg-zinc-900 group-hover:bg-red-50 dark:group-hover:bg-red-950/40 transition-colors">
                    {skill.icon}
                  </div>
                  <span className="text-[11px] md:text-[13px] font-bold tracking-tight text-slate-800 dark:text-slate-200 group-hover:text-red-500 transition-colors text-center truncate max-w-[120px] md:max-w-[140px]">
                    {skill.name}
                  </span>
                  <span className="text-[9px] font-medium text-slate-400 dark:text-zinc-500 mt-0.5">
                    {skill.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Structured Skill Categories Grid */}
        <div className="mt-12 pt-8 border-t border-slate-200/80 dark:border-zinc-800/80 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData.map((category) => (
            <div
              key={category.id}
              className="p-5 rounded-2xl bg-white dark:bg-zinc-950 border border-slate-100 dark:border-zinc-800/80 shadow-sm hover:border-red-500/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  {category.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {category.description}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {category.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold font-mono transition-colors ${
                      skill.highlight
                        ? 'bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200/60 dark:border-red-900/40'
                        : 'bg-slate-100 dark:bg-zinc-900 text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-zinc-800'
                    }`}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
