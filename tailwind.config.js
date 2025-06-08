/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Primary palette
        background: {
          DEFAULT: '#0f0f0f',
          alt: '#111111',
        },
        text: {
          primary: '#ffffff',
          secondary: '#cccccc',
          muted: '#aaaaaa',
          tertiary: '#888888',
        },
        // Accent colors
        border: {
          DEFAULT: '#2a2a2a',
          light: '#333333',
        },
        interactive: {
          DEFAULT: '#333333',
          hover: '#404040',
        },
        // Surface colors
        surface: {
          DEFAULT: '#1a1a1a',
          elevated: '#222222',
        },
        // Status colors (subtle for dark theme)
        success: '#22c55e',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#3b82f6',
      },
      fontFamily: {
        sans: ['Inter'],
        display: ['Bespoke Stencil'],
        body: ['Inter'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      spacing: {
        18: '4.5rem',
        88: '22rem',
        128: '32rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
    },
  },
  plugins: [],
};
