import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Priority colors - adjusted for dark theme
        priority: {
          high: '#EF4444',
          medium: '#F59E0B',
          low: '#10B981',
          'back-of-mind': '#8B5CF6',
        },
        // MapleBot-inspired accent colors
        maple: {
          purple: '#8B5CF6',
          blue: '#3B82F6',
          dark: '#1E1B2E',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontSize: {
        // Accessible base sizes
        'base': ['18px', { lineHeight: '1.6' }],
        'lg': ['20px', { lineHeight: '1.6' }],
        'xl': ['22px', { lineHeight: '1.6' }],
        '2xl': ['24px', { lineHeight: '1.5' }],
        '3xl': ['28px', { lineHeight: '1.4' }],
      },
      spacing: {
        // Minimum touch target: 44px
        'touch': '44px',
      },
      minHeight: {
        'touch': '44px',
      },
      minWidth: {
        'touch': '44px',
      },
    },
  },
  plugins: [],
}

export default config

