<template>
  <div v-if="loading === 'loading'" class="loading">
    <div class="spinner"></div>
    <p>Загрузка товара...</p>
  </div>
  
  <div v-else-if="product" class="product-detail">
    <div class="product-gallery">
      <img :src="getImageUrl(product)" :alt="product.title" class="main-image">
    </div>
    
    <div class="product-info">
      <h1>{{ product.title }}</h1>
      
      <div class="product-meta">
        <span class="slug">Артикул: {{ product.slug }}</span>
      </div>
      
      <!-- Цвета товара -->
      <div class="product-colors" v-if="product.colors && product.colors.length > 0">
        <h3>Цвета:</h3>
        <div class="colors-list">
          <div 
            v-for="color in product.colors" 
            :key="color.id"
            class="color-item"
          >
            <div 
              class="color-circle" 
              :style="{ backgroundColor: color.code }"
              :title="color.title"
            ></div>
            <span class="color-name">{{ color.title }}</span>
          </div>
        </div>
      </div>
      
      <div class="price">{{ formatPrice(product.price) }}</div>
      
      <div class="actions">
        <div class="quantity" v-if="isInCart(product.id)">
          <button @click="updateQuantity(product.id, getItemQuantity(product.id) - 1)">-</button>
          <span>{{ getItemQuantity(product.id) }}</span>
          <button @click="updateQuantity(product.id, getItemQuantity(product.id) + 1)">+</button>
        </div>
        
        <button 
          class="add-to-cart-btn"
          @click="handleAddToCart"
        >
          {{ isInCart(product.id) ? 'В корзине' : 'В корзину' }}
        </button>
      </div>
    </div>
  </div>
  
  <div v-else class="not-found">
    <h2>Товар не найден</h2>
    <router-link to="/" class="back-link">Вернуться в магазин</router-link>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCart } from '@/composables/useCart'
import { useProducts } from '@/composables/useProducts'
import { formatPrice } from '@/utils/formatters'
import type { Product, LoadingStatus } from '@/types'

const route = useRoute()
const router = useRouter()
const { addToCart, updateQuantity, isInCart, getItemQuantity } = useCart()
const { getProductById } = useProducts()

const product = ref<Product | null>(null)
const loading = ref<LoadingStatus>('idle')
const error = ref<string | null>(null)

const getImageUrl = (product: Product): string => {
  if (product.image?.file?.url) {
    // Если URL относительный, добавляем базовый URL
    if (product.image.file.url.startsWith('/')) {
      return `https://vue-study.skillbox.cc${product.image.file.url}`
    }
    return product.image.file.url
  }
  return 'https://via.placeholder.com/400x400?text=No+Image'
}

const loadProduct = async () => {
  const id = Number(route.params.id)
  if (isNaN(id)) {
    router.push('/')
    return
  }
  
  loading.value = 'loading'
  error.value = null
  
  try {
    const foundProduct = await getProductById(id)
    if (foundProduct) {
      product.value = foundProduct
      loading.value = 'success'
    } else {
      loading.value = 'error'
      error.value = 'Товар не найден'
    }
  } catch (err) {
    loading.value = 'error'
    error.value = err instanceof Error ? err.message : 'Ошибка загрузки товара'
    console.error('Error loading product:', err)
  }
}

const handleAddToCart = () => {
  if (product.value) {
    addToCart(product.value)
  }
}

onMounted(() => {
  loadProduct()
})
</script>

<style scoped>
.product-detail {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.product-gallery {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f8f9fa;
  border-radius: 8px;
  padding: 2rem;
}

.main-image {
  max-width: 100%;
  max-height: 400px;
  object-fit: contain;
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.product-info h1 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.product-meta {
  padding-bottom: 1rem;
  border-bottom: 1px solid #e0e0e0;
}

.slug {
  color: #666;
  font-size: 0.9rem;
}

.product-colors {
  margin: 1rem 0;
}

.product-colors h3 {
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.colors-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.color-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.color-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #fff;
  box-shadow: 0 0 0 1px #ddd;
  cursor: pointer;
  transition: transform 0.2s;
}

.color-circle:hover {
  transform: scale(1.1);
}

.color-name {
  font-size: 0.75rem;
  color: #666;
}

.price {
  font-size: 2rem;
  font-weight: bold;
  color: #667eea;
  margin: 1rem 0;
}

.actions {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-top: 1rem;
}

.quantity {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 0.25rem;
}

.quantity button {
  width: 35px;
  height: 35px;
  border: none;
  background: #f8f9fa;
  cursor: pointer;
  font-size: 1.2rem;
  border-radius: 4px;
  transition: background 0.2s;
}

.quantity button:hover {
  background: #e9ecef;
}

.quantity span {
  min-width: 40px;
  text-align: center;
  font-size: 1.1rem;
}

.add-to-cart-btn {
  padding: 0.75rem 2rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.2s;
  flex: 1;
}

.add-to-cart-btn:hover {
  background: #5a67d8;
}

.loading, .not-found {
  text-align: center;
  padding: 3rem;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.back-link {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: #667eea;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  transition: background 0.2s;
}

.back-link:hover {
  background: #5a67d8;
}

@media (max-width: 768px) {
  .product-detail {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 1rem;
  }
  
  .product-info h1 {
    font-size: 1.5rem;
  }
  
  .price {
    font-size: 1.5rem;
  }
}
</style>