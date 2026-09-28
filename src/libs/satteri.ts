import { defineHastPlugin } from "satteri";

import { getHeadingEmoji } from "./heading";

export function satteriReleaseHeadings() {
  return defineHastPlugin({
    name: "satteri-release-headings",
    element: {
      filter: ["h2", "h3"],
      visit(node, ctx) {
        if (node.tagName === "h2") {
          ctx.removeNode(node);
          return;
        }

        const emoji = getHeadingEmoji(ctx.textContent(node));
        if (emoji) ctx.prependChild(node, { type: "text", value: `${emoji} ` });
      },
    },
  });
}
