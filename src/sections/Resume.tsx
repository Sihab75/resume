import React from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { ResumeView } from '../components/ResumeView';

export const ResumeSection: React.FC = () => {
  return (
    <section id="resume" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Curriculum Vitae"
          title="Professional Resume & ATS Preview"
          subtitle="Strictly verified credentials, project summaries, and technical competencies formatted for high-parsing accuracy in applicant tracking systems."
        />

        <ResumeView />
      </div>
    </section>
  );
};
