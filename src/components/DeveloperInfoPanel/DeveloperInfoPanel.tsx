"use client"

import { useEffect, useRef, type ReactNode } from "react"
import type { DeveloperInfoPayload } from "@/lib/developerInfo"

import { DeveloperRouteTimeline } from "@/components/DeveloperRouteTimeline/DeveloperRouteTimeline"

import styles from "./DeveloperInfoPanel.module.css"

type DeveloperInfoPanelProps = {
    payload: DeveloperInfoPayload
    side: "left" | "right"
}

type CollapsibleSectionProps = {
    sectionKey: string
    title: string
    defaultOpen?: boolean
    children: ReactNode
}

const SECTION_STORAGE_PREFIX = "swapi-dev-panel-section"

function getSectionStorageKey(sectionKey: string) {
    return `${SECTION_STORAGE_PREFIX}:${sectionKey}`
}

function getStatusClassName(status: string) {
    return status.toLowerCase().includes("error") ? `${styles.status} ${styles.statusError}` : styles.status
}

function formatDuration(value?: number) {
    if (typeof value !== "number") {
        return "n/a"
    }

    return `${value.toFixed(1)}ms`
}

function CollapsibleSection({ sectionKey, title, defaultOpen = true, children }: CollapsibleSectionProps) {
    const detailsRef = useRef<HTMLDetailsElement>(null)

    useEffect(() => {
        const detailsElement = detailsRef.current

        if (!detailsElement) {
            return
        }

        const stored = window.localStorage.getItem(getSectionStorageKey(sectionKey))

        if (stored === "open") {
            detailsElement.open = true
            return
        }

        if (stored === "closed") {
            detailsElement.open = false
            return
        }

        detailsElement.open = defaultOpen
    }, [sectionKey, defaultOpen])

    const handleToggle = () => {
        const detailsElement = detailsRef.current

        if (!detailsElement) {
            return
        }

        window.localStorage.setItem(getSectionStorageKey(sectionKey), detailsElement.open ? "open" : "closed")
    }

    return (
        <details ref={detailsRef} className={styles.disclosure} open={defaultOpen} onToggle={handleToggle}>
            <summary className={styles.disclosureSummary}>{title}</summary>
            <div className={styles.disclosureBody}>{children}</div>
        </details>
    )
}

function PanelLegend({ side }: { side: "left" | "right" }) {
    return (
        <section className={styles.legend} aria-label="How to use this panel">
            <p className={styles.legendTitle}>How to use this panel</p>
            <ul className={styles.flowList}>
                <li className={styles.flowItem}>Expand sections to focus on one concept at a time.</li>
                <li className={styles.flowItem}>Track route changes with timeline to understand re-renders.</li>
                <li className={styles.flowItem}>
                    {side === "left"
                        ? "Use this side for request behavior and runtime lifecycle."
                        : "Use this side for component architecture and data ownership."}
                </li>
            </ul>
        </section>
    )
}

function renderFetchActivity(payload: DeveloperInfoPayload) {
    if (payload.fetches.length === 0) {
        return <p className={styles.empty}>{payload.noFetchMessage ?? "No fetches were recorded for this render."}</p>
    }

    return (
        <ul className={styles.fetchList}>
            {payload.fetches.map((fetchEntry) => (
                <li key={`${fetchEntry.endpoint}-${fetchEntry.trigger}-${fetchEntry.pageIndex ?? 0}`} className={styles.fetchItem}>
                    <div className={styles.fetchHeader}>
                        <p className={styles.endpoint}>{fetchEntry.endpoint}</p>
                        <span className={getStatusClassName(fetchEntry.responseStatus)}>{fetchEntry.responseStatus}</span>
                    </div>
                    <p className={styles.trigger}>{fetchEntry.trigger}</p>
                    <p className={styles.explanation}>{fetchEntry.explanation}</p>
                    <p className={styles.explanation}>
                        Duration: {formatDuration(fetchEntry.durationMs)} | Cache: {fetchEntry.cacheStatus ?? "unknown"} | Page index: {fetchEntry.pageIndex ?? "n/a"}
                    </p>
                    <div className={styles.codeBlock}>
                        {fetchEntry.codeReferences.map((reference) => (
                            <p key={`${fetchEntry.endpoint}-${reference.filePath}-${reference.symbol}`} className={styles.codeItem}>
                                <span className={styles.codePath}>{reference.filePath}</span> {"->"} {reference.symbol}
                                {reference.note ? ` - ${reference.note}` : ""}
                            </p>
                        ))}
                    </div>
                </li>
            ))}
        </ul>
    )
}

