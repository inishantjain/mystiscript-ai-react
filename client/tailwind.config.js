/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        tan: "#DDAF94",
        blush: "#E8CEBF",
        conGreen: "#266150",
        brownie: "#4F4846",
        offWhite: "#FDF8F5",
        textBlack800: "#181A2A",
        textBlack600: "#3B3C4A", //secondary 600
        bgGray: "#f6f6f7", //secondary 50
        fade500: "#696A75", //secondary 500
        fade300: "#A1A1AA",
      },
      fontFamily: {
        rancho: ["rancho", "cursive"],
      },
      animation: {
        text: "text 5s ease infinite",
      },
      keyframes: {
        text: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
      },
    },
  },
  plugins: [],
};
