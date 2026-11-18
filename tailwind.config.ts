import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: '#1E9DB4',
          'teal-dark': '#177E91',
          'teal-light': '#E6F5F8',
          sage: '#46685A',
          'sage-dark': '#334D42',
          mint: '#96BEAA',
          'mint-light': '#B8D9C8',
          dark: '#1F2A26',
          bg: '#F5F9F7',
          white: '#FFFFFF',
        },
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        script: ['"Great Vibes"', 'cursive'],
      },
      boxShadow: {
        soft: '0 10px 30px -10px rgba(31, 42, 38, 0.07)',
        elevated: '0 20px 40px -15px rgba(31, 42, 38, 0.12)',
        glow: '0 10px 25px -5px rgba(30, 157, 180, 0.28)',
      },
    },
  },
  plugins: [],
};

export default config;
