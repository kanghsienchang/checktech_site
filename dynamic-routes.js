import axios from 'axios'
import qs from 'qs'
import { getProducts } from './api/products'
const axiosInstance = axios.create({
  baseURL: process.env.NUXT_API_BASE_URL
})

axiosInstance.interceptors.request.use(
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

axiosInstance.interceptors.response.use(
  (response) => response?.data,
  ({ response }) => {
    return Promise.reject(response)
  }
)

const localePrefixes = ['tw', 'en']

export default async () => {
  const { data: products } = await getProducts(axiosInstance, {
    pagination: {
      limit: -1
    },
    populate: {
      applications: '*',
      description: '*',
      dimensions: '*',
      features: '*',
      images: '*',
      name: '*',
      specifications: '*',
      catalogue_file: '*',
      alt_properties_description: '*',
      related_products: {
        populate: ['name', 'images']
      }
    }
  })

  const routesToGenerate = []

  for (const prefix of localePrefixes) {
    for (const product of products) {
      routesToGenerate.push({
        route: `/${prefix}/products/${product.attributes.key}`,
        payload: {
          product
        }
      })
    }
  }

  return routesToGenerate
}
