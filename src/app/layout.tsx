import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SWAPI Explorer",
  description: "Browse, search, and sort Star Wars data from SWAPI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

