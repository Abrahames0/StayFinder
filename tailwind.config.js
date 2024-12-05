/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        manrope: ['Manrope-Regular', 'sans-serif'],
        'manrope-bold': ['Manrope-Bold', 'sans-serif'],
        'manrope-extrabold': ['Manrope-ExtraBold', 'sans-serif'],
      },
      colors: {
        customPurple: '#df96f9', // Nombre de tu color personalizado
      },
    },
  },
  plugins: [],
}

