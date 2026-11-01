import React, { useState } from 'react';
import { Code2, Database, Wrench, BookOpen, Layers, Sparkles } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { skillsData } from '../data/skills';
import type { SkillCategory } from '../types';

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categoryIcons: Record<string, React.ReactNode> = {
    languages: <Code2 className="w-5 h-5 text-cyan-500" />,
    fundamentals: <BookOpen className="w-5 h-5 text-blue-500" />,
    'mobile-dev': <Layers className="w-5 h-5 text-purple-500" />,
    databases: <Database className="w-5 h-5 text-emerald-500" />,
    tools: <Wrench className="w-5 h-5 text-amber-500" />,
    'currently-learning': <Sparkles className="w-5 h-5 text-rose-500" />
  };

  const filteredCategories = selectedCategory === 'all'
    ? skillsData
    : skillsData.filter(c => c.id === selectedCategory);

  const getBadgeClass = (level: string) => {
    switch (level) {
      case 'proficient':
        return 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-500/30';
      case 'working-knowledge':
        return 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/30';
      case 'currently-learning':
        return 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30';
      default:
        return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700';
    }
  };

  return (
    <section id="skills" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Technical Skills"
          title="Technical Competencies & Tools"
          subtitle="Honest, categorized breakdown of programming languages, CS fundamentals, and software frameworks without arbitrary percentages."
        />

        {/* Legend */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
            <span className="text-slate-600 dark:text-slate-400 font-medium">Core Active / Proficient</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
            <span className="text-slate-600 dark:text-slate-400 font-medium">Project Applied / Working Knowledge</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="text-slate-600 dark:text-slate-400 font-medium">Active Research & Learning</span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-cyan-500 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            All Categories ({skillsData.length})
          </button>
          {skillsData.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-cyan-500 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category: SkillCategory) => (
            <div
              key={category.id}
              className="flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 shadow-sm hover:shadow-md transition-all"
            >
              <div>
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                    {categoryIcons[category.id] || <Code2 className="w-5 h-5 text-cyan-500" />}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {category.title}
                  </h3>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                  {category.description}
                </p>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${getBadgeClass(skill.level)}`}
                  >
                    {skill.highlight && (
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    )}
                    <span>{skill.name}</span>
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
