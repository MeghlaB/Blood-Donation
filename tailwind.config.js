/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
       'hero-pattern':"url('./assets/Image/Banner/bloodbanner.jpg')"
      }
    },
  },
  plugins: [require('daisyui'),],
}



