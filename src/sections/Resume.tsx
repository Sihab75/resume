import React from 'react';
import { FileText } from 'lucide-react';
import { ResumeView } from '../components/ResumeView';

export const ResumeSection: React.FC = () => {
  return (
    <section id="resume" className="py-12 md:py-16 overflow-hidden">
      <div className="w-[92%] max-w-7xl mx-auto rounded-3xl p-6 sm:p-8 md:p-12 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 shadow-xl shadow-blue-500/5">
        
        {/* Section Header */}
        <div className="mb-10 md:mb-12">
          <p className="text-xs sm:text-sm font-bold tracking-widest uppercase text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-blue-500" />
            Curriculum Vitae
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">
            Professional Resume & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500">ATS Preview</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
            Strictly verified academic credentials, verified GitHub projects, and technical competencies formatted for high parsing accuracy and recruiter review.
          </p>
        </div>

        <ResumeView />
      </div>
    </section>
  );
};
