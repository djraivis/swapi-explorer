import { CATEGORY_LABELS } from "@/lib/constants"
import type { SwapiCategory } from "@/lib/types"

export type DeveloperCodeReference = {
  filePath: string
  symbol: string
  note?: string
}

export type DeveloperCodeSection = {
  title: string
  description: string
  references: DeveloperCodeReference[]
}

export type DeveloperFetchEntry = {
  endpoint: string
  trigger: string
  responseStatus: string
  explanation: string
  codeReferences: DeveloperCodeReference[]
  durationMs?: number
  cacheStatus?: string
  pageIndex?: number
}

export type DeveloperStateSource = {
  label: string
  source: string
  details: string
}

export type DeveloperFallbackInfo = {
  state: "success" | "error" | "empty" | "static"
  reason: string
}

export type DeveloperSlugDebug = {
  slug: string
  matcher: string
  matchedLabel: string
  note: string
}

export type DeveloperTypePreview = {
  expectedType: string
  sampleShape: string
  presentFields: string[]
  missingFields: string[]
}

export type DeveloperPaginationSummary = {
  pagesTraversed: number
  totalFetchCalls: number
  uniqueEndpoints: number
}

export type DeveloperTimingSummary = {
  totalDurationMs: number
  averageDurationMs: number
  slowestDurationMs: number
  cacheHints: string[]
}

export type DeveloperInfoPayload = {
  title: string
  routeLabel: string
  pageKind: string
  summary: string
  flow: string[]
  fetches: DeveloperFetchEntry[]
  noFetchMessage?: string
  codeSections: DeveloperCodeSection[]
  codeReferences: DeveloperCodeReference[]
  renderBoundaries: string[]
  componentTree: string[]
  stateSources: DeveloperStateSource[]
  fallback: DeveloperFallbackInfo
  slugDebug?: DeveloperSlugDebug
  typePreview: DeveloperTypePreview
  paginationSummary: DeveloperPaginationSummary
  timingSummary: DeveloperTimingSummary
  changeHints: string[]
}

export type DeveloperFetchRecorder = (entry: DeveloperFetchEntry) => void

type FetchMeta = {
  trigger: string
  explanation: string
  codeReferences: DeveloperCodeReference[]
}

function getListPageFile(category: SwapiCategory) {
  return `src/app/(explorer)/${category}/page.tsx`
}

function getDetailPageFile(category: SwapiCategory) {
  return `src/app/(explorer)/${category}/[item]/page.tsx`
}

function getDetailPageStylesFile(category: SwapiCategory) {
  return `src/app/(explorer)/${category}/[item]/page.module.css`
}

function withQuery(pathname: string, search?: string, sort?: string) {
  const params = new URLSearchParams()

  if (search) {
    params.set("search", search)
  }

  if (sort) {
    params.set("sort", sort)
  }

  const queryString = params.toString()
  return queryString ? `${pathname}?${queryString}` : pathname
}

function formatDuration(value: number) {
  return Number.isFinite(value) ? `${value.toFixed(1)}ms` : "n/a"
}

function getTimingSummary(fetches: DeveloperFetchEntry[]): DeveloperTimingSummary {
  const durationValues = fetches.map((entry) => entry.durationMs ?? 0)
  const totalDurationMs = durationValues.reduce((acc, value) => acc + value, 0)
  const averageDurationMs = durationValues.length === 0 ? 0 : totalDurationMs / durationValues.length
  const slowestDurationMs = durationValues.length === 0 ? 0 : Math.max(...durationValues)
  const cacheHints = Array.from(new Set(fetches.map((entry) => entry.cacheStatus).filter(Boolean))) as string[]

  return {
    totalDurationMs,
    averageDurationMs,
    slowestDurationMs,
    cacheHints,
  }
}

function getPaginationSummary(fetches: DeveloperFetchEntry[]): DeveloperPaginationSummary {
  const paginatedFetches = fetches.filter((entry) => typeof entry.pageIndex === "number")
  const uniqueEndpoints = new Set(fetches.map((entry) => entry.endpoint)).size

  return {
    pagesTraversed: paginatedFetches.length,
    totalFetchCalls: fetches.length,
    uniqueEndpoints,
  }
}

