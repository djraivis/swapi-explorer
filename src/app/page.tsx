import { AppFooter } from "@/components/AppFooter/AppFooter";
import { AppHeader } from "@/components/AppHeader/AppHeader";
import { HomeMain } from "@/components/HomeMain/HomeMain";

import styles from "./page.module.css";

// Renders a simple landing page that links into the route-based explorer.
export default function Home() {
  return (
    <div className={styles.page}>
      {/* <AppHeader showSearch={false} /> */}
      <HomeMain />
      <AppFooter />
    </div>
  );
}
