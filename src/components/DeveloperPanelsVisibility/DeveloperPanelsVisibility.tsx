"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

const STORAGE_KEY = "swapi-dev-panels-visible";

type DeveloperPanelsVisibilityContextValue = {
    isVisible: boolean;
    toggle: () => void;
};

const DeveloperPanelsVisibilityContext = createContext<DeveloperPanelsVisibilityContextValue | null>(null);

export function DeveloperPanelsVisibilityProvider({ children }: { children: ReactNode }) {
    const [isVisible, setIsVisible] = useState<boolean>(() => {
        if (typeof window === "undefined") {
            return true;
        }

        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved === "true" || saved === "false") {
            return saved === "true";
        }

        return true;
    });

    const toggle = useCallback(() => {
        setIsVisible((previous) => {
            const next = !previous;
            window.localStorage.setItem(STORAGE_KEY, String(next));
            return next;
        });
    }, []);

    const value = useMemo(() => ({ isVisible, toggle }), [isVisible, toggle]);

    return (
        <DeveloperPanelsVisibilityContext.Provider value={value}>
            {children}
        </DeveloperPanelsVisibilityContext.Provider>
    );
}

export function useDeveloperPanelsVisibility() {
    const context = useContext(DeveloperPanelsVisibilityContext);

    if (!context) {
        return {
            isVisible: true,
            toggle: () => { },
        };
    }

    return context;
}
