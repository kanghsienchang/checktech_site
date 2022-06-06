const isDev = process.env.NODE_ENV === 'development'
const warningInDev = isDev ? 'warn' : 'error'

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: false,
        trailingComma: 'none'
      }
    ],
    'vue/multi-word-component-names': 'off',
    'vue/html-self-closing': 'off',
    'vue/no-unused-components': warningInDev,
    'no-unused-vars': warningInDev
  }
}
