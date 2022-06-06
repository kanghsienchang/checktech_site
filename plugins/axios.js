import qs from 'qs'

export default function ({ $axios }) {
  $axios.interceptors.request.use(
    (config) => {
      config.paramsSerializer = (params) => {
        return qs.stringify(params, { encodeValuesOnly: true })
      }
      return config
    },
    function (error) {
      return Promise.reject(error)
    }
  )

  $axios.interceptors.response.use(
    (response) => response?.data,
    ({ response }) => {
      return Promise.reject(response)
    }
  )
}
