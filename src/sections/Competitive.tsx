import React from 'react';
import { ExternalLink, Trophy, Code2, Zap } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { competitiveProfilesData } from '../data/competitive';
import { useCodeforces } from '../hooks/useCodeforces';
import { personalProfile } from '../data/profile';

export const Competitive: React.FC = () => {
  const cfStats = useCodeforces(personalProfile.codeforcesHandle);

  return (
    <section id="competitive" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Competitive Programming"
          title="Algorithmic Problem Solving & Contests"
          subtitle="Regular practice in data structures, time-complexity analysis, and contest rounds using C++."
        />

        {/* Live Codeforces Highlight Card */}
        <div className="mb-10 p-5 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 text-white border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0">
                <Trophy className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-400">
                    Live Verified Contest Profile
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Codeforces API Connected
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                  Codeforces: {personalProfile.codeforcesHandle}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Regular participant in Div. 2, Div. 3, and Div. 4 contests using C++17.
                </p>
              </div>
            </div>

            {/* Stats Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 bg-slate-800/60 p-3 sm:p-4 rounded-xl border border-slate-700/60 w-full lg:w-auto">
              <div className="text-center px-2 py-1 bg-slate-900/40 rounded-lg sm:bg-transparent">
                <span className="block text-[11px] text-slate-400">Current Rating</span>
                <span className="text-lg sm:text-2xl font-mono font-bold text-red-400">
                  {cfStats.rating}
                </span>
              </div>
              <div className="text-center px-2 py-1 bg-slate-900/40 rounded-lg sm:bg-transparent">
                <span className="block text-[11px] text-slate-400">Max Rating</span>
                <span className="text-lg sm:text-2xl font-mono font-bold text-slate-200">
                  {cfStats.maxRating}
                </span>
              </div>
              <div className="text-center px-2 py-1 bg-slate-900/40 rounded-lg sm:bg-transparent">
                <span className="block text-[11px] text-slate-400">Rank</span>
                <span className="text-sm sm:text-base font-bold capitalize text-slate-300">
                  {cfStats.rank}
                </span>
              </div>
              <div className="text-center px-2 py-1 bg-slate-900/40 rounded-lg sm:bg-transparent">
                <span className="block text-[11px] text-slate-400">Solved Problems</span>
                <span className="text-lg sm:text-2xl font-mono font-bold text-emerald-400">
                  {cfStats.solvedCount}+
                </span>
              </div>
            </div>

            {/* Visit Button */}
            <a
              href={personalProfile.codeforcesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full lg:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-red-600 hover:bg-red-700 text-white shadow-md transition-all shrink-0"
            >
              <span>Visit Codeforces Profile</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Platforms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {competitiveProfilesData.map((profile) => (
            <div
              key={profile.platform}
              className="flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 shadow-sm hover:shadow-md transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-cyan-500" />
                    {profile.platform}
                  </span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    profile.isVerified
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                  }`}>
                    {profile.isVerified ? 'Verified Profile' : 'Placeholder'}
                  </span>
                </div>

                <div className="font-mono text-xs text-slate-600 dark:text-slate-300 font-medium">
                  @{profile.handle}
                </div>

                {profile.rating && (
                  <div className="mt-2 text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                    Rating: {profile.rating} • {profile.badge}
                  </div>
                )}

                <p className="mt-2.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {profile.note}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
                <a
                  href={profile.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between w-full text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                >
                  <span>View {profile.platform}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Why Competitive Programming Banner */}
        <div className="mt-10 p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 text-xs sm:text-sm text-slate-600 dark:text-slate-300 flex flex-col sm:flex-row items-center gap-4">
          <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 shrink-0">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
              Continuous Problem-Solving Routine
            </h4>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Practicing algorithmic contests builds disciplined asymptotic complexity instincts, prevents edge-case bugs, and establishes high-speed fluency with standard library abstractions in C++.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
