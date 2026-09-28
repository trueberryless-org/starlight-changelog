const VITE_PRELOAD_PLACEHOLDER = "__VITE_PRELOAD__";

export function shouldInlineAsset(_filePath: string, content: Buffer) {
  return content.includes(VITE_PRELOAD_PLACEHOLDER) ? false : undefined;
}
