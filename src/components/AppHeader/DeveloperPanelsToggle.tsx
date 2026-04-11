"use client";

import { useDeveloperPanelsVisibility } from "@/components/DeveloperPanelsVisibility/DeveloperPanelsVisibility";

import styles from "./AppHeader.module.css";

// Toggles visibility of developer learning panels from the header.
export function DeveloperPanelsToggle() {
    const { isVisible, toggle } = useDeveloperPanelsVisibility();

    return (
        <button
            className={styles.panelToggle}
            onClick={toggle}
            type="button"
            aria-pressed={isVisible}
            aria-label={isVisible ? "Hide developer info panels" : "Show developer info panels"}
        >
            {isVisible ? "Hide Dev Panels" : "Show Dev Panels"}
        </button>
    );
}
