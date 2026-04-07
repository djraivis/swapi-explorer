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

  if (!response.ok) return <div>No data available</div>;

  const data = await response.json();
  const categoryData = data.results

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
