"use client"

import { useEffect, useMemo, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"

const LAST_ROUTE_KEY = "swapi-dev-last-route"

type DeveloperRouteTimelineProps = {
    mode: "timeline" | "changes"
    listClassName?: string
    showResetButton?: boolean
    resetButtonClassName?: string
}

type RouteSnapshot = {
    route: string
    params: Record<string, string>
}

function parseRoute(input: string): RouteSnapshot {
    const [pathname, query] = input.split("?")
    const params = new URLSearchParams(query ?? "")
    const paramRecord: Record<string, string> = {}

    for (const [key, value] of params.entries()) {
        paramRecord[key] = value
    }

    return {
        route: pathname || "/",
        params: paramRecord,
    }
}

function toRouteLabel(pathname: string, searchParams: URLSearchParams) {
    const queryString = searchParams.toString()
    return queryString ? `${pathname}?${queryString}` : pathname
}

function getParamDiff(previous: Record<string, string>, current: Record<string, string>) {
    const keys = Array.from(new Set([...Object.keys(previous), ...Object.keys(current)]))

    return keys
        .filter((key) => previous[key] !== current[key])
        .map((key) => {
            const previousValue = previous[key] ?? "(empty)"
            const currentValue = current[key] ?? "(empty)"
            return `${key}: ${previousValue} -> ${currentValue}`
        })
}

// Shows a live route timeline and URL-level diffs between the current and previous navigation.
export function DeveloperRouteTimeline({
    mode,
    listClassName,
    showResetButton = false,
    resetButtonClassName,
}: DeveloperRouteTimelineProps) {
    const pathname = usePathname() || "/"
    const searchParams = useSearchParams()
    const currentRoute = useMemo(() => toRouteLabel(pathname, searchParams), [pathname, searchParams])
    const [previousRoute, setPreviousRoute] = useState<string>("(first view in this tab)")
    const [isHydrated, setIsHydrated] = useState(false)
    const [, setVersion] = useState(0)

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setPreviousRoute(window.localStorage.getItem(LAST_ROUTE_KEY) ?? "(first view in this tab)")
        setIsHydrated(true)
    }, [])

    useEffect(() => {
        window.localStorage.setItem(LAST_ROUTE_KEY, currentRoute)
    }, [currentRoute])

    const handleReset = () => {
        window.localStorage.removeItem(LAST_ROUTE_KEY)
        setPreviousRoute("(first view in this tab)")
        setVersion((value) => value + 1)
    }

    // Render placeholder until after hydration to avoid mismatch
    const displayedPreviousRoute = isHydrated ? previousRoute : "(first view in this tab)"

    const timelineList = (
        <ul className={listClassName} suppressHydrationWarning>
            <li>Previous route: {displayedPreviousRoute}</li>
            <li>Current route: {currentRoute}</li>
            <li>Navigation trigger: URL path/query mutation from Link click or router.replace().</li>
        </ul>
    )

    if (mode === "timeline") {
        if (!showResetButton) {
            return timelineList
        }

        return (
            <>
                {timelineList}
                <button className={resetButtonClassName} onClick={handleReset} type="button">
                    Reset timeline history
                </button>
            </>
        )
    }

    const previousSnapshot = parseRoute(previousRoute.startsWith("(") ? "/" : previousRoute)
    const currentSnapshot = parseRoute(currentRoute)
    const paramDiff = getParamDiff(previousSnapshot.params, currentSnapshot.params)
    const pathChanged = previousSnapshot.route !== currentSnapshot.route

    return (
        <ul className={listClassName} suppressHydrationWarning>
            <li>Path changed: {pathChanged ? "yes" : "no"}</li>
            <li>Previous path: {previousSnapshot.route}</li>
            <li>Current path: {currentSnapshot.route}</li>
            {paramDiff.length === 0 ? (
                <li>No query-param changes detected.</li>
            ) : (
                paramDiff.map((entry) => <li key={entry}>{entry}</li>)
            )}
        </ul>
    )
}
