import type { DeveloperCodeReference, DeveloperInfoPayload } from "@/lib/developerInfo"

import styles from "./DeveloperCodePanel.module.css"

const REPOSITORY_BASE_URL = "https://github.com/djraivis/swapi-explorer/blob/main"

type DeveloperCodePanelProps = {
    payload: DeveloperInfoPayload
}

function getFileUrl(filePath: string) {
    return `${REPOSITORY_BASE_URL}/${filePath}`
}

function renderReference(reference: DeveloperCodeReference) {
    return (
        <li key={`${reference.filePath}-${reference.symbol}`} className={styles.referenceItem}>
            <a
                className={styles.fileLink}
                href={getFileUrl(reference.filePath)}
                rel="noreferrer"
                target="_blank"
            >
                {reference.filePath}
            </a>
            {" "}
            {"->"}
            {" "}
            <span className={styles.symbol}>{reference.symbol}</span>
            {reference.note ? (
                <>
                    {" "}
                    <span className={styles.note}>- {reference.note}</span>
                </>
            ) : null}
        </li>
    )
}

// Renders a code-focused panel that maps the current view to relevant files and logic.
export function DeveloperCodePanel({ payload }: DeveloperCodePanelProps) {
    return (
        <section className={styles.panel} aria-labelledby="developer-code-title">
            <div className={styles.header}>
                <p className={styles.eyebrow}>Developer Code Map</p>
                <h2 className={styles.title} id="developer-code-title">
                    Relevant Code For This View
                </h2>
                <p className={styles.subtitle}>
                    {payload.pageKind} - {payload.routeLabel}
                </p>
            </div>

            <ul className={styles.sectionList}>
                {payload.codeSections.map((section) => (
                    <li key={section.title} className={styles.sectionItem}>
                        <h3 className={styles.sectionTitle}>{section.title}</h3>
                        <p className={styles.sectionDescription}>{section.description}</p>
                        <ul className={styles.referenceList}>{section.references.map(renderReference)}</ul>
                    </li>
                ))}
            </ul>
        </section>
    )
}
