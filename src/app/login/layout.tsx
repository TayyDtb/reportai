import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log In | ReportAI",
  description: "Sign in to ReportAI."
};

export default function LoginLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
