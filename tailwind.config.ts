import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--primary)',
          container: 'var(--primary-container)',
          fixed: 'var(--primary-fixed)',
        },
        'on-primary': {
          DEFAULT: 'var(--on-primary)',
          container: 'var(--on-primary-container)',
          'fixed-variant': 'var(--on-primary-fixed-variant)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          container: 'var(--secondary-container)',
          fixed: 'var(--secondary-fixed)',
        },
        'on-secondary': {
          DEFAULT: 'var(--on-secondary)',
          container: 'var(--on-secondary-container)',
        },
        tertiary: {
          DEFAULT: 'var(--tertiary)',
          container: 'var(--tertiary-container)',
        },
        background: 'var(--background)',
        surface: {
          DEFAULT: 'var(--surface)',
          container: 'var(--surface-container)',
          'container-low': 'var(--surface-container-low)',
          variant: 'var(--surface-variant)',
        },
        'on-surface': {
          DEFAULT: 'var(--on-surface)',
          variant: 'var(--on-surface-variant)',
        },
        error: 'var(--error)',
        outline: {
          DEFAULT: 'var(--outline)',
          variant: 'var(--outline-variant)',
        },
      },
      fontFamily: {
        headline: ['var(--font-poppins)', 'Poppins', 'sans-serif'],
        body: ['var(--font-roboto)', 'Roboto', 'sans-serif'],
        label: ['var(--font-inter)', 'Inter', 'sans-serif']
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'success-pulse': {
          '0%, 100%': {
            transform: 'scale(1)',
            boxShadow: '0 0 0 0 rgba(122, 193, 66, 0.4)',
          },
          '50%': {
            transform: 'scale(1.05)',
            boxShadow: '0 0 0 20px rgba(122, 193, 66, 0)',
          },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
        'spin-slow': 'spin-slow 8s linear infinite',
        'success-pulse': 'success-pulse 2s ease-in-out infinite',
        'fade-up': 'fade-up 0.5s ease-out forwards',
      },
      boxShadow: {
        'blue-glow': '0 8px 25px rgba(29, 161, 242, 0.4)',
        'green-glow': '0 8px 25px rgba(122, 193, 66, 0.4)',
        'card': '0 4px 24px rgba(29, 38, 49, 0.06)',
        'card-hover': '0 24px 48px rgba(29, 161, 242, 0.15), 0 8px 16px rgba(0,0,0,0.06)',
      },
      backdropBlur: {
        xs: '4px',
      },
    },
  },
  plugins: [],
}

export default config

