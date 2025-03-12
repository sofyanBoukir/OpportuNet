import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // content: [
  //   "./src/app/**/*.{js,jsx,ts,tsx}",
  //   "./src/pages/**/*.{js,jsx,ts,tsx}",
  //   "./src/layouts/**/*.{js,jsx,ts,tsx}",
  //   "./src/componeents/**/*.{js,jsx,ts,tsx}",
  //   "./index.html",
  // ],
  darkMode: "class",
  theme: {
    extend: {},
  },
});
