/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary_white:"#E1F5C4",
        primary_red:"#FF4E50 ",
        primary_yellow:"#EDE574",
      }
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    // require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio')
  ],
}
