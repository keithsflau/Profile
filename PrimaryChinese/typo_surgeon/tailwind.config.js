/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'chinese': ['Microsoft YaHei', 'PingFang TC', 'Heiti TC', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
