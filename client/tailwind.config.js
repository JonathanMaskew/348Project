/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'reeses-yellow': '#FDEF14',
        'reeses-orange': '#FE5200',
        'reeses-brown': '#551E0A',
      },
    },
  },
  plugins: [],
};
