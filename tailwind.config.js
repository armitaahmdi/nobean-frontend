/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"IranSansX"', '"IranSansXFarsiDigits"', 'ui-sans-serif', 'system-ui'],  // جایگزین فونت پیش‌فرض
      },
      colors: {
        lightBlue: '#4286F5',
        darkBlue: '#285295',
        secondaryBlue: "#629BF7",
        lightYellow: "#FCBC05",
        darkYellow: "#9A7303",
      },
    },
  },
  plugins: [],
}