function getListCodeSections(category: SwapiCategory, pageFunction: string): DeveloperCodeSection[] {
  const pageFile = getListPageFile(category)

  return [
    {
      title: "Main page/component file",
      description: "Core route and view files responsible for this list screen.",
      references: [
        { filePath: pageFile, symbol: pageFunction, note: "Server route entry point." },
        {
          filePath: "src/components/CategoryList/CategoryList.tsx",
          symbol: "CategoryList",
          note: "Primary category list renderer.",
        },
        {
          filePath: "src/components/CategoryList/CategoryList.module.css",
          symbol: "section/header/grid",
          note: "Page-level list styling.",
        },
      ],
    },
    {
      title: "Functions and hooks used",
      description: "Hooks and functions that drive URL-state updates and route refreshes.",
      references: [
        {
          filePath: "src/components/Search/Search.tsx",
          symbol: "GlobalSearch",
          note: "Uses useRouter/useSearchParams/usePathname.",
        },
        {
          filePath: "src/components/SortSelect/SortSelect.tsx",
          symbol: "SortSelect",
          note: "Updates URL sort query with router.replace().",
        },
        {
          filePath: "src/components/ExplorerControls/ExplorerControls.tsx",
          symbol: "ExplorerControls",
          note: "Combines control components.",
        },
      ],
    },
    {
      title: "Fetch logic for this view",
      description: "Shared SWAPI fetch helpers called by this route.",
      references: [
        { filePath: "src/lib/swapi.ts", symbol: "fetchCategoryItems", note: "Fetches paginated category data." },
        {
          filePath: "src/lib/swapi.ts",
          symbol: "fetchCategoryTotal",
          note: "Fetches total count for header metadata.",
        },
      ],
    },
    {
      title: "Key helpers and styling",
      description: "Helpers and CSS that shape ordering and presentation.",
      references: [
        { filePath: "src/lib/swapi.ts", symbol: "sortCategoryItems", note: "Sorts records by current category key." },
        { filePath: "src/components/Search/Search.module.css", symbol: "wrapper/input", note: "Search field styling." },
        {
          filePath: "src/components/SortSelect/SortSelect.module.css",
          symbol: "wrapper/select",
          note: "Sort control styling.",
        },
      ],
    },
  ]
}

function getDetailCodeSections(category: SwapiCategory, pageFunction: string): DeveloperCodeSection[] {
  const pageFile = getDetailPageFile(category)

  return [
    {
      title: "Main page/component file",
      description: "Core route and detail view files for the selected item.",
      references: [
        { filePath: pageFile, symbol: pageFunction, note: "Detail route entry point." },
        {
          filePath: getDetailPageStylesFile(category),
          symbol: "page/panel/title",
          note: "Detail layout and typography styles.",
        },
      ],
    },
    {
      title: "Functions and hooks used",
      description: "Functions that resolve slug routing and render detail-specific UI.",
      references: [
        {
          filePath: "src/components/DetailBackLink/DetailBackLink.tsx",
          symbol: "DetailBackLink",
          note: "Back navigation to parent category.",
        },
      ],
    },
    {
      title: "Fetch logic for this view",
      description: "Lookup flow from slug to resolved item data.",
      references: [
        { filePath: "src/lib/swapi.ts", symbol: "findCategoryItemBySlug", note: "Finds requested item by slug." },
        {
          filePath: "src/lib/swapi.ts",
          symbol: "fetchCategoryItems",
          note: "Loads category pages used for slug matching.",
        },
      ],
    },
    {
      title: "Key helpers and styling",
      description: "Slug helper and detail components used for final render.",
      references: [
        { filePath: "src/utils/wizard.ts", symbol: "slugify", note: "Generates route-safe slugs for matching." },
        {
          filePath: "src/components/DetailSummary/DetailSummary.tsx",
          symbol: "DetailSummary",
          note: "Field/value summary renderer.",
        },
        {
          filePath: "src/components/TransportDetails/TransportDetails.tsx",
          symbol: "TransportDetails",
          note: "Transport detail renderer for ships/vehicles.",
        },
      ],
    },
  ]
}

