import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#F8F3F9",
          ink: "#17242D",
          line: "#E8E1EE",
          pink: "#A52DAD",
          blue: "#4648B4",
        },
      },
      boxShadow: {
        soft: "0 10px 30px rgba(23, 36, 45, 0.10)",
      },
    },
  },
  plugins: [],
} satisfies Config;
