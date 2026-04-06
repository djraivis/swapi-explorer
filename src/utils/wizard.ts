export function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

export function getLastUrlPart(url: string) {
  return url.replace(/\/+$/, "").split("/").pop()
}

export function unslugify(slug: string) {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
}
