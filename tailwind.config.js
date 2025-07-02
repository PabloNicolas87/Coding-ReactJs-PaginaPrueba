// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Esto es clave para que Tailwind escanee tus componentes
  ],
  darkMode: "class", // Activamos el modo oscuro controlado por clase
  theme: {
    extend: {},
  },
  plugins: [],
};
