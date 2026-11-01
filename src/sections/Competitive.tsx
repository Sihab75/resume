import React from 'react';
import { ExternalLink, Trophy, Code2 } from 'lucide-react';
import { competitiveProfilesData } from '../data/competitive';
import { useCodeforces } from '../hooks/useCodeforces';
import { personalProfile } from '../data/profile';
import { CodeforcesIcon, CodeChefIcon, LeetCodeIcon } from '../components/Icons';

export const Competitive: React.FC = () => {
  const cfStats = useCodeforces(personalProfile.codeforcesHandle);

  return (
    <section id="competitive" className="py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <p className="text-xs font-bold tracking-widest uppercase text-blue-600 dark:text-cyan-400 flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5 text-blue-500" />
            Competitive Programming
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mt-1.5 tracking-tight">
            Contests & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300">Problem Solving</span>
          </h2>
          <p className="mt-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            Consistent contest participation and algorithmic practice focusing on data structures and complexity analysis in C++17.
          </p>
        </div>

        {/* Live Codeforces Highlight Card */}
        <div className="mb-10 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-900/40 flex items-center justify-center text-blue-600 dark:text-cyan-400 shrink-0 shadow-xs">
                <CodeforcesIcon className="w-7 h-7" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-cyan-400">
                    Verified Contest Profile
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Codeforces API Active
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  Codeforces: {personalProfile.codeforcesHandle}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Regular participant in Div. 2, Div. 3, and Div. 4 contests using C++17.
                </p>
              </div>
            </div>

            {/* Stats Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 bg-slate-50 dark:bg-slate-950/60 p-3 sm:p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800 w-full lg:w-auto">
              <div className="text-center px-2 py-1 bg-white dark:bg-slate-900 rounded-xl sm:bg-transparent shadow-2xs sm:shadow-none">
                <span className="block text-[11px] text-slate-500 dark:text-slate-400">Current Rating</span>
                <span className="text-lg sm:text-2xl font-mono font-bold text-blue-600 dark:text-cyan-400">
                  {cfStats.rating}
                </span>
              </div>
              <div className="text-center px-2 py-1 bg-white dark:bg-slate-900 rounded-xl sm:bg-transparent shadow-2xs sm:shadow-none">
                <span className="block text-[11px] text-slate-500 dark:text-slate-400">Max Rating</span>
                <span className="text-lg sm:text-2xl font-mono font-bold text-slate-800 dark:text-slate-200">
                  {cfStats.maxRating}
                </span>
              </div>
              <div className="text-center px-2 py-1 bg-white dark:bg-slate-900 rounded-xl sm:bg-transparent shadow-2xs sm:shadow-none">
                <span className="block text-[11px] text-slate-500 dark:text-slate-400">Rank</span>
                <span className="text-sm sm:text-base font-bold capitalize text-slate-800 dark:text-slate-200">
                  {cfStats.rank}
                </span>
              </div>
              <div className="text-center px-2 py-1 bg-white dark:bg-slate-900 rounded-xl sm:bg-transparent shadow-2xs sm:shadow-none">
                <span className="block text-[11px] text-slate-500 dark:text-slate-400">Solved Problems</span>
                <span className="text-lg sm:text-2xl font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  {cfStats.solvedCount}+
                </span>
              </div>
            </div>

            {/* Visit Button */}
            <a
              href={personalProfile.codeforcesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full lg:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all shrink-0 active:scale-95"
            >
              <span>Visit Codeforces</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Platforms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {competitiveProfilesData.map((profile) => (
            <div
              key={profile.platform}
              className="flex flex-col justify-between h-full p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/40 dark:hover:border-cyan-500/40 shadow-xs hover:shadow-md transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    {profile.platform === 'Codeforces' && <CodeforcesIcon className="w-4 h-4 text-blue-500" />}
                    {profile.platform === 'CodeChef' && <CodeChefIcon className="w-4 h-4 text-orange-500" />}
                    {profile.platform === 'LeetCode' && <LeetCodeIcon className="w-4 h-4 text-amber-500" />}
                    {profile.platform !== 'Codeforces' && profile.platform !== 'CodeChef' && profile.platform !== 'LeetCode' && (
                      <Code2 className="w-4 h-4 text-slate-400" />
                    )}
                    {profile.platform}
                  </span>
                  
                  {profile.isVerified ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-900/40">
                      Verified
                    </span>
                  ) : (
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
                      {profile.badge}
                    </span>
                  )}
                </div>

                <div className="text-xs font-mono font-medium text-slate-600 dark:text-slate-400">
                  Handle: <span className="font-bold text-slate-900 dark:text-white">@{profile.handle}</span>
                </div>

                {profile.rating && (
                  <div className="mt-3 flex items-center gap-2 text-xs">
                    <span className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-cyan-300 font-bold font-mono">
                      Rating: {profile.rating}
                    </span>
                    {profile.rank && (
                      <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                        {profile.rank}
                      </span>
                    )}
                  </div>
                )}

                <p className="mt-3 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {profile.note}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
                <a
                  href={profile.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-full text-xs font-semibold bg-slate-100 hover:bg-blue-600 hover:text-white dark:bg-slate-800 dark:hover:bg-cyan-500 dark:hover:text-slate-950 text-slate-700 dark:text-slate-300 transition-colors"
                >
                  <span>Open {profile.platform}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
