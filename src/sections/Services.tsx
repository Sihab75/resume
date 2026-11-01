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
      tags: ['C++17', 'Python', 'Clean Code', 'Object-Oriented Programming']
    },
    {
      id: 'problem-solving',
      title: 'Data Structures & Algorithms',
      subtitle: 'Competitive Problem Solving',
      description: 'Analyzing and implementing optimal solutions using min-heaps, binary trees, dynamic programming, graph traversal, and C++ Standard Template Library (STL).',
      icon: <Cpu className="w-6 h-6" />,
      tags: ['Codeforces', 'LeetCode', 'STL', 'Big-O Analysis']
    },
    {
      id: 'mobile-dev',
      title: 'Native Android Engineering',
      subtitle: 'Kotlin & Jetpack Compose',
      description: 'Engineering offline-first mobile applications with declarative Jetpack Compose UI, Room SQLite persistence, state hoisting, and MVVM architecture.',
      icon: <Smartphone className="w-6 h-6" />,
      tags: ['Kotlin', 'Jetpack Compose', 'Room DB', 'Material 3']
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
      tags: ['Huffman Coding', 'Bit-Packing', 'File I/O', 'SHA-256']
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
    <section id="services" className="py-12 md:py-16 overflow-hidden">
      {/* Section Container Card inspired by reference */}
      <div className="w-[92%] max-w-7xl mx-auto rounded-[2.25rem] p-6 sm:p-8 md:p-12 bg-gradient-to-br from-pink-50/70 via-slate-50/90 to-white/95 dark:from-black dark:via-slate-900/90 dark:to-black border border-red-100/70 dark:border-zinc-800/80 shadow-xl shadow-red-500/5">
        
        {/* Section Header */}
        <div className="mb-12">
          <p className="text-xs sm:text-sm font-bold tracking-widest uppercase text-slate-800 dark:text-orange-500 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-red-500" />
            Core Competencies & Interests
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">
            How I Build & <span className="text-red-500">Solve Problems</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
            My primary technical disciplines, engineering practices, and areas of active study as a Computer Science student.
          </p>
        </div>

        {/* 6 Capability Cards matching reference design */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 pt-4">
          {capabilities.map((item) => (
            <div
              key={item.id}
              className="group relative bg-white dark:bg-zinc-950 rounded-2xl shadow-sm px-6 pt-12 pb-6 text-center transition-all duration-300 border-[1.5px] border-slate-100 dark:border-zinc-800/80 hover:border-red-500 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between"
            >
              {/* Floating Top Badge Icon */}
              <div className="w-12 h-12 absolute -top-6 left-1/2 -translate-x-1/2 rounded-full flex items-center justify-center transition-all duration-300 bg-red-500 text-white shadow-lg shadow-red-500/30 group-hover:bg-white group-hover:text-red-500 group-hover:ring-2 group-hover:ring-red-500">
                {item.icon}
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white mb-1 group-hover:text-red-500 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs font-semibold text-orange-600 dark:text-orange-400 mb-3">
                  {item.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Tag Pills */}
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-zinc-800/80 flex flex-wrap justify-center gap-1.5">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded-md bg-slate-50 dark:bg-zinc-900 text-[11px] font-mono font-medium text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-zinc-800"
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
