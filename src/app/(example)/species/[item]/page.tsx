import { EmptyState } from "@/components/EmptyState/EmptyState";
import { ErrorState } from "@/components/ErrorState/ErrorState";
import { unslugify } from "@/utils/wizard";

export default async function ItemPage({
  params,
}: {
  params: { item: string };
}) {
  const { item } = await params;
  const response = await fetch(`https://swapi.dev/api/species?search=${unslugify(item)}`);
 
  if (!response.ok) {
    return (
      <ErrorState
        title="Unable to load species"
        message="The API request failed. Please try again later."
      />
    );
  }

  const data = await response.json();
  const itemData = data.results[0]

  if (!itemData) {
    return (
      <EmptyState
        title="Species not found"
        message="No item matched this slug."
      />
    );
  }
  
 return (
    <div>
      <div>
        This is a species
      </div>
        {itemData.name?itemData.name:itemData.title}
    </div>
 )
}
