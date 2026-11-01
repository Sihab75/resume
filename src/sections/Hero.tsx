import React from 'react';
import { ArrowDown, FileDown, Sparkles, Code2, MapPin } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/Icons';
import { personalProfile } from '../data/profile';
import { TerminalCard } from '../components/TerminalCard';
import { downloadResumePDF } from '../utils/pdfGenerator';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="relative pt-24 sm:pt-28 pb-14 sm:pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background Glow Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-500/10 via-blue-500/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Introductions & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/25 mb-5 sm:mb-6">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
              <span>Green University of Bangladesh • CSE Batch {personalProfile.batch}</span>
            </div>

            {/* Name */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600">{personalProfile.fullName}</span>
            </h1>

            {/* Professional Headline */}
            <h2 className="mt-3 sm:mt-4 text-lg sm:text-2xl font-semibold text-slate-700 dark:text-slate-300">
              Computer Science & Engineering Student |{' '}
              <span className="text-cyan-600 dark:text-cyan-400 font-bold">Aspiring Software Engineer</span>
            </h2>

            {/* Location & Focus */}
            <div className="mt-3 flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-cyan-500 shrink-0" />
                {personalProfile.location}
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1">
                <Code2 className="w-4 h-4 text-cyan-500 shrink-0" />
                Primary Language: C++
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-cyan-500 shrink-0" />
                Problem Solving & Android Development
              </span>
            </div>

            {/* Supporting Description */}
            <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              I am an undergraduate CSE student dedicated to strengthening my foundations in algorithmic problem solving, software architecture, and modern application engineering. Experienced in building native Android apps with Kotlin and algorithmic tools from scratch.
            </p>

            {/* Action Buttons */}
            <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:flex sm:flex-wrap items-center gap-3 w-full sm:w-auto">
              {/* View Projects */}
              <a
                href="#projects"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-md hover:shadow-lg transition-all"
              >
                <span>View My Projects</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              {/* Download Resume */}
              <button
                onClick={downloadResumePDF}
                type="button"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-slate-800 dark:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 transition-all cursor-pointer"
              >
                <FileDown className="w-4 h-4 text-cyan-500" />
                <span>Download Resume</span>
              </button>

              {/* GitHub Button */}
              <a
                href={personalProfile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl font-medium text-xs sm:text-sm text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 transition-colors"
                title="Visit GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
              </a>

              {/* LinkedIn Button */}
              <a
                href={personalProfile.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl font-medium text-xs sm:text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                title="Visit LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
            </div>

            {/* Quick Skills Pills */}
            <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-slate-200 dark:border-slate-800/80 w-full flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-400 font-mono text-[11px] mr-1">Core Competencies:</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800/80 font-mono text-cyan-600 dark:text-cyan-400 font-semibold">C++17</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800/80 font-mono text-slate-700 dark:text-slate-300">Data Structures & STL</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800/80 font-mono text-purple-600 dark:text-purple-400">Kotlin</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800/80 font-mono text-slate-700 dark:text-slate-300">Jetpack Compose</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800/80 font-mono text-slate-700 dark:text-slate-300">Room DB</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800/80 font-mono text-emerald-600 dark:text-emerald-400">Codeforces (74+ solved)</span>
            </div>
          </div>

          {/* Right Column: Interactive Terminal Preview */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <TerminalCard />
          </div>
        </div>
      </div>
    </section>
  );
};
