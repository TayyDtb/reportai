import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Generate Report | ReportAI",
  description: "Generate an inspection report with ReportAI."
};

export default function GenerateLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
