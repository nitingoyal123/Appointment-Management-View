import tailwindcss from "@tailwindcss/postcss";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  plugins: [tailwindcss()],
};
