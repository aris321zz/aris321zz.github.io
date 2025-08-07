/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html"],

  /** @type {import('rippleui').Config} */
	rippleui: {
		removeThemes: ["dark", "light", "whateverTheme"],
    defaultStyle: false,
	},
  theme: {
    container: {
      center: 'true',
      padding: '16px',
    },
    extend: {
      colors: {
        primary: '#364F6B',
        secondary: '#3FC1C9',
        tertiary: '#FC5185',
        white: '#F5F5F5',
        dark: '#31363F',
      },
      screens: {
        '2xl': '1320px'
      },
    },
  },
  // ... the rest of your config
	plugins: [require("rippleui")],

}