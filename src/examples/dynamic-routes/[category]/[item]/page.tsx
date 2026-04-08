import { unslugify } from "@/utils/wizard";

// Renders the example dynamic item route for a category and slug.
export default async function Page({
  params,
}: {
  params: { item: string, category:string };
}) {
  const { item, category } = await params;
  const response = await fetch(`https://swapi.dev/api/${category}?search=${unslugify(item)}`);

  if (!response.ok) return null;

  const data = await response.json();
  const itemData = data.results[0]

  console.log("This is category", category);
  console.log("This is item", data);
  
  return (
    <div>
        {itemData.name?itemData.name:itemData.title}
    </div>
  )
}
