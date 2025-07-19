import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import scrollbarHide from "tailwind-scrollbar-hide"; // Import the plugin

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
      screens: {
        tablet: "875px",
      },
      colors: {
        primary: {
          "50": "#EDFBEA",
          "100": "#DBF7D4",
          "200": "#B6EEAA",
          "300": "#92E67F",
          "400": "#6EDE54",
          "500": "#5EDA42",
          "600": "#3BAB21",
          "700": "#2C8019",
          "800": "#1D5511",
          "900": "#0F2B08",
          "950": "#071504",
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        error: {
          "50": "#FFE5E5",
          "100": "#FFCCCC",
          "200": "#FF9999",
          "300": "#FF6666",
          "400": "#FF3333",
          "500": "#FF0000",
          "600": "#CC0000",
          "700": "#990000",
          "800": "#660000",
          "900": "#330000",
          "950": "#1A0000",
        },
        black: {
          "50": "#F2F2F2",
          "100": "#E6E6E6",
          "200": "#CCCCCC",
          "300": "#B3B3B3",
          "400": "#999999",
          "500": "#222222",
          "600": "#666666",
          "700": "#4D4D4D",
          "800": "#333333",
          "900": "#1A1A1A",
          "950": "#0D0D0D",
        },
        extra: {
          blue: "#2E70FE",
          gray: "#F6F6F6",
          "gray-border": "#e6e6e6",
          "text-gray": "#b3b3b3",
          "box-gray": "#F9F9F9",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [tailwindcssAnimate, scrollbarHide],
};
export default config;
