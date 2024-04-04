/** @type {import('tailwindcss').Config}*/
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {

    },
    fontFamily: {
      'atkinson': ['Atkinson Hyperlegible', 'sans-serif'],
    },
  },

  plugins: [require('@tailwindcss/typography')]
};

module.exports = config;