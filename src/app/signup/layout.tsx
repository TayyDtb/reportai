import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | ReportAI",
  description: "Create your ReportAI account."
};

export default function SignUpLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
