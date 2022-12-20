/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary_white:"#ededed",
        primary_black:"#111",
        primary_green:"#004749",
        primary_red:"#540000"
      }
    },
  },
  plugins: [],
}
