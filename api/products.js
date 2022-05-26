export const getProducts = (axios, params) => {
  return axios({
    method: 'get',
    url: '/products',
    params
  })
}
