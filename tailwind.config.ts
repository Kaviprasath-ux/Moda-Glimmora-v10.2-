import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Palette — Luxury Calm
        ivory: {
          cream: "#FAF8F5",
          warm: "#F5F1EA",
        },
        parchment: "#EDE8DF",
        sand: {
          light: "#E5DFD3",
          DEFAULT: "#D4CBBF",
        },
        taupe: "#B8AEA0",
        greige: "#9A8F82",
        stone: "#7A7068",
        charcoal: {
          warm: "#4A453D",
          deep: "#2D2A26",
        },
        noir: "#1A1816",

        // Accent Palette — Intelligence Signal
        gold: {
          soft: "#C9A962",
          muted: "#B89B4A",
          deep: "#9A7F35",
        },
        champagne: "#E8DCC4",
        bronze: {
          whisper: "#A8927A",
        },
        sapphire: {
          mist: "#4A5568",
          subtle: "#5C6B7A",
          deep: "#2C3E50",
        },
        azure: {
          whisper: "#E8ECF0",
        },

        // Semantic — Restrained
        success: {
          soft: "#6B8068",
          DEFAULT: "#4A6347",
        },
        warning: {
          soft: "#C4A35A",
          DEFAULT: "#A68B3D",
        },
        error: {
          soft: "#A67272",
          DEFAULT: "#8B5252",
        },
        info: {
          soft: "#6B7A8A",
          DEFAULT: "#4A5A6A",
        },

        // Surface — Layering
        surface: {
          base: "#FAF8F5",
          elevated: "#FFFFFF",
          sunken: "#F0EBE3",
        },

        // shadcn/ui compatible
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        display: ["Cormorant Garamond", "Georgia", "serif"],
        body: ["Outfit", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        // Display sizes
        "display-xl": ["4rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-lg": ["3rem", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        "display-md": ["2.25rem", { lineHeight: "1.2" }],
        "display-sm": ["1.875rem", { lineHeight: "1.25" }],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        "moda-sm": "0 1px 2px rgba(26, 24, 22, 0.04)",
        "moda-md": "0 4px 12px rgba(26, 24, 22, 0.06)",
        "moda-lg": "0 12px 32px rgba(26, 24, 22, 0.08)",
        "moda-xl": "0 24px 64px rgba(26, 24, 22, 0.12)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
        "slide-down": "slideDown 0.4s ease-out",
        "intelligence-pulse": "intelligencePulse 2s infinite",
        "gentle-float": "gentleFloat 3s ease-in-out infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        intelligencePulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        gentleFloat: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
