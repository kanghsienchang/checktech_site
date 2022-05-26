const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

delete colors.lightBlue
delete colors.warmGray
delete colors.trueGray
delete colors.coolGray
delete colors.blueGray

module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#C8DAF3',
          200: '#A7C4EC',
          300: '#85ADE5',
          400: '#6397DE',
          500: '#4280D7',
          600: '#2A6BC6',
          700: '#2359A4',
          800: '#1C4782',
          900: '#153561'
        }
      },
      borderColor: {
        DEFAULT: colors.slate[200]
      }
    },
    boxShadow: {
      sm: '0 .25rem .75rem rgba(30, 40, 40, 0.07)',
      DEFAULT: '0 0 1.25rem rgba(30, 34, 40, 0.1)',
      md: '0 .25rem 1.75rem rgba(30, 34, 40, 0.15)',
      none: 'none'
    },
    fontFamily: {
      sans: ["'Noto Sans TC'", ...defaultTheme.fontFamily.sans]
    }
    // screens: {
    //   sm: '576px',
    //   md: '768px',
    //   lg: '992px',
    //   xl: '1200px',
    //   '2xl': '1400px'
    // }
    // fontSize: {
    //   xs: ['0.75rem', { lineHeight: '1rem' }], // 12px
    //   sm: ['0.875rem', { lineHeight: '1.25rem' }], // 14px
    //   base: ['1rem', { lineHeight: '1.5rem' }], // 16px
    //   lg: ['1.125rem', { lineHeight: '1.75rem' }], // 18px
    //   xl: ['1.25rem', { lineHeight: '1.75rem' }], // 20px
    //   '2xl': ['1.5rem', { lineHeight: '2rem' }], // 24px
    //   '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
    //   '4xl': ['2.25rem', { lineHeight: '2.5rem' }], // 36px
    //   '5xl': ['3rem', { lineHeight: '1' }], // 48px
    //   '6xl': ['3.75rem', { lineHeight: '1' }], // 60px
    //   '7xl': ['4.5rem', { lineHeight: '1' }], // 72px
    //   '8xl': ['6rem', { lineHeight: '1' }], // 96px
    //   '9xl': ['8rem', { lineHeight: '1' }] // 120px
    // }
  },
  plugins: [
    require('@tailwindcss/forms'),
    function ({ addBase, theme }) {
      // function extractColorVars(colorObj, colorGroup = '') {
      //   return Object.keys(colorObj).reduce((vars, colorKey) => {
      //     const value = colorObj[colorKey]
      //
      //     const newVars =
      //       typeof value === 'string'
      //         ? { [`--color${colorGroup}-${colorKey}`]: value }
      //         : extractColorVars(value, `-${colorKey}`)
      //
      //     return { ...vars, ...newVars }
      //   }, {})
      // }

      addBase({
        ':root': {
          '--color-primary': theme('colors.primary')
        }
      })
    }
  ]
}
