export const getProducts = (axios, params) => {
  return axios({
    method: 'get',
    url: '/products',
    params
  })
}

export const getProductCategories = (axios, params) => {
  return axios({
    method: 'get',
    url: '/product-categories',
    params
  })
}

export const getProductTypes = (axios, params) => {
  return axios({
    method: 'get',
    url: '/product-types',
    params
  })
}

export const getProductDetail = (axios, key, params) => {
  return axios({
    method: 'get',
    url: `/products/${key}`,
    params
  })
}
