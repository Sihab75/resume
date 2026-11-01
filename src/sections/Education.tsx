import React from 'react';
import { GraduationCap, Calendar, CheckCircle } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { educationData } from '../data/education';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-20 bg-slate-50/60 dark:bg-slate-900/40 border-y border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Education"
          title="Academic Background & Timeline"
          subtitle="Formal academic foundations in Computer Science & Engineering and pre-university science studies."
        />

        <div className="max-w-3xl mx-auto">
          <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 md:ml-6 pl-6 md:pl-8 space-y-10">
            {educationData.map((item, index) => (
              <div key={index} className="relative group">
                {/* Timeline Dot Icon */}
                <div className={`absolute -left-[35px] md:-left-[43px] top-1.5 w-8 h-8 rounded-full border-4 border-white dark:border-slate-950 flex items-center justify-center text-white shadow-sm ${
                  item.status === 'Current' ? 'bg-cyan-500' : 'bg-slate-400 dark:bg-slate-700'
                }`}>
                  <GraduationCap className="w-3.5 h-3.5" />
                </div>

                {/* Card Container */}
                <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm group-hover:border-cyan-500/40 transition-all">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.period}
                    </span>
                    <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                      item.status === 'Current'
                        ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}>
                      {item.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {item.institution}
                  </h3>
                  <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mt-0.5">
                    {item.degree}
                  </h4>

                  {item.batch && (
                    <div className="mt-2 flex flex-wrap gap-2 text-xs font-mono">
                      <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        Batch: {item.batch}
                      </span>
                      {item.studentId && (
                        <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          ID: {item.studentId}
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-700 dark:text-cyan-300">
                        {item.field}
                      </span>
                    </div>
                  )}

                  <ul className="mt-4 space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    {item.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-cyan-500 shrink-0 mt-0.5" />
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
