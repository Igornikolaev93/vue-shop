// src/api/products.ts
import { apiClient } from './index'
import type { Product } from '@/types'

// Интерфейс для ответа API
interface ProductsResponse {
  items: Product[]
}

export const productsApi = {
  // Получение всех товаров
  getAll: async (): Promise<Product[]> => {
    const response = await apiClient.get<ProductsResponse>('/products')
    return response.items || []
  },
  
  // Получение товара по ID
  getById: async (id: number): Promise<Product | null> => {
    try {
      const product = await apiClient.get<Product>(`/products/${id}`)
      return product
    } catch (error) {
      const products = await productsApi.getAll()
      const foundProduct = products.find(p => p.id === id)
      return foundProduct || null
    }
  },
  
  // Получение ограниченного количества товаров
  getLimited: async (limit: number): Promise<Product[]> => {
    const products = await productsApi.getAll()
    return products.slice(0, limit)
  },
  
  // Получение уникальных цветов из всех товаров
  getAllColors: async (): Promise<string[]> => {
    const products = await productsApi.getAll()
    const colors = new Set<string>()
    products.forEach(product => {
      product.colors.forEach((color: { id: number; title: string; code: string }) => {
        colors.add(color.title)
      })
    })
    return Array.from(colors)
  }
}