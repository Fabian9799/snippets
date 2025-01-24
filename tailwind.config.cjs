/** @type {import('tailwindcss').Config}*/
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {

    },
    fontFamily: {
      'atkinson': ['Atkinson Hyperlegible', 'sans-serif'],
      'jetbrains': ['JetBrains Mono Variable', 'monospace'],
    },
  },

  plugins: [require('@tailwindcss/typography')]
};

module.exports = config;