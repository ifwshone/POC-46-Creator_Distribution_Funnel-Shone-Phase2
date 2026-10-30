import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'obsidian': '#030712',
        'navy-grey': '#0B1117',
        'electric-cyan': '#38BDF8',
        'indigo-accent': '#818CF8',
        'slate-border': '#1F2937',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      letterSpacing: {
        tight: '-0.015em',
      }
    },
  },
  plugins: [],
}
export default config