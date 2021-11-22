module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#3772FF",
        secondary: "#23262F",
        badge2: "#FF6838",
        badge1: "#58BD7D",
        gray: "#F4F5F6",
        links: "#777E91",
        heading: "#23262F",
        offwhite: "#FCFCFD",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        sans: ["DM Sans", "sans-seri"],
      },
      shadow: {
        card: "0px 64px 64px -48px rgba(15, 15, 15, 0.1)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
