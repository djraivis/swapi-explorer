import type { ReactNode } from "react";

import { AppHeader } from "@/components/AppHeader/AppHeader";

import styles from "./layout.module.css";

export default function Layout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className={styles.page}>
      <AppHeader />
      <main className={styles.content}>{children}</main>
    </div>
  );
}