function getDefaultTypePreview(expectedType: string): DeveloperTypePreview {
  return {
    expectedType,
    sampleShape: "Runtime sample not captured for this render.",
    presentFields: [],
    missingFields: [],
  }
}

function getDefaultFallback(state: DeveloperFallbackInfo["state"], reason: string): DeveloperFallbackInfo {
  return { state, reason }
}

export function formatResponseStatus(status: number) {
  return `${status} ${status >= 200 && status < 300 ? "OK" : "Error"}`
}

export function createFetchRecorder(entries: DeveloperFetchEntry[]): DeveloperFetchRecorder {
  return (entry) => {
    entries.push(entry)
  }
}

export function getListItemsFetchMeta({
  category,
  pageFunction,
  search,
}: {
  category: SwapiCategory
  pageFunction: string
  search?: string
}): FetchMeta {
  return {
    trigger: `${pageFunction} -> fetchCategoryItems()`,
    explanation: search
      ? "The server list page re-runs after search query updates, then fetchCategoryItems() merges every matching SWAPI page."
      : "The server list page loads category data from SWAPI and walks pagination until the full result set is merged.",
    codeReferences: [
      { filePath: getListPageFile(category), symbol: pageFunction, note: "Server route entry point." },
      { filePath: "src/lib/swapi.ts", symbol: "fetchCategoryItems", note: "Shared paginated list fetch helper." },
      {
        filePath: "src/components/CategoryList/CategoryList.tsx",
        symbol: "CategoryList",
        note: "Consumes fetched list data.",
      },
    ],
  }
}

export function getListTotalFetchMeta({
  category,
  pageFunction,
}: {
  category: SwapiCategory
  pageFunction: string
}): FetchMeta {
  return {
    trigger: `${pageFunction} -> fetchCategoryTotal()`,
    explanation:
      "A second request reads category count so the header can compare filtered result size against total records.",
    codeReferences: [
      { filePath: getListPageFile(category), symbol: pageFunction, note: "Server route entry point." },
      { filePath: "src/lib/swapi.ts", symbol: "fetchCategoryTotal", note: "Total-count fetch helper." },
      {
        filePath: "src/components/CategoryList/CategoryList.tsx",
        symbol: "CategoryList",
        note: "Displays total count and visible count.",
      },
    ],
  }
}

export function getDetailFetchMeta({
  category,
  pageFunction,
}: {
  category: SwapiCategory
  pageFunction: string
}): FetchMeta {
  return {
    trigger: `${pageFunction} -> findCategoryItemBySlug() -> fetchCategoryItems()`,
    explanation:
      "Detail route fetches category pages through shared helper, then slugify() matching resolves the requested item before detail render.",
    codeReferences: [
      { filePath: getDetailPageFile(category), symbol: pageFunction, note: "Server route entry point." },
      { filePath: "src/lib/swapi.ts", symbol: "findCategoryItemBySlug", note: "Item lookup helper by slug." },
      { filePath: "src/lib/swapi.ts", symbol: "fetchCategoryItems", note: "Underlying SWAPI fetch loop." },
    ],
  }
}

