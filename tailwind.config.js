/** @type {import('tailwindcss').Config} */
// tailwind.config.js

module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#08C25E",
        secondary: "#FFF61A",
        grey: "#F9F9F9",
        blacky: "#4F3F44",
        myBlue:"007AFF",
      },
      // boxShadow: {
      //   'blue': '0 4px 6px -1px rgba(66, 153, 225, 0.5), 0 2px 4px -1px rgba(66, 153, 225, 0.06)',
      //   'l': '0 35px 10px -15px rgba(0, 0, 255, 0.3)',
      // }
    },
  },
  plugins: [],
};
