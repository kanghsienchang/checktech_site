export const getPrivacy = (axios, params) => {
  return axios({
    method: 'get',
    url: '/privacy',
    params
  })
}
