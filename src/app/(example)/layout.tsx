import GlobalSearch from "@/components/search";
import { unslugify } from "@/utils/wizard";
import Link from "next/link";

export default async function Layout({children}) {
const response = await fetch(`https://swapi.dev/api/`);

  if (!response.ok) return null;
    const data = await response.json();
    console.log(data)
    return (
  <> 
  <div>
    {
Object.keys(data).map((key) => (
<Link key={key} href={`/${key}`} >
{unslugify(key)}
</Link>
))
    }
    <GlobalSearch />
  </div>
  {children}
  </>
    )
}