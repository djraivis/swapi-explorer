// Converts display text into a URL-safe slug for the live app and the example routes.
export function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

// Converts a slug back into readable title-cased text for the dynamic-routes example only.
export function unslugify(slug: string) {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
}
