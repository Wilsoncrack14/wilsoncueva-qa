/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#080B0A',
        'bg-secondary': '#0E1311',
        surface: '#121916',
        // Primary Jade Green accent (replaces previous yellow-lime green)
        'accent-lime': '#2ED38C',
        'accent-lime-dim': '#10B981',
        'text-primary': '#F3F5F4',
        'text-secondary': '#94A19B',
        'border-subtle': '#1D2824',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'lime-glow': '0 4px 20px -6px rgba(46, 211, 140, 0.16)',
        'card-subtle': '0 8px 24px -12px rgba(0, 0, 0, 0.6)',
      },
    },
  },
  plugins: [],
};
