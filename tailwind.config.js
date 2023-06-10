/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        noto: ["Noto Sans", "sans-serif"],
      },
      colors: {
        azure: "#3e8ef1",
        storm: "#a4c9d8",
        tangerine: "#ff4935",
        citric: "#cdf567",
        sunflower: "#ffbc4b",
        pink: " #ffd0d5",
        salmon: "#fb7ea8",
        yellow: "#ffe818",
        line: "#999",
      },
    },
  },
  plugins: [],
};
