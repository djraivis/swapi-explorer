import type { ReactNode } from "react";
import { Suspense } from "react";
import GlobalSearch from "@/components/search";
import { unslugify } from "@/utils/wizard";
import Link from "next/link";

export default async function Layout({
  children,
}: {
  children: ReactNode;
}) {
  const response = await fetch(`https://swapi.dev/api/`);

  if (!response.ok) return null;
  const data = await response.json();

  return (
    <>
      <div>
        {Object.keys(data).map((key) => (
          <Link key={key} href={`/${key}`}>
            {unslugify(key)}
          </Link>
        ))}
        <Suspense fallback={<div>Loading search...</div>}>
          <GlobalSearch />
        </Suspense>
      </div>
      {children}
    </>
  );
}
