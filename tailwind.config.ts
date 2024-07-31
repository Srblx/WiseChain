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
      boxShadow: {
        'xs-light': '0px 0px 10px 1px rgba(255,255,255,0.1)',
        'sm-light': '0px 0px 10px 1px rgba(255,255,255,0.35)',
        'light': '0px 0px 10px 2px rgba(255,255,255,0.15)',
      },
      // swap text
       transitionTimingFunction: {
        slow: "cubic-bezier(.405, 0, .025, 1)",
        "minor-spring": "cubic-bezier(0.18,0.89,0.82,1.04)",
     },
      colors: {
        background: '#0E0B1B', //'#202127',
        primary: '#122636',
        secondary: '#C0D2DC',
        tertiary: '#00ACAC',
        button: '#628799',
        grayDark: '#17344B', //3B5368',
        grayBlue: '#628799',
        blueDark: '#122636',
        blueLight: '#00ACAC',
        backgroundTransparent: '#9bc3d87b',
        text: '#FFFFFF',
        foreground: "hsl(var(--foreground))",
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('daisyui')],
} satisfies Config;

export default config;
