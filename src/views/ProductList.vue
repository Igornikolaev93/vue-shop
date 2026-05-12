<template>
  <div class="product-list">
    <!-- Поиск -->
    <div class="search-bar">
      <input 
        type="text" 
        v-model="searchQuery" 
        placeholder="Поиск товаров..." 
        class="search-input"
      >
    </div>
    
    <!-- Loading State -->
    <div v-if="loading === 'loading'" class="loading-state">
      <div class="spinner"></div>
      <p>Загрузка товаров...</p>
    </div>
    
    <!-- Error State -->
    <div v-else-if="loading === 'error'" class="error-state">
      <p>{{ error }}</p>
      <button @click="fetchProducts" class="retry-btn">Повторить</button>
    </div>
    
    <!-- Products Grid -->
    <div v-else class="products-grid">
      <div v-if="filteredProducts.length === 0" class="no-results">
        <p>Товары не найдены</p>
      </div>
      
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
        @add-to-cart="handleAddToCart"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProducts } from '@/composables/useProducts'
import { useCart } from '@/composables/useCart'
import ProductCard from '@/components/ProductCard.vue'
import type { Product } from '@/types'

const { products, loading, error, fetchProducts, searchQuery, filteredProducts } = useProducts()
const { addToCart } = useCart()

const handleAddToCart = (product: Product) => {
  addToCart(product)
}
</script>

<style scoped>
.product-list {
  
  max-width: 1200px;
  margin: 0 auto;
}

.search-bar {
  margin-bottom: 2rem;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: #667eea;
}

.loading-state,
.error-state {
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

.retry-btn {
  padding: 0.5rem 1rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 1rem;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

.no-results {
  text-align: center;
  padding: 3rem;
  color: #666;
}

@media (max-width: 768px) {
  .products-grid {
    gap: 1rem;
  }
}
</style>