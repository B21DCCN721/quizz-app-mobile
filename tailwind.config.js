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
        blue: "#73DBD5",
        pink: "#F9A0A0",
        "gray-input": "#F1F1F1",
        "gray-border": "#DFDFDF"
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
      },
    },
  },
  plugins: [],
}