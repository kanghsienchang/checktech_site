import Bowser from 'bowser'

export const state = () => ({
  platform: ''
})

export const mutations = {
  SET_PLATFORM (state, platform) {
    state.platform = platform
  }
}

export const getters = {
  platform: state => state.platform
}

export const actions = {
  async nuxtServerInit ({ commit, dispatch, state }, { req }) {},
  parsePlatform ({ commit }) {
    const bowser = Bowser.parse(window?.navigator?.userAgent)
    if (bowser) {
      commit('SET_PLATFORM', bowser?.platform?.type)
    }
  }
}
