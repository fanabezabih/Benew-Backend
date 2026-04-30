import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        espresso: '#5b3838',
        'espresso-light': '#ffffff',
        ivory: '#FAF6F1',
        'ivory-dark': '#F0E9E0',
        terracotta: '#C45D3E',
        'terracotta-dark': '#A84832',
        cream: '#FFF8F0',
        sage: '#8B9A7D',
        gold: '#D4A574',
        'gold-dark': '#FAF6F1',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        sans: ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config