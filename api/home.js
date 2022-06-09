export const getHome = (axios, params) => {
  return axios({
    method: 'get',
    url: '/home',
    params
  })
}
