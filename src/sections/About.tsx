import React from 'react';
import { 
  FileDown, 
  GraduationCap, 
  Code2, 
  Trophy, 
  BookOpen
} from 'lucide-react';
import { personalProfile } from '../data/profile';
import { downloadResumePDF } from '../utils/pdfGenerator';
import heroImg from '../assets/hero.png';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-12 md:py-16 overflow-hidden">
      {/* Container Card inspired by reference */}
      <div className="w-[92%] max-w-7xl mx-auto rounded-[2.25rem] p-6 sm:p-8 md:p-12 bg-gradient-to-br from-pink-50/70 via-slate-50/90 to-white/95 dark:from-black dark:via-slate-900/90 dark:to-black border border-red-100/70 dark:border-zinc-800/80 shadow-xl shadow-red-500/5">
        
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Profile Card + Student Metadata Timeline */}
          <div className="w-full lg:w-5/12 flex flex-col items-center lg:items-start space-y-6">
            
            {/* Developer Illustration / Portrait Card */}
            <div className="w-full max-w-sm rounded-2xl overflow-hidden bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-md p-3 relative group">
              <div className="w-full h-56 sm:h-64 rounded-xl overflow-hidden bg-slate-200 dark:bg-zinc-800 flex items-center justify-center">
                <img
                  src={heroImg}
                  alt="Md. Korimul Jaman"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = personalProfile.avatarUrl;
                  }}
                />
              </div>

              <div className="mt-3 px-2 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">
                    {personalProfile.fullName}
                  </h3>
                  <p className="text-xs text-red-500 font-medium">
                    CSE Student • Batch {personalProfile.batch}
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold border border-emerald-200 dark:border-emerald-800">
                  ID: {personalProfile.studentId}
                </span>
              </div>
            </div>

            {/* Vertical Student Metadata Timeline (from reference design) */}
            <div className="w-full max-w-sm pl-4 relative border-l-2 border-red-500 space-y-4 py-2">
              
              {/* Item: Name */}
              <div className="relative pl-6">
                <div className="absolute -left-[23px] top-1.5 h-3.5 w-3.5 rounded-full bg-red-500 border-2 border-white dark:border-black shadow-sm" />
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <span className="font-bold text-slate-900 dark:text-orange-400">Name:</span>
                  <span className="ml-2 font-medium">{personalProfile.fullName}</span>
                </p>
              </div>

              {/* Item: University */}
              <div className="relative pl-6">
                <div className="absolute -left-[23px] top-1.5 h-3.5 w-3.5 rounded-full bg-red-500 border-2 border-white dark:border-black shadow-sm" />
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <span className="font-bold text-slate-900 dark:text-orange-400">University:</span>
                  <span className="ml-2 font-medium">{personalProfile.university}</span>
                </p>
              </div>

              {/* Item: Department */}
              <div className="relative pl-6">
                <div className="absolute -left-[23px] top-1.5 h-3.5 w-3.5 rounded-full bg-red-500 border-2 border-white dark:border-black shadow-sm" />
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <span className="font-bold text-slate-900 dark:text-orange-400">Department:</span>
                  <span className="ml-2 font-medium">CSE (Batch {personalProfile.batch})</span>
                </p>
              </div>

              {/* Item: Focus Language */}
              <div className="relative pl-6">
                <div className="absolute -left-[23px] top-1.5 h-3.5 w-3.5 rounded-full bg-red-500 border-2 border-white dark:border-black shadow-sm" />
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <span className="font-bold text-slate-900 dark:text-orange-400">Primary Language:</span>
                  <span className="ml-2 font-mono font-bold text-red-500">C++</span>
                </p>
              </div>

              {/* Item: Location */}
              <div className="relative pl-6">
                <div className="absolute -left-[23px] top-1.5 h-3.5 w-3.5 rounded-full bg-red-500 border-2 border-white dark:border-black shadow-sm" />
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <span className="font-bold text-slate-900 dark:text-orange-400">Location:</span>
                  <span className="ml-2 font-medium">{personalProfile.location}</span>
                </p>
              </div>

            </div>

            {/* Glowing Conic Resume Download Button */}
            <div className="w-full max-w-sm pt-2">
              <button
                onClick={downloadResumePDF}
                type="button"
                className="w-full relative inline-flex items-center justify-center p-[2px] rounded-full overflow-hidden group cursor-pointer shadow-lg shadow-red-500/20 active:scale-95 transition-all"
              >
                <span className="absolute inset-0 rounded-full bg-[conic-gradient(from_180deg,#ea580c,#fdba74,#f97316,#ea580c)] animate-spin-slow opacity-90 group-hover:opacity-100 blur-[0.4px]" />
                <span className="relative z-10 flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-red-600 to-red-500 text-white font-bold text-sm tracking-wide transition-all group-hover:from-red-500 group-hover:to-red-600 w-full shadow-md">
                  <FileDown className="w-4 h-4" />
                  <span>Download Full Resume</span>
                </span>
              </button>
            </div>

          </div>

          {/* Right Column: Developing Journey & Vision */}
          <div className="w-full lg:w-7/12 flex flex-col space-y-6">
            
            {/* Section Heading with Red Accent */}
            <div>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-orange-500 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-red-500" />
                Background & Aspirations
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mt-1.5">
                About Me— <span className="text-red-500">Developing Journey</span>
              </h2>
              <div className="w-20 h-1 bg-red-500 rounded-full mt-3 mb-6" />
            </div>

            {/* Journey Paragraphs */}
            <div className="space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed text-justify">
              <p>
                I am an undergraduate student in the <strong className="text-slate-900 dark:text-white font-semibold">Department of Computer Science & Engineering</strong> at <strong className="text-slate-900 dark:text-white font-semibold">Green University of Bangladesh</strong> (Batch 251, Student ID: 251002084). My university journey has cultivated a strong foundation in computational principles, data structures, and computer architecture.
              </p>
              
              <p>
                My primary programming language is <strong className="text-red-500 font-semibold font-mono">C++</strong>, which I utilize daily for competitive programming and algorithmic problem solving across Codeforces, CodeChef, and LeetCode. I believe mastering asymptotic complexity and low-level data structures makes for a significantly more effective and thoughtful software engineer.
              </p>

              <p>
                Beyond algorithmic theory, I enjoy building tangible applications that solve real-world problems. I engineered <strong className="text-slate-900 dark:text-white font-semibold">Smart Life Manager</strong>, an offline-first Android productivity companion powered by Kotlin, Jetpack Compose, and Room SQLite, as well as a custom <strong className="text-slate-900 dark:text-white font-semibold">Huffman File Compressor</strong> that performs bit-packing binary compression from scratch.
              </p>

              <p>
                Currently, I am expanding my knowledge in <strong className="text-slate-900 dark:text-white font-semibold">Artificial Intelligence and Machine Learning</strong> while looking forward to software engineering internship opportunities where I can collaborate with senior engineers and deliver robust, scalable software.
              </p>
            </div>

            {/* 3 Metric Highlight Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              
              <div className="p-4 rounded-2xl bg-white dark:bg-zinc-950 border border-slate-100 dark:border-zinc-800 shadow-sm flex flex-col justify-between hover:border-red-500/50 transition-colors">
                <div className="p-2 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-500 w-fit mb-2">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white">74+ Solved</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Codeforces & CodeChef Problem Solving</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-zinc-950 border border-slate-100 dark:border-zinc-800 shadow-sm flex flex-col justify-between hover:border-red-500/50 transition-colors">
                <div className="p-2 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-orange-500 w-fit mb-2">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white">Batch 251</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Green University of Bangladesh CSE</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-zinc-950 border border-slate-100 dark:border-zinc-800 shadow-sm flex flex-col justify-between hover:border-red-500/50 transition-colors">
                <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-500 w-fit mb-2">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white">C++ & Android</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Core Software Engineering Focus</p>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
