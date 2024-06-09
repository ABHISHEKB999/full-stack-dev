// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        light: {
          text: '#333',
          background: '#fff',
        },
        dark: {
          text: '#fff',
          background: '#333',
        },
      },
    },
  },
  plugins: [],
};
