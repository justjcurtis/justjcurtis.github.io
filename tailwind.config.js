/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"
export default {
  content: [
    './index.html',
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: ["dark"]
  },
  plugins: [daisyui],
}
