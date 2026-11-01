import React from 'react';
import { FileDown, Printer, Mail, Phone, MapPin, ShieldCheck } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalProfile } from '../data/profile';
import { educationData } from '../data/education';
import { skillsData } from '../data/skills';
import { projectsData } from '../data/projects';
import { downloadResumePDF } from '../utils/pdfGenerator';

export const ResumeView: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  const emailDisplay = personalProfile.isEmailVerified && personalProfile.email
    ? personalProfile.email
    : 'Available Upon Request';

  const phoneDisplay = personalProfile.isPhonePublic
    ? personalProfile.phone
    : 'Available Upon Request';

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Action Toolbar */}
      <div className="mb-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-zinc-950 border border-slate-100 dark:border-zinc-800 shadow-sm no-print">
        <div className="flex items-center gap-3">
          <span className="p-2.5 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-500 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </span>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Verified ATS-Friendly Resume
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Clean layout optimized for Applicant Tracking Systems and technical recruiters.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            type="button"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold rounded-full bg-slate-100 dark:bg-zinc-900 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>

          <button
            onClick={downloadResumePDF}
            type="button"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-red-500 hover:bg-red-600 rounded-full shadow-md shadow-red-500/25 transition-all cursor-pointer active:scale-95"
          >
            <FileDown className="w-4 h-4" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* The Printable ATS Paper Card */}
      <div className="relative bg-white text-slate-900 rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-10 md:p-14 font-sans selection:bg-red-50 selection:text-red-900">
        
        {/* Header */}
        <div className="border-b border-slate-300 pb-6 mb-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-950">
            {personalProfile.fullName}
          </h1>
          <p className="text-sm sm:text-base font-semibold text-red-600 mt-1">
            {personalProfile.profession} • Aspiring Software Engineer
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-y-1.5 gap-x-4 text-xs text-slate-600">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-red-500" />
              {personalProfile.location}
            </span>
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-slate-500" />
              {phoneDisplay}
            </span>
            <span className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-slate-500" />
              {emailDisplay}
            </span>
            <a
              href={personalProfile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-slate-900 font-semibold hover:text-red-600 hover:underline"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              github.com/Sihab75
            </a>
            <a
              href={personalProfile.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[#0077B5] font-semibold hover:underline"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
              LinkedIn Profile
            </a>
          </div>
        </div>

        {/* Education Section */}
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-3">
            Education
          </h2>
          <div className="space-y-4">
            {educationData.map((edu, idx) => (
              <div key={idx} className="text-xs sm:text-sm">
                <div className="flex flex-wrap items-baseline justify-between font-bold text-slate-900">
                  <span>{edu.institution}</span>
                  <span className="font-normal text-slate-500">{edu.period}</span>
                </div>
                <div className="text-xs text-slate-700 italic">
                  {edu.degree} {edu.field && `— ${edu.field}`}
                </div>
                {edu.studentId && (
                  <div className="text-[11px] font-mono text-slate-600 mt-0.5">
                    Batch: {edu.batch} | Student ID: {edu.studentId}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Technical Skills Section */}
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-3">
            Technical Skills
          </h2>
          <div className="space-y-2 text-xs sm:text-sm">
            {skillsData.slice(0, 5).map((cat) => (
              <div key={cat.id} className="grid grid-cols-1 sm:grid-cols-4 gap-1">
                <span className="font-bold text-slate-800 sm:col-span-1">
                  {cat.title}:
                </span>
                <span className="text-slate-700 sm:col-span-3">
                  {cat.skills.map((s) => s.name).join(', ')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Projects Section */}
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-3">
            Selected Software Projects
          </h2>
          <div className="space-y-4">
            {projectsData.slice(0, 3).map((proj) => (
              <div key={proj.id} className="text-xs sm:text-sm">
                <div className="flex flex-wrap items-baseline justify-between font-bold text-slate-900">
                  <span className="text-slate-950 font-bold">{proj.title}</span>
                  <span className="text-[11px] font-mono text-slate-500 font-normal">
                    {proj.techStack.slice(0, 4).join(', ')}
                  </span>
                </div>
                <p className="text-xs text-slate-700 mt-0.5">
                  {proj.tagline}
                </p>
                <ul className="mt-1 list-disc list-inside space-y-0.5 text-xs text-slate-600">
                  {proj.keyFeatures.slice(0, 2).map((feat, i) => (
                    <li key={i}>{feat}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Competitive Programming & Achievements */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-3">
            Competitive Programming
          </h2>
          <div className="text-xs text-slate-700 space-y-1">
            <p>
              • <strong className="font-semibold text-slate-900">Codeforces:</strong> Active contestant under handle <code className="font-mono text-red-600">korimuljaman</code> (Rating 693, 74+ problems solved in Div. 2/3/4).
            </p>
            <p>
              • <strong className="font-semibold text-slate-900">CodeChef:</strong> Division 3 contestant under handle <code className="font-mono text-red-600">sihab_75</code> (Rating 1417).
            </p>
            <p>
              • <strong className="font-semibold text-slate-900">LeetCode:</strong> Consistent practice with C++ STL on data structures (Arrays, Strings, Trees).
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
