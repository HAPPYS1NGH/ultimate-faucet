import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        rabble: "#08F7AF",
        back: "#E7E7E7",
        morph: "#14A800",
        kakarot: "#003D29",
        base: "#0052FF",
        black: "#000000",
        cream: "#F7F5E3",
        arbitrum: "#12AAff",
        mode: "#d6ff00",
        monad: "#836EF9",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "var(--tg-theme-bg-color)",
        "secondary-background": "var(--tg-theme-secondary-bg-color)",
        //         var(--tg-theme-bg-color)
        // var(--tg-theme-text-color)
        // var(--tg-theme-hint-color)
        // var(--tg-theme-link-color)
        // var(--tg-theme-button-color)
        // var(--tg-theme-button-text-color)
        // 
        color: "var(--tg-theme-text-color)",
        "subtitle-color": "var(--tg-theme-subtitle-text-color)",
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
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        sans: ['var(--font-outfit)'],
        mono: ['var(--font-beVietnamPro)'],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config