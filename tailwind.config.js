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
        light: '#fefefe',
        main: colors.gray[800],
        'main-d': colors.gray[900],
        'main-l': colors.gray[700],
        footer: '#3C4145'
      },
      borderColor: {
        DEFAULT: colors.gray[100]
      }
    },
    // boxShadow: {
    //   sm: '0 .25rem .75rem rgba(30,34,40,.02)',
    //   md: '0 0 1.25rem rgba(30,34,40,.04)',
    //   lg: '0 .25rem 1.75rem rgba(30,34,40,.07)'
    // },
    fontFamily: {
      sans: ["'Noto Sans TC'", ...defaultTheme.fontFamily.sans]
    }
  },
  plugins: [
  ]
}
