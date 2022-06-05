export const getESG = (axios, params) => {
  return axios({
    method: 'get',
    url: '/esg',
    params
  })
}
