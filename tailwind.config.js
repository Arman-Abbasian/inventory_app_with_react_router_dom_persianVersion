/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primaty_white:"#FFFFFF",
        primaty_blue:"#1D3557",
        primaty_red:"#E63946",
      }
    },
  },
  plugins: [],
}
