import { unslugify } from "@/utils/wizard";

export default async function ItemPage({
  params,
}: {
  params: { item: string };
}) {
  const { item } = await params;
  const response = await fetch(`https://swapi.dev/api/people?search=${unslugify(item)}`);
 
  if (!response.ok) return null;

  const data = await response.json();
  const itemData = data.results[0]
  
 return (
    <div>
      <div>
        I am 
      </div>
        {itemData.name?itemData.name:itemData.title}
    </div>
 )
}
