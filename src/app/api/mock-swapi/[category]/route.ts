import { NextRequest, NextResponse } from "next/server"

type MockSwapiItem = {
  url: string
  name?: string
  title?: string
  model?: string
  manufacturer?: string
  cost_in_credits?: string
  length?: string
  crew?: string
  passengers?: string
  cargo_capacity?: string
}

type MockCategoryResponse = {
  count: number
  results: MockSwapiItem[]
}

const mockCategoryResponses: Record<string, MockCategoryResponse> = {
  people: {
    count: 82,
    results: [
      {
        url: "https://swapi.dev/api/people/1/",
        name: "Luke Skywalker",
      },
      {
        url: "https://swapi.dev/api/people/11/",
        name: "Anakin Skywalker",
      },
      {
        url: "https://swapi.dev/api/people/2/",
        name: "C-3PO",
      },
    ],
  },
  vehicles: {
    count: 39,
    results: [
      {
        url: "https://swapi.dev/api/vehicles/4/",
        name: "Sand Crawler",
        model: "Digger Crawler",
        manufacturer: "Corellia Mining Corporation",
        cost_in_credits: "150000",
        length: "36.8",
        crew: "46",
        passengers: "30",
        cargo_capacity: "50000",
      },
    ],
  },
  starships: {
    count: 36,
    results: [
      {
        url: "https://swapi.dev/api/starships/9/",
        name: "Death Star",
        model: "DS-1 Orbital Battle Station",
        manufacturer: "Imperial Department of Military Research, Sienar Fleet Systems",
        cost_in_credits: "1000000000000",
        length: "120000",
        crew: "342953",
        passengers: "843342",
        cargo_capacity: "1000000000000",
      },
    ],
  },
}

function matchesSearch(item: MockSwapiItem, search: string) {
  const label = item.name ?? item.title ?? ""
  return label.toLowerCase().includes(search.toLowerCase())
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ category: string }> },
) {
  const { category } = await params
  const response = mockCategoryResponses[category]

  if (!response) {
    return NextResponse.json({ detail: "Category not found" }, { status: 404 })
  }

  const search = request.nextUrl.searchParams.get("search")?.trim()
  const results = search
    ? response.results.filter((item) => matchesSearch(item, search))
    : response.results

  return NextResponse.json({
    count: response.count,
    next: null,
    results,
  })
}
