import { SITE } from "./config";

export interface GithubRepo {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  updated_at: string;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
  stargazers_count: number;
}

export interface GithubUser {
  public_repos: number;
  followers: number;
  created_at: string;
}

export interface GithubData {
  user: GithubUser | null;
  repos: GithubRepo[];
  fetchedLive: boolean;
}

const API_BASE = "https://api.github.com";

async function githubFetch<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      headers: { Accept: "application/vnd.github+json" },
      // Revalidate hourly so numbers stay live without hammering the API on every request.
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function getGithubData(): Promise<GithubData> {
  const [user, repos] = await Promise.all([
    githubFetch<GithubUser>(`/users/${SITE.githubUser}`),
    githubFetch<GithubRepo[]>(`/users/${SITE.githubUser}/repos?per_page=100&sort=updated`),
  ]);

  const cleanRepos = (repos ?? [])
    .filter((r) => !r.fork && !r.archived)
    .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime());

  return {
    user,
    repos: cleanRepos,
    fetchedLive: user !== null && repos !== null,
  };
}

export function relativeTimeFromNow(iso: string): string {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diffMs = Math.max(0, now - then);
  const minute = 60_000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const month = 30 * day;

  if (diffMs < hour) {
    const m = Math.max(1, Math.round(diffMs / minute));
    return `${m} dakika önce`;
  }
  if (diffMs < day) {
    const h = Math.round(diffMs / hour);
    return `${h} saat önce`;
  }
  if (diffMs < month) {
    const d = Math.round(diffMs / day);
    return `${d} gün önce`;
  }
  const mo = Math.round(diffMs / month);
  return `${mo} ay önce`;
}
