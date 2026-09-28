import type { Loader, LoaderContext } from "astro/loaders";
import { z } from "astro/zod";

import { type GitHubRelease, fetchGitHubReleases } from "./github";
import { parseReleaseTag } from "./package";

const releaseSchema = z.object({
  createdAt: z.coerce.date(),
  packageName: z.string(),
  publishedAt: z.coerce.date().optional(),
  version: z.string(),
});

export function githubReleasesLoader() {
  return {
    name: "github-releases",
    async load(context) {
      const token = import.meta.env.GITHUB_TOKEN;
      if (!token) {
        context.logger.warn(
          "No `GITHUB_TOKEN` environment variable set. Only the latest 1000 GitHub releases of `withastro/starlight` will be loaded."
        );
      }

      try {
        const { isComplete, releases } = await fetchGitHubReleases(token);

        const ids = await storeReleases(releases, context);
        if (isComplete) deleteStaleReleases(ids, context);
      } catch (error) {
        if (context.store.keys().length === 0) throw error;

        context.logger.warn(
          `Failed to refresh GitHub releases, using cached releases instead. ${error instanceof Error ? error.message : String(error)}`
        );
      }
    },
    schema: releaseSchema,
  } satisfies Loader;
}

async function storeReleases(
  githubReleases: GitHubRelease[],
  context: LoaderContext
) {
  const { generateDigest, parseData, renderMarkdown, store } = context;
  const ids = new Set<string>();

  for (const githubRelease of githubReleases) {
    const id = githubRelease.tag_name;
    const tag = parseReleaseTag(id);
    if (!tag) continue;

    ids.add(id);

    const body = githubRelease.body ?? "";
    const data = await parseData({
      data: { ...tag, ...githubReleaseToDates(githubRelease) },
      id,
    });
    const digest = generateDigest({ body, data });
    if (store.get(id)?.digest === digest) continue;

    store.set({ body, data, digest, id, rendered: await renderMarkdown(body) });
  }

  return ids;
}

function deleteStaleReleases(ids: Set<string>, { store }: LoaderContext) {
  for (const id of store.keys()) {
    if (!ids.has(id)) store.delete(id);
  }
}

function githubReleaseToDates(githubRelease: GitHubRelease) {
  return {
    createdAt: githubRelease.created_at,
    publishedAt: githubRelease.published_at ?? undefined,
  };
}
