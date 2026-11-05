import { useState, useEffect } from 'react';

interface CodeforcesStats {
  rating: number | null;
  maxRating: number | null;
  rank: string | null;
  solvedCount: number | null;
  loading: boolean;
  error: boolean;
}

interface CodeforcesResponse {
  status?: unknown;
  result?: unknown;
}

interface CodeforcesUser {
  rating: number | null;
  maxRating: number | null;
  rank: string | null;
};

const INITIAL_STATS: CodeforcesStats = {
  rating: null,
  maxRating: null,
  rank: null,
  solvedCount: null,
  loading: true,
  error: false
};

function getUser(response: CodeforcesResponse): CodeforcesUser | null {
  if (response.status !== 'OK' || !Array.isArray(response.result)) return null;

  const user = response.result[0];
  if (!user || typeof user !== 'object') return null;

  const record = user as Record<string, unknown>;
  return {
    rating: typeof record.rating === 'number' && Number.isFinite(record.rating) ? record.rating : null,
    maxRating: typeof record.maxRating === 'number' && Number.isFinite(record.maxRating) ? record.maxRating : null,
    rank: typeof record.rank === 'string' ? record.rank : null
  };
}

function getSolvedCount(response: CodeforcesResponse): number | null {
  if (response.status !== 'OK' || !Array.isArray(response.result)) return null;

  const solvedProblems = new Set<string>();
  for (const submission of response.result) {
    if (!submission || typeof submission !== 'object') continue;

    const record = submission as {
      verdict?: unknown;
      problem?: { contestId?: unknown; index?: unknown };
    };
    const { contestId, index } = record.problem ?? {};
    if (
      record.verdict === 'OK' &&
      typeof contestId === 'number' &&
      typeof index === 'string'
    ) {
      solvedProblems.add(`${contestId}-${index}`);
    }
  }

  return solvedProblems.size;
}

export function useCodeforces(handle: string) {
  const [state, setState] = useState<{ handle: string; stats: CodeforcesStats }>(() => ({
    handle,
    stats: INITIAL_STATS
  }));

  useEffect(() => {
    const controller = new AbortController();

    async function fetchStats() {
      try {
        const infoParams = new URLSearchParams({ handles: handle });
        const statusParams = new URLSearchParams({ handle, from: '1', count: '100' });
        const fetchJson = async (url: string): Promise<CodeforcesResponse> => {
          const response = await fetch(url, { signal: controller.signal });
          if (!response.ok) throw new Error(`Codeforces API returned HTTP ${response.status}`);
          return await response.json() as CodeforcesResponse;
        };
        const [infoRes, statusRes] = await Promise.allSettled([
          fetchJson(`https://codeforces.com/api/user.info?${infoParams}`),
          fetchJson(`https://codeforces.com/api/user.status?${statusParams}`)
        ]);

        if (controller.signal.aborted) return;

        const user = infoRes.status === 'fulfilled' ? getUser(infoRes.value) : null;
        const solvedCount = statusRes.status === 'fulfilled' ? getSolvedCount(statusRes.value) : null;
        const hasData = user !== null || solvedCount !== null;

        setState({
          handle,
          stats: {
            rating: user?.rating ?? null,
            maxRating: user?.maxRating ?? null,
            rank: user?.rank ?? null,
            solvedCount,
            loading: false,
            error: !hasData
          }
        });
      } catch {
        if (!controller.signal.aborted) {
          setState({
            handle,
            stats: {
              rating: null,
              maxRating: null,
              rank: null,
              solvedCount: null,
              loading: false,
              error: true
            }
          });
        }
      }
    }

    fetchStats();

    return () => {
      controller.abort();
    };
  }, [handle]);

  return state.handle === handle ? state.stats : INITIAL_STATS;
}
