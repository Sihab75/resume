import React from 'react';
import { ArrowDown, FileDown, Code2, Sparkles, MapPin } from 'lucide-react';
import { GithubIcon, LinkedinIcon, CodeforcesIcon, CodeChefIcon, LeetCodeIcon } from '../components/Icons';
import { personalProfile } from '../data/profile';
import { downloadResumePDF } from '../utils/pdfGenerator';
import heroImg from '../assets/hero.png';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="relative pt-28 sm:pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Greeting, Name, Role & Connect */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 sm:space-y-5">
            {/* Availability / Status Badge */}
            <div className="border border-red-500 w-fit rounded-full px-4 py-1.5 flex items-center justify-center gap-2 bg-red-50/60 dark:bg-red-950/20 shadow-sm">
              <span className="h-2 w-2 bg-red-500 rounded-full animate-ping" />
              <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-red-400">
                Open to opportunities • CSE Batch {personalProfile.batch}
              </p>
            </div>

            {/* Greeting & Name */}
            <div>
              <h3 className="text-lg sm:text-xl font-medium text-slate-600 dark:text-slate-300 flex items-center justify-center lg:justify-start gap-1.5">
                Hey, I'm <span className="text-2xl sm:text-3xl inline-block origin-bottom-right animate-bounce">👋</span>
              </h3>
              <h1 className="text-3xl sm:text-5xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 from-30% via-red-500 to-red-500 dark:from-white dark:from-30% dark:via-red-400 dark:to-red-400 pb-1 mt-1">
                {personalProfile.fullName}
              </h1>
            </div>

            {/* Professional Headline */}
            <div className="text-base sm:text-xl font-semibold text-slate-800 dark:text-slate-200">
              <span>I am a </span>
              <span className="text-red-500 font-bold">
                CSE Student | Aspiring Software Engineer
              </span>
            </div>

            {/* University & Location Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-red-500" />
                {personalProfile.location}
              </span>
              <span>•</span>
              <span>Green University of Bangladesh</span>
            </div>

            {/* Connect Icons Row */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <span className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400">
                Connect :
              </span>
              <div className="flex items-center gap-2.5">
                {/* GitHub */}
                <a
                  href={personalProfile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black flex items-center justify-center transition-all duration-300 shadow-sm hover:scale-105"
                  title="GitHub Profile (@Sihab75)"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>

                {/* LinkedIn */}
                <a
                  href={personalProfile.linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-[#0077B5] hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm hover:scale-105"
                  title="LinkedIn Profile"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>

                {/* Codeforces */}
                <a
                  href={personalProfile.codeforcesUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-red-600 hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm hover:scale-105"
                  title="Codeforces Profile (Rating 693)"
                  aria-label="Codeforces Profile"
                >
                  <CodeforcesIcon className="w-4 h-4" />
                </a>

                {/* CodeChef */}
                <a
                  href={personalProfile.codechefUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-[#5B4638] hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm hover:scale-105"
                  title="CodeChef Profile (Rating 1417)"
                  aria-label="CodeChef Profile"
                >
                  <CodeChefIcon className="w-4 h-4" />
                </a>

                {/* LeetCode */}
                <a
                  href={personalProfile.leetcodeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-[#FFA116] hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm hover:scale-105"
                  title="LeetCode Profile"
                  aria-label="LeetCode Profile"
                >
                  <LeetCodeIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Middle Column: Stylized Developer Portrait / Visual Card */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative group">
              {/* Soft Ambient Radial Behind Image */}
              <div className="absolute -inset-2 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-500 pointer-events-none" />
              
              {/* Card Container */}
              <div className="relative rounded-[2rem] p-2 bg-gradient-to-br from-white/90 via-slate-50 to-white/70 dark:from-zinc-900 dark:via-zinc-950 dark:to-black border border-red-100 dark:border-zinc-800 shadow-2xl">
                <div className="relative overflow-hidden rounded-[1.75rem] bg-slate-100 dark:bg-zinc-900 w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
                  <img
                    src={heroImg}
                    alt="Md. Korimul Jaman"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      // Fallback to GitHub avatar if local asset has display issue
                      (e.target as HTMLImageElement).src = personalProfile.avatarUrl;
                    }}
                  />
                  
                  {/* Bottom Overlay Badge */}
                  <div className="absolute bottom-3 left-3 right-3 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md text-white text-[11px] font-mono flex items-center justify-between border border-white/10">
                    <span className="flex items-center gap-1.5">
                      <Code2 className="w-3.5 h-3.5 text-red-400" />
                      C++ • Android • Python
                    </span>
                    <span className="text-emerald-400 font-semibold">Active</span>
                  </div>
                </div>
              </div>

              {/* Floating Pill: C++ & STL */}
              <div className="absolute -top-3 -right-3 hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-zinc-900 text-xs font-bold text-red-500 shadow-lg border border-red-100 dark:border-zinc-800">
                <Sparkles className="w-3 h-3 text-red-500" />
                <span>C++17 & STL</span>
              </div>
            </div>
          </div>

          {/* Right Column: Supporting Description & Action Buttons */}
          <div className="lg:col-span-3 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-orange-500 mb-1">
                Engineering Philosophy
              </p>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                I'm passionate about software development, problem solving, and exploring AI and machine learning. I enjoy building useful projects and continuously improving my programming skills.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto">
              {/* Primary: Explore My Projects */}
              <a
                href="#projects"
                className="group relative cursor-pointer flex items-center justify-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold text-sm rounded-full shadow-lg shadow-red-500/25 transition-all duration-300 hover:scale-[1.02] active:scale-95"
              >
                <span>Explore My Projects</span>
                <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
              </a>

              {/* Secondary: Download Resume (Glowing Conic Border Button) */}
              <button
                onClick={downloadResumePDF}
                type="button"
                className="relative inline-flex items-center justify-center p-[2px] rounded-full overflow-hidden group cursor-pointer shadow-md active:scale-95 transition-all"
                title="Download ATS-Friendly PDF Resume"
              >
                <span className="absolute inset-0 rounded-full bg-[conic-gradient(from_180deg,#ea580c,#fdba74,#f97316,#ea580c)] animate-spin-slow opacity-90 group-hover:opacity-100 blur-[0.4px]" />
                <span className="relative z-10 flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-white dark:bg-zinc-950 text-slate-900 dark:text-white font-bold text-sm tracking-wide transition-all group-hover:bg-slate-50 dark:group-hover:bg-zinc-900 w-full">
                  <FileDown className="w-4 h-4 text-red-500" />
                  <span>Download Resume</span>
                </span>
              </button>
            </div>

            {/* Core Competencies Quick Indicator */}
            <div className="pt-2 text-[11px] text-slate-500 dark:text-slate-400 font-mono">
              <span>Goal: </span>
              <span className="text-slate-800 dark:text-slate-200 font-semibold">Software Engineering Internship / Full-Time</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
