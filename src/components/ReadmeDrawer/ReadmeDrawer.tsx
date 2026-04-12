"use client";

import { useEffect } from "react";

import { useReadmeDrawer } from "./ReadmeDrawerContext";
import styles from "./ReadmeDrawer.module.css";

const TITLES: Record<string, string> = {
    criteria: "README — Acceptance Criteria",
    interview: "README — Interview Reference",
};

// Slide-in drawer that renders a README document as formatted HTML.
export function ReadmeDrawer() {
    const { activeDoc, criteriaHtml, interviewHtml, close } = useReadmeDrawer();
    const isOpen = activeDoc !== null;
    const html = activeDoc === "criteria" ? criteriaHtml : interviewHtml;
    const title = activeDoc ? TITLES[activeDoc] : "";

    // Close on Escape key
    useEffect(() => {
        if (!isOpen) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") close();
        };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, [isOpen, close]);

    // Prevent body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <>
            <div
                className={styles.backdrop}
                onClick={close}
                aria-hidden="true"
            />
            <aside
                className={styles.drawer}
                aria-label={title}
                role="complementary"
            >
                <div className={styles.drawerHeader}>
                    <span className={styles.drawerTitle}>{title}</span>
                    <button
                        className={styles.closeButton}
                        onClick={close}
                        type="button"
                        aria-label="Close readme panel"
                    >
                        ✕
                    </button>
                </div>
                <div
                    className={styles.content}
                    // Safe: content is our own static markdown files converted server-side
                    dangerouslySetInnerHTML={{ __html: html }}
                />
            </aside>
        </>
    );
}
