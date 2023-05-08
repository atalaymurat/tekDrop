/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        backgroundImage: {
        'forest': "url('https://picsum.photos/1198/1219.webp?')",
      }

    },
  },
  plugins: [],
}
