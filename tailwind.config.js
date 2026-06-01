const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        display: ['Poppins', ...defaultTheme.fontFamily.sans],
        mono: ['Fira Code', ...defaultTheme.fontFamily.mono],
      },
      colors: {
        surface: '#0F172A',
        surface2: '#1E293B',
        accent: '#38BDEF',
        teal: '#06B6D4',
        success: '#22C55E',
      },
    },
  },
  plugins: [],
};
