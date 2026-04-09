import type { ReactNode } from "react";

import { AppHeader } from "@/components/AppHeader/AppHeader";

import styles from "./layout.module.css";

// Wraps explorer routes with the shared header and content layout.
export default function Layout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className={styles.page}>
      <AppHeader />
      <main className={styles.content} id="main-content" tabIndex={-1}>
        {children}
      </main>
    </div>
  );
}
