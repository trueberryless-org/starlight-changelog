import type { AstroIntegration, AstroIntegrationLogger } from "astro";
import { fileURLToPath } from "node:url";
import { close, createIndex } from "pagefind";

export function pagefindIntegration(): AstroIntegration {
  return {
    name: "pagefind",
    hooks: {
      async "astro:build:done"({ dir, logger }) {
        try {
          await writePagefindIndex(dir, logger);
        } finally {
          await close();
        }
      },
    },
  };
}

async function writePagefindIndex(dir: URL, logger: AstroIntegrationLogger) {
  const { errors: indexErrors, index } = await createIndex();
  if (!index)
    throw new Error(
      `Failed to create the Pagefind index: ${indexErrors.join(", ")}.`
    );

  const { errors: directoryErrors, page_count } = await index.addDirectory({
    path: fileURLToPath(dir),
  });
  if (directoryErrors.length > 0) {
    throw new Error(
      `Failed to index the built site with Pagefind: ${directoryErrors.join(", ")}.`
    );
  }

  const { errors: writeErrors } = await index.writeFiles({
    outputPath: fileURLToPath(new URL("pagefind/", dir)),
  });
  if (writeErrors.length > 0) {
    throw new Error(
      `Failed to write the Pagefind index: ${writeErrors.join(", ")}.`
    );
  }

  logger.info(`Indexed ${page_count} pages.`);
}
