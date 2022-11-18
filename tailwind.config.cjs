/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#DB073D",
        secondary: "#07DBA5",
        marooon: {
          50: "#FEE3EA",
          100: "#FCACC1",
          200: "#FB7597",
          300: "#F93E6E",
          400: "#F82359",
          500: "#AF0631",
          600: "#830425",
          700: "#580318",
          800: "#2C010C",
          900: "#000000",
        },
      },
    },
  },
  plugins: [],
};
