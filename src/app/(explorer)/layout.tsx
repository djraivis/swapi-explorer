import { readFileSync } from "fs";
import { join } from "path";
import type { ReactNode } from "react";

import { marked } from "marked";

import { AppHeader } from "@/components/AppHeader/AppHeader";
import { DeveloperPanelsVisibilityProvider } from "@/components/DeveloperPanelsVisibility/DeveloperPanelsVisibility";
import { ReadmeDrawerProvider } from "@/components/ReadmeDrawer/ReadmeDrawerContext";
import { ReadmeDrawer } from "@/components/ReadmeDrawer/ReadmeDrawer";

import styles from "./layout.module.css";

function readReadme(filename: string): string {
  const filePath = join(process.cwd(), filename);
  const raw = readFileSync(filePath, "utf-8");
  return marked.parse(raw) as string;
}

// Wraps explorer routes with the shared header and content layout.
export default function Layout({
  children,
}: {
  children: ReactNode;
}) {
  const criteriaHtml = readReadme("README-criteria.md");
  const interviewHtml = readReadme("README-interview.md");

  return (
    <DeveloperPanelsVisibilityProvider>
      <ReadmeDrawerProvider criteriaHtml={criteriaHtml} interviewHtml={interviewHtml}>
        <div className={styles.page}>
          <AppHeader />
          <main className={styles.content} id="main-content" tabIndex={-1}>
            {children}
          </main>
        </div>
        <ReadmeDrawer />
      </ReadmeDrawerProvider>
    </DeveloperPanelsVisibilityProvider>
  );
}
