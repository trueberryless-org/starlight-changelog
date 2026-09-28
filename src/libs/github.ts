import { z } from "astro/zod";

const GITHUB_RELEASES_URL =
  "https://api.github.com/repos/withastro/starlight/releases";
const GITHUB_RELEASES_PER_PAGE = 100;
const GITHUB_UNAUTHENTICATED_RESULTS_LIMIT_STATUS = 422;

const githubReleaseSchema = z.object({
  body: z.string().nullable(),
  created_at: z.string(),
  published_at: z.string().nullable(),
  tag_name: z.string(),
});

export async function fetchGitHubReleases(token: string | undefined) {
  const releases: GitHubRelease[] = [];

  for (let page = 1; ; page++) {
    const pageReleases = await fetchGitHubReleasesPage(page, token);
    if (!pageReleases) return { isComplete: false, releases };

    releases.push(...pageReleases);
    if (pageReleases.length < GITHUB_RELEASES_PER_PAGE) {
      return { isComplete: true, releases };
    }
  }
}

async function fetchGitHubReleasesPage(
  page: number,
  token: string | undefined
) {
  const url = new URL(GITHUB_RELEASES_URL);
  url.searchParams.set("per_page", String(GITHUB_RELEASES_PER_PAGE));
  url.searchParams.set("page", String(page));

  const response = await fetch(url, { headers: getGitHubHeaders(token) });
  if (
    !token &&
    response.status === GITHUB_UNAUTHENTICATED_RESULTS_LIMIT_STATUS
  ) {
    return;
  }
  if (!response.ok) {
    throw new Error(
      `Failed to fetch GitHub releases from \`${url}\` (status code: ${response.status}).`
    );
  }

  return z.array(githubReleaseSchema).parse(await response.json());
}

function getGitHubHeaders(token: string | undefined) {
  const headers = new Headers({
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  });
  if (token) headers.set("Authorization", `Bearer ${token}`);

  return headers;
}

export type GitHubRelease = z.output<typeof githubReleaseSchema>;
