import { AppFooter } from "@/components/AppFooter/AppFooter";
import { AppHeader } from "@/components/AppHeader/AppHeader";
import { NotFoundState } from "@/components/NotFoundState/NotFoundState";

import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.page}>
      <AppHeader showSearch={false} />
      <NotFoundState />
      <AppFooter />
    </div>
  );
}
