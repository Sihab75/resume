import { useState, useEffect } from 'react';

interface CodeforcesStats {
  rating: number;
  maxRating: number;
  rank: string;
  solvedCount: number;
  avatar: string;
  loading: boolean;
  error: boolean;
}

const DEFAULT_STATS: CodeforcesStats = {
  rating: 693,
  maxRating: 693,
  rank: 'newbie',
  solvedCount: 74,
  avatar: 'https://userpic.codeforces.org/4890928/avatar/1a44ba8e4c2cfeba.jpg',
  loading: false,
  error: false
};

export function useCodeforces(handle: string = 'korimuljaman') {
  const [stats, setStats] = useState<CodeforcesStats>({
    ...DEFAULT_STATS,
    loading: true
  });

  useEffect(() => {
    let isMounted = true;

    async function fetchStats() {
      try {
        const [infoRes, statusRes] = await Promise.allSettled([
          fetch(`https://codeforces.com/api/user.info?handles=${handle}`),
          fetch(`https://codeforces.com/api/user.status?handle=${handle}&from=1&count=100`)
        ]);

        let rating = DEFAULT_STATS.rating;
        let maxRating = DEFAULT_STATS.maxRating;
        let rank = DEFAULT_STATS.rank;
        let avatar = DEFAULT_STATS.avatar;
        let solvedCount = DEFAULT_STATS.solvedCount;

        if (infoRes.status === 'fulfilled' && infoRes.value.ok) {
          const data = await infoRes.value.json();
          if (data.status === 'OK' && data.result?.length > 0) {
            const user = data.result[0];
            rating = user.rating ?? rating;
            maxRating = user.maxRating ?? maxRating;
            rank = user.rank ?? rank;
            avatar = user.avatar ?? avatar;
          }
        }

        if (statusRes.status === 'fulfilled' && statusRes.value.ok) {
          const sData = await statusRes.value.json();
          if (sData.status === 'OK' && Array.isArray(sData.result)) {
            const passed = sData.result.filter((s: { verdict?: string }) => s.verdict === 'OK');
            // Count unique problems solved
            const uniqueProblems = new Set(
              passed.map((s: { problem?: { contestId?: number; index?: string } }) => 
                `${s.problem?.contestId}-${s.problem?.index}`
              )
            );
            if (uniqueProblems.size > 0) {
              solvedCount = uniqueProblems.size;
            }
          }
        }

        if (isMounted) {
          setStats({
            rating,
            maxRating,
            rank,
            solvedCount,
            avatar,
            loading: false,
            error: false
          });
        }
      } catch {
        if (isMounted) {
          setStats({
            ...DEFAULT_STATS,
            loading: false,
            error: true
          });
        }
      }
    }

    fetchStats();

    return () => {
      isMounted = false;
    };
  }, [handle]);

  return stats;
}
