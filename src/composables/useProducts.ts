import { ref, onMounted, computed } from 'vue'
import { productsApi } from '@/api/products'
import type { Product, LoadingStatus } from '@/types'

export function useProducts() {
  const products = ref<Product[]>([])
  const loading = ref<LoadingStatus>('idle')
  const error = ref<string | null>(null)
  const searchQuery = ref<string>('')
  
  const fetchProducts = async () => {
    loading.value = 'loading'
    error.value = null
    
    try {
      products.value = await productsApi.getAll()
      loading.value = 'success'
    } catch (err) {
      loading.value = 'error'
      error.value = err instanceof Error ? err.message : 'Ошибка загрузки товаров'
      console.error('Error fetching products:', err)
    }
  }
  
  const getProductById = async (id: number): Promise<Product | null> => {
    // Сначала проверяем в уже загруженных товарах
    const found = products.value.find(product => product.id === id)
    if (found) return found
    
    // Если не нашли, загружаем конкретный товар
    try {
      return await productsApi.getById(id)
    } catch (err) {
      console.error(`Error fetching product ${id}:`, err)
      return null
    }
  }
  
  // Поиск товаров по названию
  const searchProducts = (query: string): Product[] => {
    if (!query) return products.value
    const lowerQuery = query.toLowerCase()
    return products.value.filter(product => 
      product.title.toLowerCase().includes(lowerQuery)
    )
  }
  
  // Вычисляемое свойство для отфильтрованных товаров
  const filteredProducts = computed(() => {
    if (!searchQuery.value) return products.value
    return searchProducts(searchQuery.value)
  })
  
  onMounted(() => {
    fetchProducts()
  })
  
  return {
    products,
    loading,
    error,
    searchQuery,
    filteredProducts,
    fetchProducts,
    getProductById,
    searchProducts
  }
}