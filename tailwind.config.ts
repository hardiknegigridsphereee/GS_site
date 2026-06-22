import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#fcf8ec",
        honey: "#fdca89",
        amber: "#cbb27a",
        jade: "#2a7f5e",
        evergreen: "#132f20",
        pearl: "#F4EFE6",
        sage: "#EBE5D9",
        forest: "#1A3626",
        spotify: {
          black: "#191414",
          green: "#1DB954",
          greenHover: "#1ED760",
          card: "#000000",
          textMain: "#FFFFFF",
          textSec: "#B3B3B3",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      // Use real pixel values — CSS variables cannot be resolved at Tailwind build time
      fontSize: {
        xs:   ["12px", { lineHeight: "1.5" }],
        sm:   ["14px", { lineHeight: "1.5" }],
        base: ["16px", { lineHeight: "1.6" }],
        lg:   ["20px", { lineHeight: "1.5" }],
        xl:   ["24px", { lineHeight: "1.4" }],
        "2xl": ["32px", { lineHeight: "1.3" }],
        "3xl": ["40px", { lineHeight: "1.2" }],
        "4xl": ["40px", { lineHeight: "1.2" }],
        "5xl": ["54px", { lineHeight: "1.1" }],
        "6xl": ["64px", { lineHeight: "1.05" }],
      },
    },
  },
  plugins: [],
};
export default config;
