import { readFileSync } from "fs";
import { join } from "path";

import { marked } from "marked";

import { AppFooter } from "@/components/AppFooter/AppFooter";
import { AppHeader } from "@/components/AppHeader/AppHeader";
import { DeveloperPanelsVisibilityProvider } from "@/components/DeveloperPanelsVisibility/DeveloperPanelsVisibility";
import { ExplorerPageShell } from "@/components/ExplorerPageShell/ExplorerPageShell";
import { NotFoundState } from "@/components/NotFoundState/NotFoundState";
import { ReadmeDrawer } from "@/components/ReadmeDrawer/ReadmeDrawer";
import { ReadmeDrawerProvider } from "@/components/ReadmeDrawer/ReadmeDrawerContext";
import { getStaticPageDeveloperInfo } from "@/lib/developerInfo";

import styles from "./not-found.module.css";

// Renders the global not-found page.
export default function NotFound() {
  const developerInfo = getStaticPageDeveloperInfo({
    title: "Not-found route flow",
    routeLabel: "/404",
    pageKind: "Static fallback page",
    summary:
      "This fallback route renders when the requested path does not match a supported page. It explains the error state and links users back into known routes without calling SWAPI.",
    flow: [
      "Next.js determines that the requested route is missing and renders the app-level not-found page.",
      "AppHeader stays visible so category navigation remains available from the error state.",
      "NotFoundState renders recovery links back to the home page and the supported categories.",
      "No SWAPI fetch is triggered because there is no valid category or item route to resolve.",
    ],
    noFetchMessage:
      "This page is a routing fallback only. It does not request SWAPI data because the URL did not resolve to a valid category or item page.",
    codeSections: [
      {
        title: "Main page files",
        description: "Core files that render the fallback route and layout shell.",
        references: [
          { filePath: "src/app/not-found.tsx", symbol: "NotFound", note: "App-level fallback route entry point." },
          { filePath: "src/components/NotFoundState/NotFoundState.tsx", symbol: "NotFoundState", note: "Renders the 404 recovery UI." },
          { filePath: "src/app/not-found.module.css", symbol: "page/content", note: "Not-found route layout styles." },
          { filePath: "src/components/NotFoundState/NotFoundState.module.css", symbol: "panel/title/grid", note: "Visual styling for the fallback content." },
        ],
      },
      {
        title: "Functions and hooks",
        description: "Navigation components used to recover from an unknown route.",
        references: [
          { filePath: "src/components/AppHeader/AppHeader.tsx", symbol: "AppHeader", note: "Keeps category navigation available." },
          { filePath: "src/components/AppHeader/AppHeaderNav.tsx", symbol: "AppHeaderNav", note: "Uses usePathname to keep nav state aligned." },
        ],
      },
      {
        title: "Fetch logic",
        description: "No SWAPI fetches are made for the fallback page.",
        references: [
          { filePath: "src/lib/swapi.ts", symbol: "fetchCategoryItems", note: "Referenced for context; this function is not called on not-found." },
        ],
      },
      {
        title: "Helpers and linked styles",
        description: "Shared shell components that keep developer context visible.",
        references: [
          { filePath: "src/components/ExplorerPageShell/ExplorerPageShell.tsx", symbol: "ExplorerPageShell", note: "Provides two-panel developer layout." },
          { filePath: "src/components/DeveloperCodePanel/DeveloperCodePanel.tsx", symbol: "DeveloperCodePanel", note: "Lists route-relevant code links." },
          { filePath: "src/components/AppFooter/AppFooter.tsx", symbol: "AppFooter", note: "Renders the shared footer." },
        ],
      },
    ],
    codeReferences: [
      { filePath: "src/app/not-found.tsx", symbol: "NotFound", note: "App-level fallback route entry point." },
      {
        filePath: "src/components/NotFoundState/NotFoundState.tsx",
        symbol: "NotFoundState",
        note: "Renders the visible 404 UI and recovery links.",
      },
      { filePath: "src/components/AppHeader/AppHeader.tsx", symbol: "AppHeader", note: "Keeps top-level navigation available." },
      {
        filePath: "src/components/ExplorerPageShell/ExplorerPageShell.tsx",
        symbol: "ExplorerPageShell",
        note: "Provides the shared main-column and developer-sidebar layout.",
      },
    ],
  })

  const criteriaHtml = marked.parse(readFileSync(join(process.cwd(), "README-criteria.md"), "utf-8")) as string;
  const interviewHtml = marked.parse(readFileSync(join(process.cwd(), "README-interview.md"), "utf-8")) as string;

  return (
    <DeveloperPanelsVisibilityProvider>
      <ReadmeDrawerProvider criteriaHtml={criteriaHtml} interviewHtml={interviewHtml}>
        <div className={styles.page}>
          <AppHeader />
          <main className={styles.content} id="main-content" tabIndex={-1}>
            <ExplorerPageShell developerInfo={developerInfo}>
              <div className={styles.primaryColumn}>
                <NotFoundState />
                <AppFooter />
              </div>
            </ExplorerPageShell>
          </main>
        </div>
        <ReadmeDrawer />
      </ReadmeDrawerProvider>
    </DeveloperPanelsVisibilityProvider>
  );
}
