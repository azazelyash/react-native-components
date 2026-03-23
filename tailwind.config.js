/** @type {import('tailwindcss').Config} */
module.exports = {
  // Define where Tailwind should look for classes
  content: ['./App.tsx', './src/**/*.{js,jsx,ts,tsx}'],
  
  // Link to NativeWind presets
  presets: [require('nativewind/preset')],
  
  theme: {
    // We use "extend" rather than placing colors right under "theme".
    // This preserves Tailwind's default color palette (e.g. slate-50, red-500)
    // while still letting you override specific colors like 'black' or 'blue'.
    extend: {
      colors: {
        // --- Core Brand Colors ---
        primary: '#637aff',
        primaryDark: '#2759ff',
        primaryLite: '#637aff99',

        // --- Grayscale / Neutrals ---
        black: '#112233',
        white: '#ffffff',
        gray: '#A0AEC0',
        darkGray: '#22313a',
        darkGray2: '#718096',
        light: '#fcfcfc',
        dark: '#333',
        accent: '#112233',

        // --- Semantic Colors ---
        green: '#19c5a8',
        green2: '#039a83',
        lightGreen: '#aaffaa',

        red: '#E66155',
        lightRed: '#ff4f7e',
        darkRed: '#d9365e',

        yellow: '#FEC10B',
        pink: '#ff4c98',
        gold: 'gold',
        purple: '#8f06e4',

        blue: '#0984FF',
        skyBlue: 'skyblue',
        powderBlue: 'powderblue',
        steelBlue: 'steelblue',

        // --- Layout / UI Specific ---
        line: '#282C35',
        darkHeaderColor: '#0e1616',
      },

      // --- Custom Typography (Fonts) ---
      // Map your custom fonts from src/assets/fonts here
      fontFamily: {
        // Examples:
        // regular: ['Inter-Regular'],
        // medium: ['Inter-Medium'],
        // bold: ['Inter-Bold'],
      },
    },
  },
  plugins: [],
};
