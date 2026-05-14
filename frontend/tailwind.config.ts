import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    extend: {
      colors: {
        espresso: '#2f1712',
        'espresso-light': '#5b3838',

        ivory: '#FAF6F1',
        'ivory-dark': '#F0E9E0',

        terracotta: '#de6f3d',
        'terracotta-dark': '#c85d2e',

        cream: '#FFF8F0',

        sage: '#8B9A7D',

        gold: '#D4A574',
        'gold-dark': '#b88b5e',
      },

      fontFamily: {
        display: ['var(--font-display)'],
        sans: ['var(--font-sans)'],
      },

      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.06)',
      },
    },
  },

  plugins: [],
}

export default config