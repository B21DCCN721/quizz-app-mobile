/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Màu đỏ (kết hợp custom + tailwind)
        red: {
          50: "#FEEAE5",    // red-50 (custom)
          100: "#fee2e2",   // bg-red-100 (tailwind)
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",   // text-red-500 (tailwind)
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
          DEFAULT: "#F15D41", // red (custom)
          "2": "#FFCB8F",    // orange-2 (custom)
        },

        // Màu vàng (kết hợp custom + tailwind)
        yellow: {
          50: "#FFF9F0",    // custom
          100: "#fef9c3",   // bg-yellow-100 (tailwind)
          200: "#fef08a",
          300: "#fde047",
          400: "#facc15",
          500: "#eab308",   // text-yellow-500 (tailwind)
          600: "#ca8a04",
          700: "#a16207",
          800: "#854d0e",
          900: "#713f12",
          DEFAULT: "#FFCB7C", // yellow (custom)
          "2": "#FFEDC4",    // yellow-2 (custom)
          "3": "#FEF3AF",    // yellow-3 (custom)
        },

        // Màu xanh lá (tailwind)
        green: {
          50: "#f0fdf4",
          100: "#dcfce7",   // bg-green-100
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",   // text-green-500
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
        },

        // Màu xanh dương (tailwind)
        blue: {
          50: "#eff6ff",
          100: "#dbeafe",   // bg-blue-100
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",   // text-blue-500
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          DEFAULT: "#73DBD5", // blue (custom)
        },

        // Màu tím (tailwind)
        purple: {
          50: "#faf5ff",
          100: "#f3e8ff",   // bg-purple-100
          200: "#e9d5ff",
          300: "#d8b4fe",
          400: "#c084fc",
          500: "#a855f7",   // text-purple-500
          600: "#9333ea",
          700: "#7e22ce",
          800: "#6b21a8",
          900: "#581c87",
        },

        // Màu hồng (kết hợp custom + tailwind)
        pink: {
          50: "#fdf2f8",
          100: "#fce7f3",
          200: "#fbcfe8",
          300: "#f9a0A0",   // pink (custom base)
          400: "#f472b6",
          500: "#ec4899",
          DEFAULT: "#F9A0A0",
          "2": "#FFA5B8",   // pink-2 (custom)
        },

        // Màu xám (tailwind + custom)
        gray: {
          50: "#f9fafb",
          100: "#f3f4f6",   // bg-gray-100
          200: "#e5e7eb",   // bg-gray-200
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
        
        grayInput: "#F1F1F1",
        grayBorder: "#DFDFDF",
      },
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
};