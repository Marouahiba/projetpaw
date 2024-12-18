/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",
        secondary: "#9333EA",
        tertiary: "#22D3EE",
        danger: "#EF4444",
      },
    },
  },
  plugins: [],
}

