/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        luckiest: ['"Luckiest Guy"', 'cursive'],
        bungee: ['"Bungee Tint"', 'sans-serif']
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
        'text-md': '2px 2px 4px rgba(0, 0, 0, 0.5)'
      },
      transform: ['preserve-3d'],
      perspective: ['1000'],
    },
  },
  plugins: [],
}