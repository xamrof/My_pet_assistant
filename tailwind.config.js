/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // ¡Esta "tsx" es vital!
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}