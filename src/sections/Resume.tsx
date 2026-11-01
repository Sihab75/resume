import React from 'react';
import { FileText } from 'lucide-react';
import { ResumeView } from '../components/ResumeView';

export const ResumeSection: React.FC = () => {
  return (
    <section id="resume" className="py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <p className="text-xs font-bold tracking-widest uppercase text-blue-600 dark:text-cyan-400 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5" aria-hidden="true" />
            Curriculum Vitae
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mt-1.5 tracking-tight">
            Professional Resume & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300">ATS Preview</span>
          </h2>
          <p className="mt-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            Strictly verified academic credentials, verified GitHub projects, and technical competencies formatted for high parsing accuracy and recruiter review.
          </p>
        </div>

        <ResumeView />
      </div>
    </section>
  );
};