export function getListPageDeveloperInfo({
  category,
  pageFunction,
  search,
  sort,
  fetches,
}: {
  category: SwapiCategory
  pageFunction: string
  search?: string
  sort?: string
  fetches: DeveloperFetchEntry[]
}): DeveloperInfoPayload {
  const label = CATEGORY_LABELS[category]
  const routeLabel = withQuery(`/${category}`, search, sort)
  const pageFile = getListPageFile(category)
  const paginationSummary = getPaginationSummary(fetches)
  const timingSummary = getTimingSummary(fetches)

  return {
    title: `${label} list requests`,
    routeLabel,
    pageKind: "Category list page",
    summary:
      "This route is a server component. Any category, search, or sort URL change re-renders the page server-side and re-executes shared SWAPI loading helpers.",
    flow: [
      `Navigation updates URL to ${routeLabel}.`,
      `${pageFunction} reads searchParams and runs fetchCategoryItems() and fetchCategoryTotal() in parallel.`,
      "sortCategoryItems() reorders the in-memory list before CategoryList renders visual rows.",
      "Client controls update URL params; URL changes cause server page re-render and data refresh.",
    ],
    fetches,
    codeSections: getListCodeSections(category, pageFunction),
    codeReferences: [
      { filePath: pageFile, symbol: pageFunction, note: "Route entry point for this category." },
      { filePath: "src/lib/swapi.ts", symbol: "fetchCategoryItems", note: "Fetches paginated category data." },
      { filePath: "src/lib/swapi.ts", symbol: "fetchCategoryTotal", note: "Fetches category total count." },
      { filePath: "src/lib/swapi.ts", symbol: "sortCategoryItems", note: "Sort helper prior to render." },
      { filePath: "src/components/Search/Search.tsx", symbol: "GlobalSearch", note: "URL search query updater." },
      { filePath: "src/components/SortSelect/SortSelect.tsx", symbol: "SortSelect", note: "URL sort query updater." },
    ],
    renderBoundaries: [
      `Server: ${pageFunction} in ${pageFile}`,
      "Server: CategoryList receives data and renders list UI.",
      "Client: GlobalSearch and SortSelect update URL state using Next navigation hooks.",
    ],
    componentTree: [
      `${pageFunction}`,
      "ExplorerPageShell",
      "CategoryList",
      "ExplorerControls",
      "GlobalSearch + SortSelect",
      "CategoryIllustration + list items",
    ],
    stateSources: [
      { label: "Category key", source: "URL pathname", details: "Determines route and active data set." },
      { label: "Search query", source: "URL query param search", details: "Used by fetchCategoryItems()." },
      { label: "Sort order", source: "URL query param sort", details: "Applied by sortCategoryItems()." },
      { label: "Visible records", source: "SWAPI response", details: "Rendered by CategoryList." },
      { label: "Recent category", source: "localStorage", details: "Used elsewhere for quick navigation context." },
    ],
    fallback: getDefaultFallback(
      fetches.length === 0 ? "error" : "success",
      fetches.length === 0
        ? "No successful fetch was recorded during this render path."
        : "Data fetch completed; list page rendered with loaded records.",
    ),
    typePreview: {
      expectedType: "SwapiListItem[]",
      sampleShape: "Array of SWAPI records with url and name/title fields.",
      presentFields: ["url", "name|title"],
      missingFields: [],
    },
    paginationSummary,
    timingSummary,
    changeHints: [
      "Watch query params to understand why server re-renders happen.",
      "Search and sort only mutate URL state; fetch logic remains on the server route.",
      `Total fetch calls this render: ${paginationSummary.totalFetchCalls}.`,
      `Total fetch duration: ${formatDuration(timingSummary.totalDurationMs)}.`,
    ],
  }
}

