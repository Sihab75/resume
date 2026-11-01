import React from 'react';
import { ArrowDown, FileDown, Code2, Sparkles, MapPin, Terminal, Smartphone } from 'lucide-react';
import { GithubIcon, LinkedinIcon, CodeforcesIcon, CodeChefIcon, LeetCodeIcon } from '../components/Icons';
import { personalProfile } from '../data/profile';
import { downloadResumePDF } from '../utils/pdfGenerator';
import profileImg from '../assets/profile.jpg';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="relative pt-28 sm:pt-36 pb-16 md:pt-44 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Greeting, Name, Role & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-5">
            
            {/* Status / Availability Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50/80 dark:bg-blue-950/40 text-blue-700 dark:text-cyan-300 border border-blue-200/60 dark:border-blue-800/60 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
              <span>Open to Software Engineering Opportunities • Batch {personalProfile.batch}</span>
            </div>

            {/* Main Greeting & Name */}
            <div>
              <p className="text-sm sm:text-base font-mono font-medium text-slate-500 dark:text-slate-400 mb-1">
                Hello world, I'm
              </p>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                {personalProfile.fullName}
              </h1>
            </div>

            {/* Professional Headline */}
            <h2 className="text-lg sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 dark:from-blue-400 dark:via-violet-400 dark:to-cyan-300">
              Computer Science Student & Aspiring Software Engineer
            </h2>

            {/* Supporting Description */}
            <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              Undergraduate CSE student at <strong className="text-slate-900 dark:text-white font-semibold">Green University of Bangladesh</strong> passionate about software development, algorithmic problem solving, and modern application engineering. Experienced in writing clean, robust code in C++, Kotlin, and Python.
            </p>

            {/* University & Location Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs sm:text-sm text-slate-500 dark:text-slate-400 pt-1">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-cyan-500 shrink-0" aria-hidden="true" />
                {personalProfile.location}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Code2 className="w-4 h-4 text-blue-500 shrink-0" aria-hidden="true" />
                Primary Language: C++17
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-violet-500 shrink-0" aria-hidden="true" />
                Mobile & Systems
              </span>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
              {/* Primary: View Projects */}
              <a
                href="#projects"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-md shadow-blue-500/25 hover:shadow-lg transition-all active:scale-95"
              >
                <span>Explore Projects</span>
                <ArrowDown className="w-4 h-4" aria-hidden="true" />
              </a>

              {/* Secondary: Download Resume */}
              <button
                onClick={downloadResumePDF}
                type="button"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900/90 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200/90 dark:border-slate-800 shadow-xs hover:border-blue-500/50 transition-all cursor-pointer active:scale-95"
              >
                <FileDown className="w-4 h-4 text-blue-500 dark:text-cyan-400" aria-hidden="true" />
                <span>Download Resume</span>
              </button>
            </div>

            {/* Connect Profile Icons */}
            <div className="pt-2 flex items-center gap-2.5">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mr-1">
                Profiles:
              </span>

              <a
                href={personalProfile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-black flex items-center justify-center text-slate-700 dark:text-slate-300 transition-colors shadow-xs"
                title="GitHub Profile (@Sihab75)"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>

              <a
                href={personalProfile.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 hover:bg-[#0077B5] hover:text-white flex items-center justify-center text-slate-700 dark:text-slate-300 transition-colors shadow-xs"
                title="LinkedIn Profile"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>

              <a
                href={personalProfile.codeforcesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 hover:bg-red-600 hover:text-white flex items-center justify-center text-slate-700 dark:text-slate-300 transition-colors shadow-xs"
                title="Codeforces Profile (Rating 693)"
                aria-label="Codeforces Profile"
              >
                <CodeforcesIcon className="w-4 h-4" />
              </a>

              <a
                href={personalProfile.codechefUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 hover:bg-[#5B4638] hover:text-white flex items-center justify-center text-slate-700 dark:text-slate-300 transition-colors shadow-xs"
                title="CodeChef Profile (Rating 1417)"
                aria-label="CodeChef Profile"
              >
                <CodeChefIcon className="w-4 h-4" />
              </a>

              <a
                href={personalProfile.leetcodeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 hover:bg-[#FFA116] hover:text-white flex items-center justify-center text-slate-700 dark:text-slate-300 transition-colors shadow-xs"
                title="LeetCode Profile"
                aria-label="LeetCode Profile"
              >
                <LeetCodeIcon className="w-4 h-4" />
              </a>
            </div>

          </div>

          {/* Right Column: Premium Developer Visual & Code Card */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <div className="relative group w-full max-w-md sm:max-w-lg lg:max-w-md">
              {/* Subtle Ambient Radial Glow (Electric Blue / Cyan) */}
              <div className="absolute -inset-2.5 bg-gradient-to-tr from-blue-600/30 via-indigo-600/25 to-cyan-500/30 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 group-hover:blur-3xl transition-all duration-700 pointer-events-none" />

              {/* Card Container */}
              <div className="relative rounded-3xl p-3 sm:p-3.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800/90 shadow-2xl shadow-blue-500/10 group-hover:border-blue-500/40 dark:group-hover:border-cyan-500/40 transition-all duration-500">
                
                {/* Photo Frame Container */}
                <div className="relative overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-950 aspect-[16/10] w-full flex items-center justify-center">
                  <img
                    src={profileImg}
                    alt={personalProfile.fullName}
                    loading="eager"
                    fetchPriority="high"
                    className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/profile.jpg';
                    }}
                  />
                  
                  {/* Subtle Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />

                  {/* Glassmorphic Overlay Tag */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-950/80 backdrop-blur-md text-white border border-white/10 flex items-center justify-between shadow-lg">
                    <div>
                      <p className="text-xs font-bold leading-tight flex items-center gap-1.5">
                        <span>{personalProfile.fullName}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      </p>
                      <p className="text-[10px] text-cyan-300/90 font-mono mt-0.5">
                        CSE Batch {personalProfile.batch} • ID {personalProfile.studentId}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold border border-emerald-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Active</span>
                    </span>
                  </div>
                </div>

                {/* Quick Interactive Terminal Banner */}
                <div className="mt-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200/60 dark:border-slate-800/60 text-xs font-mono">
                  <div className="flex items-center gap-1.5 text-slate-400 pb-1.5 border-b border-slate-200/50 dark:border-slate-800/50 mb-1.5">
                    <Terminal className="w-3.5 h-3.5 text-cyan-500" aria-hidden="true" />
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">terminal@korimul:~$</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 text-[11px]">
                    <span className="text-blue-600 dark:text-cyan-400 font-bold">$ focus: </span>
                    ["C++", "Algorithms", "Android", "Systems"]
                  </p>
                </div>

              </div>

              {/* Floating Technology Pill */}
              <div className="absolute -top-3 -right-3 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-slate-900 text-xs font-bold text-blue-600 dark:text-cyan-400 shadow-lg border border-slate-200 dark:border-slate-800">
                <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                <span>C++17 & STL</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
