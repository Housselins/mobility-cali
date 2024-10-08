import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    colors: {
      principal: "#3366CC",
      principalTransparente: "rgba(51, 102, 204, 0.7)",
      white: "#ffffff",
      menuLateral: "#EEEEEE",
      yellow: "#D3DD45FF",
      red: "#7B0909FF",
    },
    borderRadius: {
      br20: "20px",
      lgin: "0 0 0 40px",
      full: "100%",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("daisyui")],
};
export default config;
