import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    key: 'checktech',
    paths: ['cookieAgree']
  })(store)
}