export function getDetailPageDeveloperInfo({
  category,
  itemSlug,
  pageFunction,
  fetches,
}: {
  category: SwapiCategory
  itemSlug: string
  pageFunction: string
  fetches: DeveloperFetchEntry[]
}): DeveloperInfoPayload {
  const label = CATEGORY_LABELS[category]
  const pageFile = getDetailPageFile(category)
  const paginationSummary = getPaginationSummary(fetches)
  const timingSummary = getTimingSummary(fetches)

  return {
    title: `${label} detail requests`,
    routeLabel: `/${category}/${itemSlug}`,
    pageKind: "Category detail page",
    summary:
      "Detail routes run on the server and resolve slug-specific data by loading category pages, then matching the selected slug before rendering detail components.",
    flow: [
      `Navigation resolves route /${category}/${itemSlug}.`,
      `${pageFunction} calls findCategoryItemBySlug(), which delegates to fetchCategoryItems().`,
      "slugify() comparison maps item labels to route slug and chooses the matching record.",
      "If no match exists, EmptyState fallback is returned.",
    ],
    fetches,
    codeSections: getDetailCodeSections(category, pageFunction),
    codeReferences: [
      { filePath: pageFile, symbol: pageFunction, note: "Detail route entry point." },
      { filePath: "src/lib/swapi.ts", symbol: "findCategoryItemBySlug", note: "Slug lookup helper." },
      { filePath: "src/lib/swapi.ts", symbol: "fetchCategoryItems", note: "Underlying paginated fetch loop." },
      { filePath: "src/utils/wizard.ts", symbol: "slugify", note: "Slug generation and matching helper." },
      {
        filePath: "src/components/DetailBackLink/DetailBackLink.tsx",
        symbol: "DetailBackLink",
        note: "Navigates back to list route.",
      },
    ],
    renderBoundaries: [
      `Server: ${pageFunction} in ${pageFile}`,
      "Server: findCategoryItemBySlug fetches and resolves item record.",
      "Client: DetailBackLink navigation interaction.",
    ],
    componentTree: [
      `${pageFunction}`,
      "ExplorerPageShell",
      "DetailBackLink",
      "DetailSummary or TransportDetails",
      "EmptyState/ErrorState (fallback branches)",
    ],
    stateSources: [
      { label: "Item slug", source: "URL pathname segment", details: "Used for record matching." },
      { label: "Category dataset", source: "SWAPI response", details: "Fetched before slug comparison." },
      { label: "Resolved item", source: "slugify comparison", details: "Matched record rendered in detail view." },
      {
        label: "Fallback state",
        source: "lookup outcome",
        details: "EmptyState shown when no matching record exists.",
      },
    ],
    fallback: getDefaultFallback(
      fetches.length === 0 ? "empty" : "success",
      fetches.length === 0
        ? "No fetch entries captured; route may have returned fallback before network completion."
        : "Detail lookup completed and rendered matching item or fallback UI.",
    ),
    slugDebug: {
      slug: itemSlug,
      matcher: "slugify(item.name ?? item.title) === itemSlug",
      matchedLabel: "Resolved at runtime inside findCategoryItemBySlug().",
      note: "Use this rule to trace why a profile route resolved or missed.",
    },
    typePreview: {
      expectedType: "PersonItem | PlanetItem | FilmItem | SpeciesItem | TransportItem",
      sampleShape: "Single SWAPI record selected from category list by slug.",
      presentFields: ["url", "name|title"],
      missingFields: [],
    },
    paginationSummary,
    timingSummary,
    changeHints: [
      "Slug changes drive full detail route re-resolution.",
      `Pages traversed while resolving this item: ${paginationSummary.pagesTraversed}.`,
      `Total fetch duration: ${formatDuration(timingSummary.totalDurationMs)}.`,
    ],
  }
}

export function getStaticPageDeveloperInfo({
  title,
  routeLabel,
  pageKind,
  summary,
  flow,
  noFetchMessage,
  codeSections,
  codeReferences,
}: {
  title: string
  routeLabel: string
  pageKind: string
  summary: string
  flow: string[]
  noFetchMessage: string
  codeSections: DeveloperCodeSection[]
  codeReferences: DeveloperCodeReference[]
}): DeveloperInfoPayload {
  return {
    title,
    routeLabel,
    pageKind,
    summary,
    flow,
    fetches: [],
    noFetchMessage,
    codeSections,
    codeReferences,
    renderBoundaries: [
      "Server: static route component render.",
      "Client: interactive child components hydrate after initial HTML.",
    ],
    componentTree: ["Static route component", "ExplorerPageShell", "Primary page component", "Developer panels"],
    stateSources: [
      { label: "Route", source: "Next.js app router", details: "Determines which static page component renders." },
      { label: "UI content", source: "Static JSX and constants", details: "No SWAPI fetch is executed." },
    ],
    fallback: getDefaultFallback("static", "Page renders static content and links without SWAPI network calls."),
    typePreview: getDefaultTypePreview("Static page model"),
    paginationSummary: {
      pagesTraversed: 0,
      totalFetchCalls: 0,
      uniqueEndpoints: 0,
    },
    timingSummary: {
      totalDurationMs: 0,
      averageDurationMs: 0,
      slowestDurationMs: 0,
      cacheHints: [],
    },
    changeHints: [
      "This route has no fetch delta; only navigation target changes.",
      "Use links on this page to move into data-driven category routes.",
    ],
  }
}
