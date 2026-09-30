/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        pine: {
          50: "#eef6f1",
          100: "#d8ebe0",
          200: "#b3d6c3",
          300: "#7fb89a",
          400: "#529c74",
          500: "#2f7a54",
          600: "#246346",
          700: "#1e4f39",
          800: "#16382a",
          900: "#0f241c",
          950: "#081510",
        },
        wheat: {
          50: "#fbf7ee",
          100: "#f3ead3",
          200: "#e6d3a6",
          300: "#d4b56a",
          400: "#c4963d",
          500: "#b07d2a",
          600: "#966323",
        },
        clay: {
          400: "#d4784a",
          500: "#c45c26",
          600: "#a3481c",
        },
        ink: {
          500: "#4a4238",
          700: "#2c261f",
          900: "#16130f",
        },
      },
      fontFamily: {
        sans: ["Outfit", "system-ui", "sans-serif"],
        serif: ["Fraunces", "Georgia", "serif"],
      },
      boxShadow: {
        panel: "0 18px 50px -24px rgba(15, 36, 28, 0.45)",
        lift: "0 10px 30px -18px rgba(15, 36, 28, 0.35)",
      },
      backgroundImage: {
        "field-fade":
          "radial-gradient(1200px 500px at 10% -10%, rgba(82, 156, 116, 0.18), transparent 50%), radial-gradient(900px 400px at 100% 0%, rgba(196, 150, 61, 0.12), transparent 45%)",
      },
    },
  },
  plugins: [],
};
