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
        'cyber-bg': '#050505',
        'cyber-surface': '#0A0A0B',
        'cyber-border': '#1A1A24',
        'neon-cyan': '#00F3FF',
        'neon-magenta': '#FF003C',
        'neon-purple': '#B026FF',
        'neon-green': '#00FF66',
        'cyber-muted': '#8892B0',
      },
      fontFamily: {
        sans: ['var(--font-space-grotesk)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      boxShadow: {
        'neon-cyan': '0 0 10px rgba(0, 243, 255, 0.3)',
        'neon-magenta': '0 0 10px rgba(255, 0, 60, 0.3)',
      },
      backgroundImage: {
        'cyber-grid': 'linear-gradient(rgba(0, 243, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 243, 255, 0.05) 1px, transparent 1px)',
      }
    },
  },
  plugins: [],
}
export default config