const HEADING_EMOJIS = [
  ["patch", "🐞"],
  ["minor", "🍿"],
  ["major", "✨"],
] as const;

export function getHeadingEmoji(heading: string) {
  const normalizedHeading = heading.toLowerCase();

  return HEADING_EMOJIS.find(([keyword]) =>
    normalizedHeading.includes(keyword)
  )?.[1];
}
