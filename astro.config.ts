import { satteri } from "@astrojs/markdown-satteri";
import expressiveCode from "astro-expressive-code";
import { defineConfig, fontProviders } from "astro/config";

import { pagefindIntegration } from "./src/libs/pagefind";
import { satteriReleaseHeadings } from "./src/libs/satteri";
import { shouldInlineAsset } from "./src/libs/vite";

export default defineConfig({
  fonts: [
    {
      cssVariable: "--font-lato",
      fallbacks: ["sans-serif"],
      name: "Lato",
      provider: fontProviders.google(),
      subsets: ["latin"],
      weights: [400, 700],
    },
    {
      cssVariable: "--font-source-code-pro",
      fallbacks: ["monospace"],
      name: "Source Code Pro",
      provider: fontProviders.google(),
      subsets: ["latin"],
      weights: [400],
    },
  ],
  image: {
    domains: ["release-image-generator.netlify.app"],
  },
  integrations: [
    expressiveCode({
      defaultProps: { wrap: true },
      shiki: { langAlias: { mdoc: "markdown" } },
    }),
    pagefindIntegration(),
  ],
  markdown: {
    processor: satteri({ hastPlugins: [satteriReleaseHeadings()] }),
  },
  site: "https://starlight-changelog.netlify.app",
  vite: {
    build: {
      assetsInlineLimit: shouldInlineAsset,
    },
  },
});
