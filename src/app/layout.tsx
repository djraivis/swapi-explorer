import type { Metadata } from "next";
import "./globals.css";

// Sets the default page title and description for the app.
export const metadata: Metadata = {
  title: "SWAPI Explorer",
  description: "Browse, search, and sort Star Wars data from SWAPI.",
};

// Wraps every page with the root HTML structure and global styles.
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
