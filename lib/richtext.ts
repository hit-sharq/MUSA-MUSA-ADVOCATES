/**
 * Clean rich-text HTML produced by the editor before rendering.
 * Removes empty/whitespace-only paragraphs so they don't render as
 * blank lines or stray `<p></p>` tags.
 */
export function cleanRichText(html?: string | null): string {
  if (!html) return ""
  return html
    .replace(/<p>\s*<br\s*\/?>\s*<\/p>/gi, "")
    .replace(/<p>\s*(&nbsp;|\u00a0)\s*<\/p>/gi, "")
    .replace(/<p>\s*<\/p>/gi, "")
    .trim()
}
