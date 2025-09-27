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
        colors:{
            lightHover: '#fcf4ff',
            darkHover: '#2a004a',
            darkTheme: '#11001F',
        },
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
  plugins: [],
};

export default config