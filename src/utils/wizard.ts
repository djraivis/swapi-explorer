// Converts display text into a URL-safe slug.
export function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

// Returns the final path segment from a URL.
export function getLastUrlPart(url: string) {
  return url.replace(/\/+$/, "").split("/").pop()
}

// Converts a slug back into readable title-cased text.
export function unslugify(slug: string) {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
}
