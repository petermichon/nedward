import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './index.ts', './app/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}

export { config }
