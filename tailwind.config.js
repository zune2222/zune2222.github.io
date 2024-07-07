/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      typography: {
        DEFAULT: {
          css: {
            "code::before": false,
            "code::after": false,
            code: {
              "border-radius": "8px",
              "background-color": "rgb(207 250 254)",
              "padding": "5px",
              "color": "rgb(29 78 216)",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography"),require('@tailwindcss/aspect-ratio')],
};
