import React from 'react';
import { GraduationCap, Compass, Brain, Code, Cpu } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { personalProfile } from '../data/profile';

export const About: React.FC = () => {
  const academicHighlights = [
    { label: 'University', val: personalProfile.university },
    { label: 'Department', val: personalProfile.department },
    { label: 'Student ID', val: personalProfile.studentId },
    { label: 'Batch', val: `Batch ${personalProfile.batch}` },
    { label: 'Primary Language', val: 'C++' },
    { label: 'Career Goal', val: personalProfile.careerGoal }
  ];

  const focusCards = [
    {
      icon: <Brain className="w-5 h-5 text-cyan-500" />,
      title: 'Algorithmic Problem Solving',
      desc: 'Active contestant on Codeforces and LeetCode. Focused on mastering Data Structures, STL containers, dynamic programming, and graph algorithms.'
    },
    {
      icon: <Cpu className="w-5 h-5 text-purple-500" />,
      title: 'Software Development & Architecture',
      desc: 'Building clean, offline-first native Android applications with Kotlin, Jetpack Compose, and Room Database. Passionate about maintainable codebases.'
    },
    {
      icon: <Code className="w-5 h-5 text-emerald-500" />,
      title: 'Systems & Algorithmic Engines',
      desc: 'Engineered a from-scratch Huffman compression desktop engine in Python, diving deep into byte-level encodings, binary trees, and bit streams.'
    },
    {
      icon: <Compass className="w-5 h-5 text-blue-500" />,
      title: 'AI & Continuous Exploration',
      desc: 'Curious about Artificial Intelligence and Machine Learning applications, exploring how LLM proxies and intelligent agents enhance developer workflows.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-slate-50/60 dark:bg-slate-900/40 border-y border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="About Me"
          title="Background & Engineering Journey"
          subtitle="A passionate Computer Science student dedicated to disciplined problem solving, software craft, and algorithmic foundations."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Academic Credentials Card */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
              <div className="flex items-center gap-3 pb-5 border-b border-slate-100 dark:border-slate-800">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Academic Identity
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Verified Undergraduate Credentials
                  </p>
                </div>
              </div>

              <dl className="mt-5 space-y-3.5 text-xs sm:text-sm">
                {academicHighlights.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center py-1 border-b border-slate-50 dark:border-slate-800/40">
                    <dt className="text-slate-500 dark:text-slate-400 font-medium">
                      {item.label}
                    </dt>
                    <dd className="font-semibold text-slate-900 dark:text-slate-200 text-right">
                      {item.val}
                    </dd>
                  </div>
                ))}
              </dl>

              {/* Status Box */}
              <div className="mt-6 p-3.5 rounded-xl bg-cyan-500/5 border border-cyan-500/20 text-xs text-slate-700 dark:text-slate-300">
                <span className="font-bold text-cyan-700 dark:text-cyan-300">Target Opportunity: </span>
                Seeking software engineering internships, collaborative development projects, and algorithmic mentoring.
              </div>
            </div>
          </div>

          {/* Right Column: Bio Narrative & Pillars */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {personalProfile.detailedAbout.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* 4 Focus Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {focusCards.map((card, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 transition-colors shadow-sm"
                >
                  <div className="p-2 w-fit rounded-lg bg-slate-100 dark:bg-slate-800 mb-2.5">
                    {card.icon}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {card.title}
                  </h4>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
