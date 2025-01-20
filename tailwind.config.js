/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
       'hero-pattern':"url('./src/assets/Image/Banner/blood banner.jpg')"
      }
    },
  },
  plugins: [require('daisyui'),],
}



