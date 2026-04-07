import { EmptyState } from "@/components/EmptyState/EmptyState";
import { ErrorState } from "@/components/ErrorState/ErrorState";
import { SwapiListItem } from "@/lib/types";
import { slugify } from "@/utils/wizard";
import Link from "next/link";

export default async function StarshipsItemPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const search = (await searchParams).search
  const response = await fetch(`https://swapi.dev/api/starships${search ? `?search=${search}` : ""}`);

  if (!response.ok) {
    return (
      <ErrorState
        title="Unable to load starships"
        message="The API request failed. Please try again later."
      />
    );
  }

  const data = await response.json();
  const categoryData = data.results

  if (categoryData.length === 0) {
    return (
      <EmptyState
        title="No starships found"
        message="No results matched the current search."
      />
    );
  }

  return (
    <div>
      <div style={{ color: "blue", fontSize: "60px" }}>Starships</div>
      {categoryData.map((item: SwapiListItem) => (
        <div key={item.url}>
          <Link href={`/starships/${slugify(item.name ? item.name : item.title || "")}`}>
            {item.name ? item.name : item.title}
          </Link>
        </div>
      ))}
    </div>
  )
}
