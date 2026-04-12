import type { ReactNode } from "react";

import { AppHeader } from "@/components/AppHeader/AppHeader";
import { DeveloperPanelsVisibilityProvider } from "@/components/DeveloperPanelsVisibility/DeveloperPanelsVisibility";
import { ReadmeDrawerProvider } from "@/components/ReadmeDrawer/ReadmeDrawerContext";
import { ReadmeDrawer } from "@/components/ReadmeDrawer/ReadmeDrawer";
import { getReadmeHtml } from "@/lib/readmeContent";

import styles from "./layout.module.css";

// Wraps explorer routes with the shared header and content layout.
export default function Layout({
  children,
}: {
  children: ReactNode;
}) {
  const { criteriaHtml, interviewHtml } = getReadmeHtml();

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
