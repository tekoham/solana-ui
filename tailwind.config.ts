module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "575px",

      md: "735px",

      lg: "900px",

      xl: "1200px",

      xxl: "1400px",

      "3xl": "1600px",
    },
    extend: {
      fontFamily: {
        GeomGraphic: '"GeomGraphic", sans-serif !important',
      },
      colors: {
        transparent: "transparent",
      },
    },
  },
  plugins: [
    function ({ addUtilities }: { addUtilities: any }) {
      const newUtilities = {
        ".flex-center": {
          "@apply flex items-center": {},
        },
        ".flex-center-between": {
          "@apply flex items-center justify-between": {},
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
