"use client";

import type { ReactNode } from "react";

import type { DeveloperInfoPayload } from "@/lib/developerInfo";
import { useDeveloperPanelsVisibility } from "@/components/DeveloperPanelsVisibility/DeveloperPanelsVisibility";

import { DeveloperCodePanel } from "../DeveloperCodePanel/DeveloperCodePanel";
import { DeveloperInfoPanel } from "../DeveloperInfoPanel/DeveloperInfoPanel";
import styles from "./ExplorerPageShell.module.css";

type ExplorerPageShellProps = {
    developerInfo: DeveloperInfoPayload;
    children: ReactNode;
};

// Lays out explorer pages with their primary content and the developer info sidebar.
export function ExplorerPageShell({ developerInfo, children }: ExplorerPageShellProps) {
    const { isVisible } = useDeveloperPanelsVisibility();

    return (
        <div className={`${styles.shell} ${!isVisible ? styles.shellContentOnly : ""}`}>
            {isVisible ? (
                <div className={styles.sidebar}>
                    <DeveloperInfoPanel payload={developerInfo} side="left" />
                </div>
            ) : null}
            <div className={styles.primary}>
                {children}
                {isVisible ? <DeveloperCodePanel payload={developerInfo} /> : null}
            </div>
            {isVisible ? (
                <div className={styles.sidebar}>
                    <DeveloperInfoPanel payload={developerInfo} side="right" />
                </div>
            ) : null}
        </div>
    );
}
