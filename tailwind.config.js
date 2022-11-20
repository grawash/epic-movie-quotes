/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "movie-cover": "url('@/components/icons/image 2.jpg')",
        "movie-cover-2": "url('@/components/icons/image 1.jpg')",
        "defaultTheme": "linear-gradient(187.16deg, #181623 0.07%, #191725 51.65%, #0D0B14 98.75%);",
      },
    },
  },
  plugins: [],
};
