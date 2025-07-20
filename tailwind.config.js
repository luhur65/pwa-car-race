/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        success: {
          500: '#10b981',
          600: '#059669',
        },
        danger: {
          500: '#ef4444',
          600: '#dc2626',
        },
        warning: {
          500: '#f59e0b',
          600: '#d97706',
        }
      },
      animation: {
        'race': 'race 3s ease-in-out forwards',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        race: {
          '0%': { width: '0%' },
          '100%': { width: '100%' }
        }
      }
    },
  },
  plugins: [],
}