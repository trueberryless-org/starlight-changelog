import { defineCollection } from "astro:content";

import { githubReleasesLoader } from "./libs/loader";

const releases = defineCollection({
  loader: githubReleasesLoader(),
});

export const collections = { releases };
