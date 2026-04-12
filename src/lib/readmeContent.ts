import { readFileSync } from "fs"

import { marked } from "marked"

const CRITERIA_README_PATH = `${process.cwd()}/README-criteria.md`
const INTERVIEW_README_PATH = `${process.cwd()}/README-interview.md`

let cachedContent: { criteriaHtml: string; interviewHtml: string } | null = null

// Reads and converts project README documents into HTML for the in-app drawer.
export function getReadmeHtml() {
  if (cachedContent) {
    return cachedContent
  }

  const criteriaRaw = readFileSync(CRITERIA_README_PATH, "utf-8")
  const interviewRaw = readFileSync(INTERVIEW_README_PATH, "utf-8")

  cachedContent = {
    criteriaHtml: marked.parse(criteriaRaw) as string,
    interviewHtml: marked.parse(interviewRaw) as string,
  }

  return cachedContent
}
