"use client";

import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
    type ReactNode,
} from "react";

export type ReadmeDoc = "criteria" | "interview";

type ReadmeDrawerContextValue = {
    activeDoc: ReadmeDoc | null;
    criteriaHtml: string;
    interviewHtml: string;
    open: (doc: ReadmeDoc) => void;
    close: () => void;
};

const ReadmeDrawerContext = createContext<ReadmeDrawerContextValue | null>(null);

type ReadmeDrawerProviderProps = {
    children: ReactNode;
    criteriaHtml: string;
    interviewHtml: string;
};

// Provides state and content for the slide-in README drawer.
export function ReadmeDrawerProvider({ children, criteriaHtml, interviewHtml }: ReadmeDrawerProviderProps) {
    const [activeDoc, setActiveDoc] = useState<ReadmeDoc | null>(null);

    const open = useCallback((doc: ReadmeDoc) => {
        setActiveDoc((prev) => (prev === doc ? null : doc));
    }, []);

    const close = useCallback(() => {
        setActiveDoc(null);
    }, []);

    const value = useMemo(
        () => ({ activeDoc, criteriaHtml, interviewHtml, open, close }),
        [activeDoc, criteriaHtml, interviewHtml, open, close],
    );

    return (
        <ReadmeDrawerContext.Provider value={value}>
            {children}
        </ReadmeDrawerContext.Provider>
    );
}

export function useReadmeDrawer() {
    const context = useContext(ReadmeDrawerContext);
    if (!context) {
        return {
            activeDoc: null as ReadmeDoc | null,
            criteriaHtml: "",
            interviewHtml: "",
            open: () => { },
            close: () => { },
        };
    }
    return context;
}
