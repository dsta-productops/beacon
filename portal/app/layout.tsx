import type { Metadata } from "next";
import Script from "next/script";
import { RESTORE_PROJECT } from "@/lib/project-storage";
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
      <Script id="restore-project" strategy="beforeInteractive">
        {RESTORE_PROJECT}
      </Script>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
