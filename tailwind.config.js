/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // app klasöründeki tüm dosyalar için
    "./components/**/*.{js,ts,jsx,tsx}", // components klasöründeki tüm dosyalar için
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
