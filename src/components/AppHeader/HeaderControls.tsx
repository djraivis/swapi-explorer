"use client";

import { useDeveloperPanelsVisibility } from "@/components/DeveloperPanelsVisibility/DeveloperPanelsVisibility";
import { useReadmeDrawer, type ReadmeDoc } from "@/components/ReadmeDrawer/ReadmeDrawerContext";

import styles from "./AppHeader.module.css";

// Header right-side controls: dev panels toggle + README doc buttons.
export function HeaderControls() {
    const { isVisible, toggle } = useDeveloperPanelsVisibility();
    const { activeDoc, open } = useReadmeDrawer();

    function handleReadme(doc: ReadmeDoc) {
        open(doc);
    }

    return (
        <div className={styles.headerControls}>
            <button
                className={`${styles.controlButton} ${isVisible ? styles.controlButtonActive : ""}`}
                onClick={toggle}
                type="button"
                aria-pressed={isVisible}
                aria-label={isVisible ? "Hide developer info panels" : "Show developer info panels"}
            >
                Dev Panels
            </button>
            <button
                className={`${styles.controlButton} ${activeDoc === "criteria" ? styles.controlButtonActive : ""}`}
                onClick={() => handleReadme("criteria")}
                type="button"
                aria-pressed={activeDoc === "criteria"}
                aria-label="View acceptance criteria README"
            >
                Criteria
            </button>
            <button
                className={`${styles.controlButton} ${activeDoc === "interview" ? styles.controlButtonActive : ""}`}
                onClick={() => handleReadme("interview")}
                type="button"
                aria-pressed={activeDoc === "interview"}
                aria-label="View interview reference README"
            >
                Interview
            </button>
        </div>
    );
}
