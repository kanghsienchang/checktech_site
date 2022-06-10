export const getApplication = (axios, params) => {
  return axios({
    method: 'get',
    url: '/application',
    params
  })
}
