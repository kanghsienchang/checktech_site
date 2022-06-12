import defaultTheme from 'tailwindcss/defaultTheme'
const breakpoints = Object.keys(defaultTheme.screens).reduce(
  (acc, key) => ({ ...acc, [key]: parseInt(defaultTheme.screens[key], 10) }),
  {}
)

export const state = () => ({
  windowWidth: 1280,
  windowHeight: 0,
  cookieAgree: false
})

export const getters = {
  sm: (state) => state.windowWidth >= breakpoints.sm,
  md: (state) => state.windowWidth >= breakpoints.md,
  lg: (state) => state.windowWidth >= breakpoints.lg,
  xl: (state) => state.windowWidth >= breakpoints.xl,
  '2xl': (state) => state.windowWidth >= breakpoints['2xl'],
  breakpoints: () => breakpoints
}

export const mutations = {
  setWindowWidth(state, width) {
    state.windowWidth = width
  },
  setWindowHeight(state, height) {
    state.windowHeight = height
  },
  setCookieAgree(state, bool) {
    state.cookieAgree = bool
  }
}
