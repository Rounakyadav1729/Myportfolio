/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0A",
        slateish: "#171717",
        charcoal: "#222222",
        accent: "#FFD600",
        mute: "#A3A3A3",
      },
      fontFamily: {
        sans: ["Space Grotesk", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,214,0,0.12), 0 20px 50px rgba(0,0,0,0.45)",
      },
    },
  },
  plugins: [],
};
