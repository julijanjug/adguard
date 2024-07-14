/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'fog-gray': '#F4F5F6',
        'danger-red': '#FFC2C8',
        'charcoal': '#454555',
      },
    },
  },
  plugins: [],
}

