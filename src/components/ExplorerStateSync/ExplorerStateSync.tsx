"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { getCategoryFromPathname, getStoredCategoryState, setRecentCategory, setStoredCategoryState } from "@/lib/explorerStorage";
import type { SortOrder } from "@/lib/types";

function getSearchValue(searchValue: string | null) {
  return searchValue ? searchValue : undefined;
}

function getSortValue(sortValue: string | null) {
  return sortValue === "asc" || sortValue === "desc" ? (sortValue as SortOrder) : undefined;
}

export function ExplorerStateSync() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const restoredPathRef = useRef<string | null>(null);
  const previousPathRef = useRef<string | null>(null);

  useEffect(() => {
    if (previousPathRef.current !== pathname) {
      previousPathRef.current = pathname;
      restoredPathRef.current = null;
    }

    const category = getCategoryFromPathname(pathname);

    if (!category) {
      return;
    }

    setRecentCategory(category);

    const pathSegments = pathname.split("/").filter(Boolean);

    if (pathSegments.length !== 1) {
      return;
    }

    const search = getSearchValue(searchParams.get("search"));
    const sort = getSortValue(searchParams.get("sort"));
    const storedState = getStoredCategoryState()[category];
    const nextParams = new URLSearchParams(searchParams.toString());
    const shouldAttemptRestore =
      restoredPathRef.current !== pathname &&
      !search &&
      !sort &&
      (storedState?.search || storedState?.sort);

    if (shouldAttemptRestore) {
      if (storedState?.search) {
        nextParams.set("search", storedState.search);
      }

      if (storedState?.sort) {
        nextParams.set("sort", storedState.sort);
      }

      restoredPathRef.current = pathname;
      const queryString = nextParams.toString();
      router.replace(queryString ? `${pathname}?${queryString}` : pathname);
      return;
    }

    setStoredCategoryState(category, {
      search,
      sort,
    });
  }, [pathname, router, searchParams]);

  return null;
}
