import { readFileSync } from "fs";
import { join } from "path";

import { marked } from "marked";

import { AppFooter } from "@/components/AppFooter/AppFooter";
import { AppHeader } from "@/components/AppHeader/AppHeader";
import { DeveloperPanelsVisibilityProvider } from "@/components/DeveloperPanelsVisibility/DeveloperPanelsVisibility";
import { ExplorerPageShell } from "@/components/ExplorerPageShell/ExplorerPageShell";
import { HomeMain } from "@/components/HomeMain/HomeMain";
import { ReadmeDrawer } from "@/components/ReadmeDrawer/ReadmeDrawer";
import { ReadmeDrawerProvider } from "@/components/ReadmeDrawer/ReadmeDrawerContext";
import { getStaticPageDeveloperInfo } from "@/lib/developerInfo";

import styles from "./page.module.css";

// Renders a simple landing page that links into the route-based explorer.
export default function Home() {
  const developerInfo = getStaticPageDeveloperInfo({
    title: "Home page render flow",
    routeLabel: "/",
    pageKind: "Static landing page",
    summary:
      "The home route renders static server component content only. It links into the explorer, but it does not call SWAPI itself during render.",
    flow: [
      "Next.js renders the landing page server component for the root route.",
      "HomeMain renders the hero, recent-category shortcut, and category cards.",
      "RecentCategory is a client component that reads localStorage after hydration to show the last visited category.",
      "SWAPI requests begin only after the user navigates into a category or item route.",
    ],
    noFetchMessage:
      "This page does not fetch SWAPI data. It is a static entry point that explains the app and links into routes that do the real data loading.",
    codeSections: [
      {
        title: "Main page files",
        description: "Files that render the landing page structure and content.",
        references: [
          { filePath: "src/app/page.tsx", symbol: "Home", note: "Root route entry point." },
          { filePath: "src/components/HomeMain/HomeMain.tsx", symbol: "HomeMain", note: "Renders hero content and category cards." },
          { filePath: "src/app/page.module.css", symbol: "page/content", note: "Landing page-level layout styles." },
          { filePath: "src/components/HomeMain/HomeMain.module.css", symbol: "hero/grid/card", note: "Landing hero and card presentation styles." },
        ],
      },
      {
        title: "Functions and hooks",
        description: "Client-side logic used by the landing page experience.",
        references: [
          { filePath: "src/components/RecentCategory/RecentCategory.tsx", symbol: "RecentCategory", note: "Shows the last visited category from localStorage." },
          { filePath: "src/components/RecentCategory/RecentCategory.tsx", symbol: "useSyncExternalStore", note: "Subscribes to browser storage updates after hydration." },
          { filePath: "src/lib/explorerStorage.ts", symbol: "getRecentCategory", note: "Reads recent-category state from localStorage." },
        ],
      },
      {
        title: "Fetch logic",
        description: "No SWAPI requests are performed on the home route.",
        references: [
          { filePath: "src/lib/swapi.ts", symbol: "fetchCategoryItems", note: "Used after entering a category route, not on home." },
        ],
      },
      {
        title: "Helpers and linked styles",
        description: "Supporting components that complete the landing page composition.",
        references: [
          { filePath: "src/components/AppFooter/AppFooter.tsx", symbol: "AppFooter", note: "Renders the footer under home content." },
          { filePath: "src/components/ExplorerPageShell/ExplorerPageShell.tsx", symbol: "ExplorerPageShell", note: "Wraps content and developer panels." },
          { filePath: "src/components/DeveloperCodePanel/DeveloperCodePanel.tsx", symbol: "DeveloperCodePanel", note: "Shows code references for the active view." },
        ],
      },
    ],
    codeReferences: [
      { filePath: "src/app/page.tsx", symbol: "Home", note: "Root route entry point." },
      { filePath: "src/components/HomeMain/HomeMain.tsx", symbol: "HomeMain", note: "Renders the landing page content." },
      {
        filePath: "src/components/RecentCategory/RecentCategory.tsx",
        symbol: "RecentCategory",
        note: "Reads localStorage after hydration to show the last visited category.",
      },
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
                <HomeMain />
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
