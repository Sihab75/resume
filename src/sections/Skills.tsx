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

const getCategoryIcon = (categoryId: string) => {
  switch (categoryId) {
    case 'programming-languages':
      return <Code2 className="h-[18px] w-[18px] shrink-0 text-blue-600 dark:text-cyan-400" aria-hidden="true" />;
    case 'frontend-development':
      return <Layout className="h-[18px] w-[18px] shrink-0 text-cyan-600 dark:text-cyan-400" aria-hidden="true" />;
    case 'backend-development':
      return <Server className="h-[18px] w-[18px] shrink-0 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />;
    case 'database':
      return <Database className="h-[18px] w-[18px] shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />;
    case 'tools-platforms':
      return <Terminal className="h-[18px] w-[18px] shrink-0 text-amber-600 dark:text-amber-400" aria-hidden="true" />;
    case 'cs-fundamentals':
      return <Binary className="h-[18px] w-[18px] shrink-0 text-violet-600 dark:text-violet-400" aria-hidden="true" />;
    default:
      return <Code2 className="h-[18px] w-[18px] shrink-0 text-blue-600 dark:text-cyan-400" aria-hidden="true" />;
  }
};

export const Skills: React.FC = () => {
  const marqueeSkills: MarqueeSkill[] = [
    { name: 'C++17', category: 'Language', icon: <CppIcon className="h-8 w-8 text-blue-500" /> },
    { name: 'Data Structures & STL', category: 'Algorithms', icon: <Binary className="h-8 w-8 text-cyan-500" aria-hidden="true" /> },
    { name: 'Kotlin', category: 'Language', icon: <KotlinIcon className="h-8 w-8 text-violet-500" /> },
    { name: 'Android / Compose', category: 'Mobile', icon: <Smartphone className="h-8 w-8 text-emerald-500" aria-hidden="true" /> },
    { name: 'Python 3', category: 'Language', icon: <PythonIcon className="h-8 w-8 text-amber-500" /> },
    { name: 'C Language', category: 'Language', icon: <Code2 className="h-8 w-8 text-slate-500" aria-hidden="true" /> },
    { name: 'Algorithms (Big-O)', category: 'Core CS', icon: <Cpu className="h-8 w-8 text-blue-600" aria-hidden="true" /> },
    { name: 'Git & GitHub', category: 'Tools', icon: <GitBranch className="h-8 w-8 text-orange-500" aria-hidden="true" /> },
    { name: 'Room SQLite', category: 'Database', icon: <Database className="h-8 w-8 text-cyan-400" aria-hidden="true" /> },
    { name: 'React.js', category: 'Frontend', icon: <ReactIcon className="h-8 w-8 text-cyan-500" /> },
    { name: 'TypeScript', category: 'Frontend', icon: <FileCode className="h-8 w-8 text-blue-400" aria-hidden="true" /> },
    { name: 'Tailwind CSS', category: 'Frontend', icon: <Layout className="h-8 w-8 text-teal-400" aria-hidden="true" /> },
    { name: 'Node.js', category: 'Backend', icon: <Server className="h-8 w-8 text-emerald-600" aria-hidden="true" /> },
    { name: 'Linux / Terminal', category: 'Systems', icon: <Terminal className="h-8 w-8 text-indigo-400" aria-hidden="true" /> },
  ];

  const duplicatedSkills = [...marqueeSkills, ...marqueeSkills];

  return (
    <section id="skills" className="py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 md:mb-14 gap-5">
          <div>
            <span className="text-blue-600 dark:text-cyan-400 font-bold uppercase tracking-widest text-xs flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" aria-hidden="true" />
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
        <div className="relative mb-16 w-full overflow-hidden py-3 select-none [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]">
          {/* Marquee Track */}
          <div className="animate-marquee flex gap-5 sm:gap-6 py-3">
            {duplicatedSkills.map((skill, idx) => (
              <div
                key={`${skill.name}-${idx}`}
                className="group relative flex min-h-[154px] w-[196px] shrink-0 flex-col items-center justify-center rounded-2xl border border-slate-200/80 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:scale-[1.03] hover:border-blue-500/50 dark:border-slate-800 dark:bg-slate-900/80 dark:hover:border-cyan-500/50 sm:min-h-[164px] sm:w-[216px] sm:p-6"
              >
                <div className="mb-3 rounded-xl bg-slate-50 p-3 transition-colors group-hover:bg-blue-50 dark:bg-slate-800/60 dark:group-hover:bg-blue-950/40">
                  {skill.icon}
                </div>
                <span className="max-w-full whitespace-normal text-base font-bold leading-snug text-slate-800 transition-colors group-hover:text-blue-600 dark:text-slate-200 dark:group-hover:text-cyan-400 sm:text-[17px]">
                  {skill.name}
                </span>
                <span className="mt-1.5 text-[13px] font-mono text-slate-500 dark:text-slate-400">
                  {skill.category}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 6 Categorized Skill Cards (Awwwards / Modern SaaS Aesthetic) */}
        <div className="grid grid-cols-1 gap-6 sm:gap-7 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {skillsData.map((category) => (
            <div
              key={category.id}
              className={`flex h-full flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:border-blue-500/40 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-cyan-500/40 sm:p-7 lg:p-8 ${
                ['programming-languages', 'frontend-development', 'backend-development'].includes(category.id)
                  ? 'min-h-[270px] lg:min-h-[292px]'
                  : 'min-h-[250px] lg:min-h-[270px]'
              }`}
            >
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex items-center justify-center rounded-xl bg-blue-50 p-2 dark:bg-blue-950/40">
                    {getCategoryIcon(category.id)}
                  </div>
                  <h3 className="text-lg font-bold leading-snug text-slate-900 dark:text-white">
                    {category.title}
                  </h3>
                </div>
                <p className="mb-5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {category.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-3">
                {category.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className={`rounded-lg px-3 py-1.5 text-[13px] font-mono font-medium leading-snug transition-colors ${
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
