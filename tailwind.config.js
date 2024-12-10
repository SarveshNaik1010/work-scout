/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        ph: { max: '640px' }, // Custom breakpoint for screens <= 640px
      }
    },
  },
  plugins: [],
};
