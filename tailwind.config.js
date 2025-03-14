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
        "yellow-3": "#FEF3AF",
        blue: "#73DBD5",
        pink: "#F9A0A0",
        "pink-2": "#FFA5B8",
        grayInput: "#F1F1F1",
        grayBorder: "#DFDFDF",
        orange: "#E7784C",
        "orange-2": "#FFCB8F",
      },
      //config phông chữ
      fontFamily: {
        interRegular: ["InterRegular"],
        interBold: ["InterBold"],
        interSemiBold: ["InterSemiBold"],
        interLight: ["InterLight"],
        interMedium: ["InterMedium"],
      },
      borderRadius: {
        10: "10px",
        20: "20px",
        30: "30px",
        50: "50px",
      },
    },
  },
  plugins: [],
}