function renderLeftPanel(payload: DeveloperInfoPayload) {
    return (
        <>
            <CollapsibleSection sectionKey="left-data-flow-summary" title="Data Flow Summary" defaultOpen={true}>
                <p className={styles.summary}>{payload.summary}</p>
                <ul className={styles.flowList}>
                    {payload.flow.map((step) => (
                        <li key={step} className={styles.flowItem}>
                            {step}
                        </li>
                    ))}
                </ul>
            </CollapsibleSection>

            <CollapsibleSection sectionKey="left-render-mode-and-boundaries" title="1. Render Mode and Boundaries" defaultOpen={true}>
                <ul className={styles.flowList}>
                    {payload.renderBoundaries.map((entry) => (
                        <li key={entry} className={styles.flowItem}>
                            {entry}
                        </li>
                    ))}
                </ul>
            </CollapsibleSection>

            <CollapsibleSection sectionKey="left-url-state-timeline" title="2. URL State Timeline" defaultOpen={true}>
                <DeveloperRouteTimeline
                    mode="timeline"
                    listClassName={styles.flowList}
                    showResetButton={true}
                    resetButtonClassName={styles.resetButton}
                />
            </CollapsibleSection>

            <CollapsibleSection sectionKey="left-data-lifecycle-timings" title="3. Data Lifecycle Timings" defaultOpen={true}>
                <ul className={styles.flowList}>
                    <li className={styles.flowItem}>Total duration: {formatDuration(payload.timingSummary.totalDurationMs)}</li>
                    <li className={styles.flowItem}>Average duration: {formatDuration(payload.timingSummary.averageDurationMs)}</li>
                    <li className={styles.flowItem}>Slowest request: {formatDuration(payload.timingSummary.slowestDurationMs)}</li>
                    <li className={styles.flowItem}>
                        Cache hints: {payload.timingSummary.cacheHints.length === 0 ? "none" : payload.timingSummary.cacheHints.join(", ")}
                    </li>
                </ul>
            </CollapsibleSection>

            <CollapsibleSection sectionKey="left-pagination-internals" title="4. Pagination Internals" defaultOpen={true}>
                <ul className={styles.flowList}>
                    <li className={styles.flowItem}>Pages traversed: {payload.paginationSummary.pagesTraversed}</li>
                    <li className={styles.flowItem}>Total fetch calls: {payload.paginationSummary.totalFetchCalls}</li>
                    <li className={styles.flowItem}>Unique endpoints: {payload.paginationSummary.uniqueEndpoints}</li>
                </ul>
            </CollapsibleSection>

            <CollapsibleSection sectionKey="left-error-and-fallback-path" title="5. Error and Fallback Path" defaultOpen={true}>
                <ul className={styles.flowList}>
                    <li className={styles.flowItem}>State: {payload.fallback.state}</li>
                    <li className={styles.flowItem}>{payload.fallback.reason}</li>
                </ul>
            </CollapsibleSection>

            <CollapsibleSection sectionKey="left-fetch-activity" title="Fetch Activity" defaultOpen={true}>
                {renderFetchActivity(payload)}
            </CollapsibleSection>
        </>
    )
}

