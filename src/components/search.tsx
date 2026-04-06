"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function GlobalSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleChange = (value) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <input
      placeholder="Search..."
      onChange={(e) => handleChange(e.target.value)}
    />
  );
}