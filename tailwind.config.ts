import type { Config } from 'tailwindcss';

export default {
  theme: {
    extend: {
      colors: {
        brand: {
          300: '#7dd3fc',
          500: '#38bdf8',
          600: '#0ea5e9',
        },
        ink: {
          900: '#111827',
          950: '#020617',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        panel: '0 24px 80px rgba(2, 6, 23, 0.45)',
      },
      borderRadius: {
        panel: '2rem',
      },
      screens: {
        xs: '480px',
      },
    },
  },
} satisfies Config;
