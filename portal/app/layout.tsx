import type { Metadata } from "next";
import { RESTORE_PROJECT } from "@/lib/project-storage";
import { RESTORE_THEME } from "@/lib/theme";
import "./globals.css";

export const metadata: Metadata = {
  title: "BEACON: find your way around product work at DSTA",
  description:
    "A guide to product work at DSTA: how research, design and measurement fit together, and which tool to use at each step.",
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
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: RESTORE_PROJECT }} />
        <script dangerouslySetInnerHTML={{ __html: RESTORE_THEME }} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
