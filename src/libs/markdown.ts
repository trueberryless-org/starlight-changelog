import { createMarkdownProcessor } from "@astrojs/markdown-remark";
import expressiveCode from "rehype-expressive-code";
import { myRehypePluginToPrefixHeadingsWithEmojies, myRehypePluginToRemoveHeadings1 } from "./rehype";

export const render = (
  await createMarkdownProcessor({
    syntaxHighlight: false,
    rehypePlugins: [expressiveCode, myRehypePluginToRemoveHeadings1, myRehypePluginToPrefixHeadingsWithEmojies],
    image: {
      domains: ["trueberryless.org"],
    },
  })
).render;
