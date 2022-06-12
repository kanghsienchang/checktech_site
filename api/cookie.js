export const getCookie = (axios, params) => {
  return axios({
    method: 'get',
    url: '/cookie',
    params
  })
}
