import React from 'react';
import { 
  Code2, 
  Terminal, 
  Database, 
  GitBranch, 
  Smartphone, 
  Cpu, 
  Binary, 
  FileCode, 
  Sparkles,
  Layout,
  Server
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
    { name: 'C++17', category: 'Language', icon: <CppIcon className="w-5 h-5 text-blue-500" /> },
    { name: 'Data Structures & STL', category: 'Algorithms', icon: <Binary className="w-5 h-5 text-cyan-500" /> },
    { name: 'Kotlin', category: 'Language', icon: <KotlinIcon className="w-5 h-5 text-violet-500" /> },
    { name: 'Android / Compose', category: 'Mobile', icon: <Smartphone className="w-5 h-5 text-emerald-500" /> },
    { name: 'Python 3', category: 'Language', icon: <PythonIcon className="w-5 h-5 text-amber-500" /> },
    { name: 'C Language', category: 'Language', icon: <Code2 className="w-5 h-5 text-slate-500" /> },
    { name: 'Algorithms (Big-O)', category: 'Core CS', icon: <Cpu className="w-5 h-5 text-blue-600" /> },
    { name: 'Git & GitHub', category: 'Tools', icon: <GitBranch className="w-5 h-5 text-orange-500" /> },
    { name: 'Room SQLite', category: 'Database', icon: <Database className="w-5 h-5 text-cyan-400" /> },
    { name: 'React.js', category: 'Frontend', icon: <ReactIcon className="w-5 h-5 text-cyan-500" /> },
    { name: 'TypeScript', category: 'Frontend', icon: <FileCode className="w-5 h-5 text-blue-400" /> },
    { name: 'Tailwind CSS', category: 'Frontend', icon: <Layout className="w-5 h-5 text-teal-400" /> },
    { name: 'Node.js', category: 'Backend', icon: <Server className="w-5 h-5 text-emerald-600" /> },
    { name: 'Linux / Terminal', category: 'Systems', icon: <Terminal className="w-5 h-5 text-indigo-400" /> },
  ];

  const duplicatedSkills = [...marqueeSkills, ...marqueeSkills];

  return (
    <section id="skills" className="py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 md:mb-12 gap-4">
          <div>
            <span className="text-blue-600 dark:text-cyan-400 font-bold uppercase tracking-widest text-xs flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              Technical Stack
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mt-1.5 tracking-tight">
              Skills & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300">Technologies</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md text-left sm:text-right">
            Verified technologies applied in algorithmic problem solving, native mobile engineering, and academic coursework.
          </p>
        </div>

        {/* Infinite Horizontal Marquee Showcase */}
        <div className="relative overflow-hidden w-full py-2 select-none mb-12">
          {/* Edge Gradients */}
          <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#F8FAFC] dark:from-[#030712] to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#F8FAFC] dark:from-[#030712] to-transparent z-10 pointer-events-none" />

          {/* Marquee Track */}
          <div className="animate-marquee flex gap-4 sm:gap-5 py-2">
            {duplicatedSkills.map((skill, idx) => (
              <div
                key={`${skill.name}-${idx}`}
                className="relative rounded-2xl bg-white dark:bg-slate-900/80 p-3 sm:p-4 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-blue-500/50 dark:hover:border-cyan-500/50 transition-all duration-300 min-w-[130px] sm:min-w-[155px] group shrink-0 flex flex-col items-center justify-center text-center hover:scale-105"
              >
                <div className="p-2 sm:p-2.5 rounded-xl mb-1.5 bg-slate-50 dark:bg-slate-800/60 group-hover:bg-blue-50 dark:group-hover:bg-blue-950/40 transition-colors">
                  {skill.icon}
                </div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors truncate max-w-[125px]">
                  {skill.name}
                </span>
                <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 mt-0.5">
                  {skill.category}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 6 Categorized Skill Cards (Awwwards / Modern SaaS Aesthetic) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData.map((category) => (
            <div
              key={category.id}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-blue-500/40 dark:hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between h-full"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-cyan-400" />
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {category.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                  {category.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-colors ${
                      skill.highlight
                        ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-cyan-300 border border-blue-200/70 dark:border-blue-800/60'
                        : 'bg-slate-100/80 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-800'
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
