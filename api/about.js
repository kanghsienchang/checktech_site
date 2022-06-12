export const getAbout = (axios, params) => {
  return axios({
    method: 'get',
    url: '/about',
    params
  })
}
