import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BEACON: find your way around the ProductOps pipeline",
  description:
    "Wayfinder, tool catalogue, and guidance for DSTA's ProductOps pipeline.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-zone="enterprise"
      data-mode="light"
      className="h-full"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
