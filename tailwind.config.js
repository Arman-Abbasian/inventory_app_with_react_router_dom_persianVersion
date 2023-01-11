/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary_cream:"#ECF39E",
        primary_dark_green:"#132A13",
        primary_light_green:"#4F772D",
      }
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    // require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('tailwind-scrollbar-hide')

  ],
}
