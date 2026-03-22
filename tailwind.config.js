/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    colors: {
      primary: '#637aff',
      primaryDark: '#2759ff',
      primaryLite: '#637aff99',

      black: '#112233',
      white: '#ffffff',

      accent: '#112233',

      green: '#19c5a8',
      green2: '#039a83',
      lightGreen: '#aaffaa',

      red: '#E66155',
      lightRed: '#ff4f7e',
      darkRed: '#d9365e',

      purple: '#8f06e4',

      blue: '#0984FF',
      skyBlue: 'skyblue',
      powderBlue: 'powderblue',
      steelBlue: 'steelblue',

      yellow: '#FEC10B',
      pink: '#ff4c98',
      gold: 'gold',

      gray: '#A0AEC0',
      darkGray: '#22313a',
      darkGray2: '#718096',

      light: '#fcfcfc',
      dark: '#333',

      line: '#282C35',
      darkHeaderColor: '#0e1616',
    },
    extend: {},
  },
  plugins: [],
};
