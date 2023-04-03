/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['inter', 'sans-serif'],
      },
      colors: {
        brand: {
          primary: '#6457a6',
          secondary: '#9dacff',
          accent: '#76E5FC',
          'accent-2': '#4bc0d9',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
