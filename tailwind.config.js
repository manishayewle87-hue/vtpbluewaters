/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          navy: '#0A1128',
          ocean: '#1F3B4D',
          royal: '#002366',
          white: '#FDFDFD',
          offwhite: '#F5F5F5',
          graphite: '#2C2C2C',
          charcoal: '#1A1A1A',
          gold: '#D4AF37',
          silver: '#C0C0C0',
          sky: '#87CEEB',
          crystal: '#A8D8EA',
          teal: '#008080'
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-sm': ['3rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'display-md': ['4rem', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'display-lg': ['5.5rem', { lineHeight: '0.9', letterSpacing: '-0.02em' }],
        'display-xl': ['7rem', { lineHeight: '0.85', letterSpacing: '-0.03em' }],
        'display-2xl': ['9rem', { lineHeight: '0.82', letterSpacing: '-0.03em' }],
      },
      letterSpacing: {
        'editorial': '0.06em',
        'luxury': '0.25em',
        'ultra': '0.35em',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
