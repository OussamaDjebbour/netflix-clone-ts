import type { Config } from 'tailwindcss';
// const tailwindConfig: import("tailwindcss").Config = {...};
// export default tailwindConfig;

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        buttonColor: 'rgba(109, 109, 110, 0.7)',
      },
      screens: {
        small: '680px',
      },
      backgroundImage: {
        bgImage: "url('/src/assets/images/bgImage.jpg')",
      },
      height: {
        screen: '100dvh',
      },
      // keyframes: {
      //   spinner: {
      //     to: {
      //       transform: 'rotate(1turn)',
      //     },
      //   },
      // },
      // animation: {
      //   spinner: 'spinner 1.5s infinite linear',
      // },
    },
  },
  plugins: [],

  mode: 'jit',
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
} satisfies Config;
