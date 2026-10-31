import React from 'react';
import { FileDown, Printer, ExternalLink, Mail, Phone, MapPin, ShieldCheck } from 'lucide-react';
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
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm no-print">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
            <ShieldCheck className="w-5 h-5" />
          </span>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Verified ATS-Friendly Format
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Clean layout optimized for Applicant Tracking Systems & recruiters.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handlePrint}
            type="button"
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Resume</span>
          </button>

          <button
            onClick={downloadResumePDF}
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-xl shadow-md transition-all cursor-pointer"
          >
            <FileDown className="w-4 h-4" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* The Printable ATS Paper Card */}
      <div className="relative bg-white text-slate-900 rounded-2xl shadow-xl border border-slate-200 p-8 sm:p-12 font-sans selection:bg-slate-200 selection:text-black">
        {/* Header */}
        <div className="border-b border-slate-300 pb-5 mb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
            {personalProfile.fullName}
          </h1>
          <p className="text-base font-semibold text-slate-700 mt-1">
            {personalProfile.profession} • Aspiring Software Engineer
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-600">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
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
              className="flex items-center gap-1 text-blue-600 hover:underline"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              github.com/Sihab75
            </a>
            <a
              href={personalProfile.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-blue-600 hover:underline"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
              linkedin.com/in/korimul-jaman-16845535b
            </a>
          </div>
        </div>

        {/* 1. Summary */}
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-900 pb-1 mb-2.5">
            Professional Summary
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
            {personalProfile.bio} Motivated to leverage a strong background in C++, algorithmic problem solving, and modern native Android engineering into software engineering internships and collaborative development opportunities.
          </p>
        </section>

        {/* 2. Education */}
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-900 pb-1 mb-3">
            Education
          </h2>
          <div className="space-y-3">
            {educationData.map((edu, idx) => (
              <div key={idx}>
                <div className="flex flex-wrap items-baseline justify-between gap-1">
                  <h3 className="text-sm font-bold text-slate-900">
                    {edu.institution}
                  </h3>
                  <span className="text-xs text-slate-600 font-medium">{edu.period}</span>
                </div>
                <div className="text-xs font-semibold text-slate-800 italic">
                  {edu.degree}
                </div>
                {edu.batch && edu.studentId && (
                  <div className="text-xs text-slate-600 mt-0.5">
                    {edu.field} • Batch: {edu.batch} • Student ID: {edu.studentId}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 3. Technical Skills */}
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-900 pb-1 mb-2.5">
            Technical Skills
          </h2>
          <div className="space-y-1.5 text-xs text-slate-700">
            {skillsData.slice(0, 5).map((cat) => (
              <div key={cat.id} className="flex flex-wrap">
                <span className="font-bold text-slate-900 w-44 shrink-0">
                  {cat.title}:
                </span>
                <span className="flex-1 text-slate-800">
                  {cat.skills.map((s) => s.name).join(', ')}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Projects */}
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-900 pb-1 mb-3">
            Key Software & Algorithmic Projects
          </h2>
          <div className="space-y-4">
            {projectsData.map((proj) => (
              <div key={proj.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-1">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    {proj.title}
                    <span className="text-xs font-normal text-slate-500">
                      ({proj.subtitle})
                    </span>
                  </h3>
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-blue-600 hover:underline flex items-center gap-0.5"
                  >
                    <span>View Repository</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
                <p className="text-xs italic text-slate-600 mt-0.5">
                  Technologies: {proj.techStack.join(' • ')}
                </p>
                <ul className="mt-1 space-y-1 text-xs text-slate-700 list-disc list-inside">
                  {proj.keyFeatures.slice(0, 2).map((feat, i) => (
                    <li key={i}>{feat}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Competitive Programming Profiles */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-900 pb-1 mb-2.5">
            Competitive Programming & Profiles
          </h2>
          <div className="space-y-1 text-xs text-slate-700">
            <div>
              <span className="font-bold text-slate-900">Codeforces: </span>
              <a href={personalProfile.codeforcesUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                codeforces.com/profile/{personalProfile.codeforcesHandle}
              </a>
              <span className="text-slate-600"> (Rating: 693, 74+ problems solved in C++)</span>
            </div>
            <div>
              <span className="font-bold text-slate-900">CodeChef: </span>
              <a href={personalProfile.codechefUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                codechef.com/users/{personalProfile.codechefHandle}
              </a>
              <span className="text-slate-600"> (Rating: 1417, Division 3)</span>
            </div>
            <div>
              <span className="font-bold text-slate-900">LeetCode: </span>
              <a href={personalProfile.leetcodeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                leetcode.com/u/{personalProfile.leetcodeHandle}/
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
