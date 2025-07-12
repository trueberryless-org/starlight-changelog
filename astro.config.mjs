// @ts-check
import { defineConfig } from "astro/config";
import astroExpressiveCode from "astro-expressive-code";

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  image: {
    domains: ["release-image-generator.trueberryless.org"],
  },
  integrations: [
    astroExpressiveCode({
      defaultProps: {
        wrap: true,
      },
    }),
  ],
});
