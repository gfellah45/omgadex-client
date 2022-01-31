module.exports = {
  mode: "jit",
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  media: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#3772FF",
        secondary: "#23262F",
        badge2: "#FF6838",
        badge1: "#58BD7D",
        omgray: "#F4F5F6",
        omgray2: "#E5E5E5",
        links: "#777E91",
        heading: "#23262F",
        offwhite: "#FCFCFD",
        omgray3: "#808191",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        sans: ["DM Sans", "sans-seri"],
      },
      shadow: {
        card: "0px 64px 64px -48px rgba(15, 15, 15, 0.1)",
      },
      backgroundImage: {
        pattern: "url('/assets/toppng.svg')",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
