import React from 'react';
import { 
  Code2, 
  Cpu, 
  Smartphone, 
  Globe, 
  Binary, 
  BrainCircuit, 
  Sparkles
} from 'lucide-react';

interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
}

export const Services: React.FC = () => {
  const capabilities: ServiceItem[] = [
    {
      id: 'software-dev',
      title: 'Software Development',
      subtitle: 'C++ & Python Architecture',
      description: 'Writing clean, structured, and modular code with emphasis on solid design principles, memory efficiency, and maintainable software architecture.',
      icon: <Code2 className="w-6 h-6" />,
      tags: ['C++17', 'Python', 'Clean Code', 'OOP Principles']
    },
    {
      id: 'problem-solving',
      title: 'Data Structures & Algorithms',
      subtitle: 'Competitive Problem Solving',
      description: 'Analyzing and implementing optimal solutions using min-heaps, binary trees, dynamic programming, graph traversal, and C++ Standard Template Library (STL).',
      icon: <Cpu className="w-6 h-6" />,
      tags: ['Codeforces', 'LeetCode', 'C++ STL', 'Big-O Analysis']
    },
    {
      id: 'mobile-dev',
      title: 'Native Android Engineering',
      subtitle: 'Kotlin & Jetpack Compose',
      description: 'Engineering offline-first mobile applications with declarative Jetpack Compose UI, Room SQLite persistence, state hoisting, and MVVM architecture.',
      icon: <Smartphone className="w-6 h-6" />,
      tags: ['Kotlin', 'Jetpack Compose', 'Room SQLite', 'Material 3']
    },
    {
      id: 'web-dev',
      title: 'Web & Interface Engineering',
      subtitle: 'React & Modern Frontend',
      description: 'Developing responsive, accessible single-page web applications using React, TypeScript, Tailwind CSS, and semantic web standards.',
      icon: <Globe className="w-6 h-6" />,
      tags: ['React', 'TypeScript', 'Tailwind CSS', 'WCAG A11y']
    },
    {
      id: 'algorithms-systems',
      title: 'Systems & Data Compression',
      subtitle: 'Lossless Binary Streaming',
      description: 'Implementing custom algorithmic engines from scratch, including greedy Huffman bit-packing compression and cryptographic SHA-256 data verification.',
      icon: <Binary className="w-6 h-6" />,
      tags: ['Huffman Coding', 'Bit-Packing', 'File Streaming', 'SHA-256']
    },
    {
      id: 'ai-ml',
      title: 'AI & Machine Learning',
      subtitle: 'Active Exploration & Learning',
      description: 'Studying foundational machine learning concepts, data processing pipelines, algorithmic prediction models, and intelligent AI assistance proxies.',
      icon: <BrainCircuit className="w-6 h-6" />,
      tags: ['Machine Learning', 'Data Preprocessing', 'Model Exploration']
    }
  ];

  return (
    <section id="services" className="py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <p className="text-xs font-bold tracking-widest uppercase text-blue-600 dark:text-cyan-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Core Competencies & Capabilities
          </p>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1.5 tracking-tight">
            How I Build & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300">Solve Problems</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            Primary technical disciplines, engineering practices, and areas of active study as a Computer Science student.
          </p>
        </div>

        {/* 6 Capability Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {capabilities.map((item) => (
            <div
              key={item.id}
              className="p-7 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-blue-500/50 dark:hover:border-cyan-500/50 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Icon Badge */}
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-cyan-400 border border-blue-200/60 dark:border-blue-900/40 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-xs">
                  {item.icon}
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs font-semibold text-blue-600 dark:text-cyan-400 mb-3 mt-0.5">
                  {item.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Tag Pills */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded-md bg-slate-50 dark:bg-slate-800/60 text-[11px] font-mono font-medium text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-slate-800"
                  >
                    {tag}
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
