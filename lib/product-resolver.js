import { PRODUCTS } from './products-database.js'

export function getProduct(productId) {
  return PRODUCTS.find((product) => product.id === productId) || null
}

export function getProductDetails(productId) {
  const product = getProduct(productId)

  if (!product) {
    return {
      id: productId,
      name: productId,
      line: '',
      category: '',
      amount: '',
      application: '',
      exposure: '',
      removal: '',
    }
  }

  return product
}

export function getProductName(productId) {
  return getProductDetails(productId).name
}
