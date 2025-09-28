/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",

  ],
  theme: {
    extend: {
        fontFamily:{
            Outfit: ["Outfit", "sans-serif"],
            Ovo: ["Ovo", "serif"]
        },
        boxShadow:{
          'black' : '4px 4px 0 #000',
          'white' : '4px 4px 0 #fff'
        },
        gridTemplateColumns: {
          'auto': 'repeat(auto-fit, minmax(200px, 1fr))',
        },
         backgroundImage: {
        'footer-pattern': "url('/footer-bg-color.png')",
      },

    },
  },
  
   darkMode: "class",
  plugins: [],
};

export default config