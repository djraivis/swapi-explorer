import { slugify } from "@/utils/wizard";
import Link from "next/link";

export default async function Page({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { category } = await params;
  const search = (await searchParams).search
  const response = await fetch(`https://swapi.dev/api/${category}${search ? `?search=${search}` : ""}`);

  if (!response.ok) return <div>No data available</div>;

  const data = await response.json();
  const categoryData = data.results

  console.log("This is category", category);
  console.log(categoryData.length);
  console.log(search);
  
 return (
    <div>
        {categoryData.map((item)=>(
            <div>
                <Link href={`${category}/${slugify(item.name?item.name:item.title)}`}>
                {item.name?item.name:item.title}
                </Link>
            </div>
        ))}
    </div>
 )
}
