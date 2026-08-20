const DIACRITICS: Record<string, string> = {
  à: "a", á: "a", â: "a", ã: "a", ä: "a", å: "a", ā: "a", æ: "ae",
  ç: "c", ć: "c", č: "c",
  è: "e", é: "e", ê: "e", ë: "e", ē: "e",
  ì: "i", í: "i", î: "i", ï: "i", ī: "i",
  ñ: "n", ń: "n",
  ò: "o", ó: "o", ô: "o", õ: "o", ö: "o", ø: "o", ō: "o", œ: "oe",
  ù: "u", ú: "u", û: "u", ü: "u", ū: "u",
  ý: "y", ÿ: "y",
  ß: "ss",
  ð: "d", þ: "th",
}

export function slugify(text: string): string {
  const normalized = text
    .split("")
    .map((char) => DIACRITICS[char] ?? char)
    .join("")

  const slug = normalized
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")

  return slug || "item"
}

export function uniqueSlugBase(text: string): string {
  return slugify(text)
}
