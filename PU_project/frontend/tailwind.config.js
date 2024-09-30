/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
        fontFamily: {
            'gymbro': ['Amatic SC', 'sans']
          },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
