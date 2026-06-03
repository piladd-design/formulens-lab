import { PRODUCTS } from './products-database.js'

export function getProduct(productId) {
  return PRODUCTS.find(product => product.id === productId) || null
}

export function getProductName(productId) {
  const product = getProduct(productId)

  return product?.name || productId
}

export function getProductDetails(productId) {
  const product = getProduct(productId)

  if (!product) {
    return {
      id: productId,
      name: productId,
    }
  }

  return product
}
