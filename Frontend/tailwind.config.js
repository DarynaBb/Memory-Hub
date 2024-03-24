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
    },
    screens: {
      'mobile': '355px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px'
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
