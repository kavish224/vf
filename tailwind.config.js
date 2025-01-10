/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      "black": "#0C0C0C",
      "white": "#E8EAED",
      "x": "#ED1148",
      "darkGray": "#333333",
      "mutedGray": "#A0A0A0",
      "softBlue": "#7A9BA6",
      "lightGray": "#F5F5F5"
    }
  },
  plugins: [],
}