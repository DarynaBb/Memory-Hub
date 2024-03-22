/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      flexBasis: {
        "19/40": "47.5%",
        "1/20": "5%",
      },
      animation: {
        rotate: "rotate 10s linear infinite",
      },
    },
    keyframes: {
      rotate: {
        "0%": { transform: "rotate(0deg) scale(10)" },
        "100%": { transform: "rotate(-360deg) scale(10)" },
      },
    },
    opacity: {
      '1': '.1',
    }
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
