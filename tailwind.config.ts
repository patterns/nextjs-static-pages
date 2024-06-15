import type { Config } from 'tailwindcss';

// current color palette
// #F1EFC4
// #E9CC5F
// #9A6A1D
// #6B460E
// #492F09

//adds opacity to hexdecimal
function hexToRgba(hex:string, opacity:number) {
  hex = hex.replace(/^#/, '');
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  let alpha = (opacity > 1) ? opacity / 100 : opacity;

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}


const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'xs': '360px',
        '3xl':'1800px'
      },
      colors: {
        primary: {
          '1/2': hexToRgba("#E9CC5F",50), 
          '1': hexToRgba("#E9CC5F",100)
        },
        primaryMid: '#9A6A1D',
        primaryDark: '#492F09',
        primaryNeutral: '#F1EFC4'
      },
      fontFamily: {
        cabin: ['var(--font-cabin)'],
        julius: ['var(--font-julius)'],
        vietnam: ['var(--font-vietnam)'],
      },
      animation: {
        blob: "blob 7s linear infinite"
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "scale(1.9, 0.9)"
          },
          "50%": {
            transform: "scale(2.1, 1)"
          },
          "100%": {
            transform: "scale(1.9, 0.9)"
          }
        }
      }
    },
  },
  plugins: [],
};
export default config;
