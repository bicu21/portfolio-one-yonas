import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        cyan: {
          glow: "#00e5ff",
          light: "#22d3ee",
          mist: "#67e8f9",
        },
        ocean: {
          deep: "#164e63",
          void: "#0f172a",
          abyss: "#020617",
        },
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-12px) rotate(1deg)" },
          "66%": { transform: "translateY(-6px) rotate(-0.5deg)" },
        },
        "glow-pulse": {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(0,229,255,0.3), 0 0 60px rgba(0,229,255,0.1)",
          },
          "50%": {
            boxShadow: "0 0 40px rgba(0,229,255,0.6), 0 0 100px rgba(0,229,255,0.2)",
          },
        },
        "text-glow": {
          "0%, 100%": { textShadow: "0 0 20px rgba(0,229,255,0.5)" },
          "50%": { textShadow: "0 0 40px rgba(0,229,255,1), 0 0 80px rgba(0,229,255,0.5)" },
        },
        "fog-drift": {
          "0%": { transform: "translateX(-10%) scale(1.1)", opacity: "0.4" },
          "50%": { transform: "translateX(5%) scale(1.15)", opacity: "0.6" },
          "100%": { transform: "translateX(-10%) scale(1.1)", opacity: "0.4" },
        },
        "particle-rise": {
          "0%": { transform: "translateY(100vh) scale(0)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "0.5" },
          "100%": { transform: "translateY(-20vh) scale(1)", opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 8s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 2s infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "text-glow": "text-glow 3s ease-in-out infinite",
        "fog-drift": "fog-drift 20s ease-in-out infinite",
        "particle-rise": "particle-rise 8s linear infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      backgroundImage: {
        "cyan-radial": "radial-gradient(ellipse at center, rgba(0,229,255,0.15) 0%, transparent 70%)",
        "void-gradient": "linear-gradient(to bottom, #020617, #0f172a, #020617)",
        "glass-card": "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