function renderRightPanel(payload: DeveloperInfoPayload) {
    return (
        <>
            <CollapsibleSection sectionKey="right-component-tree-for-current-view" title="6. Component Tree For Current View" defaultOpen={true}>
                <ul className={styles.flowList}>
                    {payload.componentTree.map((node) => (
                        <li key={node} className={styles.flowItem}>
                            {node}
                        </li>
                    ))}
                </ul>
            </CollapsibleSection>

            <CollapsibleSection sectionKey="right-slug-resolution-debug" title="7. Slug Resolution Debug" defaultOpen={true}>
                {payload.slugDebug ? (
                    <ul className={styles.flowList}>
                        <li className={styles.flowItem}>Slug: {payload.slugDebug.slug}</li>
                        <li className={styles.flowItem}>Matcher: {payload.slugDebug.matcher}</li>
                        <li className={styles.flowItem}>Matched label: {payload.slugDebug.matchedLabel}</li>
                        <li className={styles.flowItem}>{payload.slugDebug.note}</li>
                    </ul>
                ) : (
                    <p className={styles.empty}>Not applicable on this route.</p>
                )}
            </CollapsibleSection>

            <CollapsibleSection sectionKey="right-type-shape-preview" title="8. Type Shape Preview" defaultOpen={true}>
                <ul className={styles.flowList}>
                    <li className={styles.flowItem}>Expected type: {payload.typePreview.expectedType}</li>
                    <li className={styles.flowItem}>Sample shape: {payload.typePreview.sampleShape}</li>
                    <li className={styles.flowItem}>
                        Present fields: {payload.typePreview.presentFields.length === 0 ? "none" : payload.typePreview.presentFields.join(", ")}
                    </li>
                    <li className={styles.flowItem}>
                        Missing fields: {payload.typePreview.missingFields.length === 0 ? "none" : payload.typePreview.missingFields.join(", ")}
                    </li>
                </ul>
            </CollapsibleSection>

            <CollapsibleSection sectionKey="right-state-source-map" title="9. State Source Map" defaultOpen={true}>
                <ul className={styles.flowList}>
                    {payload.stateSources.map((source) => (
                        <li key={`${source.label}-${source.source}`} className={styles.flowItem}>
                            <strong>{source.label}</strong>: {source.source} - {source.details}
                        </li>
                    ))}
                </ul>
            </CollapsibleSection>

            <CollapsibleSection sectionKey="right-what-changed-since-last-navigation" title="10. What Changed Since Last Navigation" defaultOpen={true}>
                <DeveloperRouteTimeline mode="changes" listClassName={styles.flowList} />
                <ul className={styles.flowList}>
                    {payload.changeHints.map((hint) => (
                        <li key={hint} className={styles.flowItem}>
                            {hint}
                        </li>
                    ))}
                </ul>
            </CollapsibleSection>

            <CollapsibleSection sectionKey="right-related-code" title="Related Code" defaultOpen={true}>
                <ul className={styles.referenceList}>
                    {payload.codeReferences.map((reference) => (
                        <li key={`${reference.filePath}-${reference.symbol}`} className={styles.referenceItem}>
                            <span className={styles.codePath}>{reference.filePath}</span> {"->"} {reference.symbol}
                            {reference.note ? ` - ${reference.note}` : ""}
                        </li>
                    ))}
                </ul>
            </CollapsibleSection>
        </>
    )
}

// Renders one side of the two-panel learning dashboard for the active route.
export function DeveloperInfoPanel({ payload, side }: DeveloperInfoPanelProps) {
    const idPrefix = `developer-${side}`

    return (
        <aside className={styles.panel} aria-labelledby={`${idPrefix}-title`}>
            <div className={styles.header}>
                <p className={styles.eyebrow}>{side === "left" ? "Developer Info - Execution" : "Developer Info - Architecture"}</p>
                <h2 className={styles.title} id={`${idPrefix}-title`}>
                    {payload.title}
                </h2>
                <p className={styles.meta}>
                    {payload.pageKind} - {payload.routeLabel}
                </p>
            </div>

            <PanelLegend side={side} />
            {side === "left" ? renderLeftPanel(payload) : renderRightPanel(payload)}
        </aside>
    )
}
