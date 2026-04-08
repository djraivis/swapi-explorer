import { AppFooter } from "@/components/AppFooter/AppFooter";
import { AppHeader } from "@/components/AppHeader/AppHeader";
import { NotFoundState } from "@/components/NotFoundState/NotFoundState";

import styles from "./not-found.module.css";

// Renders the global not-found page.
export default function NotFound() {
  return (
    <div className={styles.page}>
      <AppHeader />
      <NotFoundState />
      <AppFooter />
    </div>
  );
}
