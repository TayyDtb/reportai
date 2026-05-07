import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        headline: "#0F172A",
        accent: "#2563EB",
        surface: "#F8FAFC"
      },
      boxShadow: {
        card: "0 1px 2px rgb(15 23 42 / 0.04), 0 24px 48px -24px rgb(15 23 42 / 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
