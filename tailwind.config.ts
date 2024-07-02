import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    screens: {
      xs: '320px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        background: '#1E1E1E',
        primary: '#122636',
        secondary: '#C0D2DC',
        tertiary: '#FFA374',
        button: '#628799',
        grayDark: '#3B5368',
        grayBlue: '#628799',
        blueDark: '#122636',
        blueLight: '#00ACAC',
        backgroundTransparent: '#9bc3d87b',
        text: '#FFFFFF',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('daisyui')],
} satisfies Config;

export default config;
