/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "movie-cover": "url('@/components/icons/image 2.jpg')",
        "movie-cover-2": "url('@/components/icons/image 1.jpg')",
      },
    },
  },
  plugins: [],
};
