/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      //config tên màu
      colors: {
        red: "#F15D41",
        yellow: "#FFCB7C",
        "yellow-2": "#FFEDC4",
        blue: "#73DBD5",
        pink: "#F9A0A0",
        "pink-2": "#FFA5B8",
        grayInput: "#F1F1F1",
        grayBorder: "#DFDFDF"
      },
      //config phông chữ
      fontFamily: {
        interRegular: ["InterRegular"],
        interBold: ["InterBold"],
        interSemiBold: ["InterSemiBold"],
        interLight: ["InterLight"],
      },
      borderRadius: {
        10: "10px",
        20: "20px",
      },
    },
  },
  plugins: [],
}