import { slugify } from "@/utils/wizard";
import Link from "next/link";

export default async function PeoplePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const search = (await searchParams).search
  const response = await fetch(`https://swapi.dev/api/people${search ? `?search=${search}` : ""}`);

  if (!response.ok) return <div>No data available</div>;

  const data = await response.json();
  const categoryData = data.results
  
 return (
    <div>
        {categoryData.map((item)=>(
            <div>
                <Link href={`people/${slugify(item.name?item.name:item.title)}`}>
                {item.name?item.name:item.title}
                </Link>
            </div>
        ))}
    </div>
 )
}
