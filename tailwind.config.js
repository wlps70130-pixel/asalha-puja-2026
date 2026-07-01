/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        temple: {
          ivory: "#fffaf0",
          cream: "#f6efdf",
          emerald: "#174d43",
          emeraldSoft: "#2d6b5e",
          gold: "#c49a3a",
          goldSoft: "#ead7a2",
          ink: "#252118",
          muted: "#746b5b",
        },
      },
      boxShadow: {
        temple: "0 24px 70px rgba(41, 34, 20, 0.12)",
      },
    },
  },
  plugins: [],
};
