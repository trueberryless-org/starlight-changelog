import { defineCollection, z } from "astro:content";
import { githubReleasesLoader } from "astro-loader-github-releases";

const releases = defineCollection({
  loader: githubReleasesLoader({
    mode: "repoList",
    repos: ["trueberryless-org/starlight-cooler-credit"],
    entryReturnType: "byRelease",
  }),
});

export const collections = { releases };
