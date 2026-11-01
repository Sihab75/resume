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
import profileImg from '../assets/profile.jpg';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Visual Card & Academic Credentials */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start space-y-6">
            
            {/* Visual Portrait Card */}
            <div className="w-full max-w-sm rounded-3xl overflow-hidden bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-md p-3 relative group">
              <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-950 flex items-center justify-center relative">
                <img
                  src={profileImg}
                  alt={personalProfile.fullName}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/profile.jpg';
                  }}
                />
              </div>

              <div className="mt-4 px-2 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">
                    {personalProfile.fullName}
                  </h3>
                  <p className="text-xs text-blue-600 dark:text-cyan-400 font-medium">
                    CSE Student • Batch {personalProfile.batch}
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-cyan-300 text-[11px] font-mono font-bold border border-blue-200 dark:border-blue-900/60">
                  ID: {personalProfile.studentId}
                </span>
              </div>
            </div>

            {/* Quick Facts Card */}
            <div className="w-full max-w-sm p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-blue-500" aria-hidden="true" />
                Quick Academic Identity
              </h4>
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-400">University:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 text-right">Green Univ of Bangladesh</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Department:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">CSE (Batch 251)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Core Focus:</span>
                  <span className="font-mono font-bold text-blue-600 dark:text-cyan-400">C++17 & Android</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Location:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Dhaka, Bangladesh</span>
                </div>
              </div>

              {/* Download Resume Link */}
              <div className="pt-2">
                <button
                  onClick={downloadResumePDF}
                  type="button"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all cursor-pointer active:scale-95"
                >
                  <FileDown className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Download Verified Resume PDF</span>
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Narrative & Highlights */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            
            {/* Header */}
            <div>
              <span className="text-blue-600 dark:text-cyan-400 font-bold uppercase tracking-widest text-xs flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
                Engineering Background
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1.5 tracking-tight">
                About Me & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300">Technical Journey</span>
              </h2>
            </div>

            {/* Paragraphs */}
            <div className="space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>
                I am an undergraduate student in the <strong className="text-slate-900 dark:text-white font-semibold">Department of Computer Science & Engineering</strong> at <strong className="text-slate-900 dark:text-white font-semibold">Green University of Bangladesh</strong> (Batch 251, Student ID: 251002084). My academic coursework has provided me with a rigorous foundation in computational theory, data structures, algorithms, and system design.
              </p>
              
              <p>
                My core programming language is <strong className="text-blue-600 dark:text-cyan-400 font-bold font-mono">C++</strong>, which I utilize daily for competitive programming across Codeforces, CodeChef, and LeetCode. I place heavy emphasis on time-and-space complexity analysis, memory boundaries, and standard library STL algorithms to write high-performance solutions.
              </p>

              <p>
                In practical software development, I build native Android applications utilizing <strong className="text-slate-900 dark:text-white font-semibold">Kotlin, Jetpack Compose, and Room SQLite</strong>, following Clean Architecture and MVVM patterns. I also build systems utilities, such as a custom <strong className="text-slate-900 dark:text-white font-semibold">Huffman File Compressor</strong> that handles streaming binary compression from scratch.
              </p>

              <p>
                Currently, I am expanding my knowledge in <strong className="text-slate-900 dark:text-white font-semibold">Artificial Intelligence and Machine Learning</strong> while seeking software engineering internships where I can contribute to production-quality codebases alongside experienced engineers.
              </p>
            </div>

            {/* 3 Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between hover:border-blue-500/40 transition-colors">
                <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-cyan-400 w-fit mb-2">
                  <Trophy className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white">74+ Solved</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Codeforces & CodeChef Contests</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between hover:border-violet-500/40 transition-colors">
                <div className="p-2 rounded-xl bg-violet-50 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400 w-fit mb-2">
                  <GraduationCap className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white">Batch 251</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Green University of Bangladesh CSE</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between hover:border-cyan-500/40 transition-colors">
                <div className="p-2 rounded-xl bg-cyan-50 dark:bg-cyan-950/50 text-cyan-600 dark:text-cyan-400 w-fit mb-2">
                  <Code2 className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white">C++ & Android</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Primary Engineering Specialties</p>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
