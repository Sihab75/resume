import React from 'react';
import { ExternalLink, Trophy, Code2 } from 'lucide-react';
import { competitiveProfilesData } from '../data/competitive';
import { useCodeforces } from '../hooks/useCodeforces';
import { personalProfile } from '../data/profile';
import { CodeforcesIcon, CodeChefIcon, LeetCodeIcon } from '../components/Icons';

export const Competitive: React.FC = () => {
  const cfStats = useCodeforces(personalProfile.codeforcesHandle);

  return (
    <section id="competitive" className="py-12 md:py-16 overflow-hidden">
      {/* Section Container Card inspired by reference */}
      <div className="w-[92%] max-w-7xl mx-auto rounded-[2.25rem] p-6 sm:p-8 md:p-12 bg-gradient-to-br from-pink-50/70 via-slate-50/90 to-white/95 dark:from-black dark:via-slate-900/90 dark:to-black border border-red-100/70 dark:border-zinc-800/80 shadow-xl shadow-red-500/5">
        
        {/* Section Header */}
        <div className="mb-10 md:mb-12">
          <p className="text-xs sm:text-sm font-bold tracking-widest uppercase text-slate-800 dark:text-orange-500 flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-red-500" />
            Competitive Programming
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">
            Algorithmic Contests & <span className="text-red-500">Problem Solving</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
            Regular practice in data structures, time-complexity analysis, and contest rounds using C++17.
          </p>
        </div>

        {/* Live Codeforces Highlight Card */}
        <div className="mb-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-zinc-900 to-black text-white border border-red-900/40 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 shrink-0 shadow-lg shadow-red-500/20">
                <CodeforcesIcon className="w-7 h-7" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-400">
                    Verified Contest Profile
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Codeforces API Active
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
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 bg-zinc-900/80 p-3 sm:p-4 rounded-2xl border border-zinc-800 w-full lg:w-auto">
              <div className="text-center px-2 py-1 bg-zinc-800/40 rounded-xl sm:bg-transparent">
                <span className="block text-[11px] text-slate-400">Current Rating</span>
                <span className="text-lg sm:text-2xl font-mono font-bold text-red-400">
                  {cfStats.rating}
                </span>
              </div>
              <div className="text-center px-2 py-1 bg-zinc-800/40 rounded-xl sm:bg-transparent">
                <span className="block text-[11px] text-slate-400">Max Rating</span>
                <span className="text-lg sm:text-2xl font-mono font-bold text-slate-200">
                  {cfStats.maxRating}
                </span>
              </div>
              <div className="text-center px-2 py-1 bg-zinc-800/40 rounded-xl sm:bg-transparent">
                <span className="block text-[11px] text-slate-400">Rank</span>
                <span className="text-sm sm:text-base font-bold capitalize text-slate-300">
                  {cfStats.rank}
                </span>
              </div>
              <div className="text-center px-2 py-1 bg-zinc-800/40 rounded-xl sm:bg-transparent">
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
              className="w-full lg:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-bold bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-600/30 transition-all shrink-0 active:scale-95"
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
              className="flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-white dark:bg-zinc-950 border border-slate-100 dark:border-zinc-800/80 hover:border-red-500/50 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    {profile.platform === 'Codeforces' && <CodeforcesIcon className="w-4 h-4 text-red-500" />}
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
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-zinc-900 text-slate-500">
                      {profile.badge}
                    </span>
                  )}
                </div>

                <div className="text-xs font-mono font-medium text-slate-600 dark:text-slate-400">
                  Handle: <span className="font-bold text-slate-900 dark:text-white">@{profile.handle}</span>
                </div>

                {profile.rating && (
                  <div className="mt-3 flex items-center gap-2 text-xs">
                    <span className="px-2 py-0.5 rounded bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 font-bold font-mono">
                      Rating: {profile.rating}
                    </span>
                    {profile.rank && (
                      <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-zinc-900 text-slate-700 dark:text-slate-300 font-medium">
                        {profile.rank}
                      </span>
                    )}
                  </div>
                )}

                <p className="mt-3 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {profile.note}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-zinc-800">
                <a
                  href={profile.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-full text-xs font-bold bg-slate-100 hover:bg-red-500 hover:text-white dark:bg-zinc-900 dark:hover:bg-red-500 dark:hover:text-white text-slate-700 dark:text-slate-300 transition-colors"
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
