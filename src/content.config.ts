import { defineCollection, z } from "astro:content";
import { githubReleasesLoader } from "astro-loader-github-releases";

const releases = defineCollection({
  loader: githubReleasesLoader({
    mode: "repoList",
    repos: ["withastro/starlight"],
    entryReturnType: "byRelease",
  }),
});

export const collections = { releases };
