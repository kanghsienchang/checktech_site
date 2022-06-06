export const getOptions = (axios, params) => {
  return axios({
    method: 'get',
    url: '/inquiry-form-options',
    params
  })
}
