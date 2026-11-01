import React from 'react';
import { GraduationCap, Calendar, CheckCircle2 } from 'lucide-react';
import { educationData } from '../data/education';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-12 md:py-16 overflow-hidden">
      {/* Section Container Card inspired by reference */}
      <div className="w-[92%] max-w-7xl mx-auto rounded-[2.25rem] p-6 sm:p-8 md:p-12 bg-gradient-to-br from-pink-50/70 via-slate-50/90 to-white/95 dark:from-black dark:via-slate-900/90 dark:to-black border border-red-100/70 dark:border-zinc-800/80 shadow-xl shadow-red-500/5">
        
        {/* Section Header */}
        <div className="mb-10 md:mb-12">
          <p className="text-xs sm:text-sm font-bold tracking-widest uppercase text-slate-800 dark:text-orange-500 flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-red-500" />
            Academic Foundations
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">
            Education & <span className="text-red-500">Milestones</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
            Formal university coursework in Computer Science & Engineering and pre-university science studies.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative border-l-2 border-red-500 ml-4 md:ml-6 pl-6 md:pl-10 space-y-10">
            {educationData.map((item, index) => (
              <div key={index} className="relative group">
                
                {/* Timeline Dot Icon */}
                <div className={`absolute -left-[35px] md:-left-[51px] top-1.5 w-7 h-7 md:w-8 md:h-8 rounded-full border-2 md:border-4 border-white dark:border-zinc-950 flex items-center justify-center text-white shadow-md ${
                  item.status === 'Current' ? 'bg-red-500 animate-pulse' : 'bg-slate-400 dark:bg-zinc-700'
                }`}>
                  <GraduationCap className="w-3.5 h-3.5 md:w-4 md:h-4" />
                </div>

                {/* Card Container */}
                <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-zinc-950 border border-slate-100 dark:border-zinc-800/80 shadow-sm group-hover:border-red-500/50 transition-all duration-300">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-500">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.period}
                    </span>
                    <span className={`text-[11px] font-bold px-3 py-0.5 rounded-full ${
                      item.status === 'Current'
                        ? 'bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200/60 dark:border-red-900/40'
                        : 'bg-slate-100 dark:bg-zinc-900 text-slate-600 dark:text-slate-400'
                    }`}>
                      {item.status}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-red-500 transition-colors">
                    {item.institution}
                  </h3>
                  <h4 className="text-sm sm:text-base font-semibold text-orange-600 dark:text-orange-400 mt-1">
                    {item.degree}
                  </h4>

                  {item.batch && (
                    <div className="mt-3 flex flex-wrap gap-2 text-xs font-mono">
                      <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-zinc-900 text-slate-800 dark:text-slate-200 font-semibold border border-slate-200/60 dark:border-zinc-800">
                        Batch: {item.batch}
                      </span>
                      {item.studentId && (
                        <span className="px-2.5 py-1 rounded-md bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 font-bold border border-red-200/50 dark:border-red-900/40">
                          Student ID: {item.studentId}
                        </span>
                      )}
                      <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-zinc-900 text-slate-700 dark:text-slate-300">
                        {item.field}
                      </span>
                    </div>
                  )}

                  <ul className="mt-4 space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    {item.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
