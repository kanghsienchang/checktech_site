export const submitInquiryForm = (axios, data) => {
  return axios({
    method: 'post',
    url: '/inquiry-forms',
    data
  })
}
