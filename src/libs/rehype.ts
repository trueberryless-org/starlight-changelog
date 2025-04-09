import { visit } from "unist-util-visit";

export function myRehypePluginToRemoveHeadings1() {
  /**
   * @param {Root} tree
   */
  return function (tree: any) {
    visit(tree, "element", function (node, index, parent) {
      if (["h2"].includes(node.tagName)) {
        parent.children.splice(index, 1);
      }
    });
  };
}

export function myRehypePluginToPrefixHeadingsWithEmojies() {
  /**
   * @param {Root} tree
   */
  return function (tree: any) {
    visit(tree, "element", function (node) {
      if (node.tagName === "h3" && node.children) {
        const headingText = node.children
          .filter((child: any) => child.type === "text")
          .map((child: any) => child.value)
          .join("");

        let emoji = "";

        if (headingText.toLowerCase().includes("patch")) {
          emoji = "🐞";
        } else if (headingText.toLowerCase().includes("minor")) {
          emoji = "🍿";
        } else if (headingText.toLowerCase().includes("major")) {
          emoji = "✨";
        }

        if (emoji) {
          node.children.unshift({
            type: "text",
            value: `${emoji} `,
          });
        }
      }
    });
  };
}
