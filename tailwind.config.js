/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Arial', 'Helvetica', 'sans-serif'],
      },
      boxShadow: {
        executive: '0 24px 80px rgba(0, 70, 95, 0.16)',
        soft: '0 14px 45px rgba(15, 23, 42, 0.10)',
      },
    },
  },
  plugins: [],
};
