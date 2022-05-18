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
        primary: '#488bd4',
        'primary-l': '#D1E2F4',
        'primary-d': '#2C71BD',
        light: '#F9FBFD',
        main: colors.gray[800],
        'main-d': colors.gray[900],
        'main-l': colors.gray[700],
        footer: '#3C4145'
      },
      borderColor: {
        DEFAULT: colors.gray[200]
      }
    },
    boxShadow: {
      sm: '0 .25rem .75rem rgba(30, 40, 40, 0.07)',
      DEFAULT: '0 0 1.25rem rgba(30, 34, 40, 0.1)',
      md: '0 .25rem 1.75rem rgba(30, 34, 40, 0.15)'
    },
    fontFamily: {
      sans: ["'Noto Sans TC'", ...defaultTheme.fontFamily.sans]
    },
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      '2xl': '1400px'
    }
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
