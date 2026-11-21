/** Rough reading time for an MDX body; code blocks are ignored. */
export function readingTime(body: string) {
  const words = body.replace(/```[\s\S]*?```/g, " ").split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 220))} min read`;
}
