export const getSocials = (axios, params) => {
  return axios({
    method: 'get',
    url: '/socials',
    params
  })
}
