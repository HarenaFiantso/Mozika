/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/app/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      boxShadow: {
        'custom-cyan': '0px 0px 10px 10px rgba(57,192,212,1)',
      },
    },
  },
  plugins: [],
};
