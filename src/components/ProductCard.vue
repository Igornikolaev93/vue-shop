<template>
  <div class="product-card">
    <div class="product-image">
      <img :src="getImageUrl(product)" :alt="product.title" loading="lazy">
    </div>
    
    <div class="product-body">
      <router-link :to="`/product/${product.id}`" class="product-link">
        <h3 class="product-title">{{ truncateText(product.title, 40) }}</h3>
      </router-link>
      
      <div class="product-colors" v-if="product.colors && product.colors.length > 0">
        <span 
          v-for="color in product.colors.slice(0, 3)" 
          :key="color.id"
          class="color-dot"
          :style="{ backgroundColor: color.code }"
          :title="color.title"
        ></span>
        <span v-if="product.colors.length > 3" class="more-colors">
          +{{ product.colors.length - 3 }}
        </span>
      </div>
      
      <div class="product-footer">
        <div class="product-price">{{ formatPrice(product.price) }}</div>
        <button class="add-to-cart-btn" @click="handleAddToCart">
          В корзину
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '@/types'
import { useCart } from '@/composables/useCart'
import { formatPrice, truncateText } from '@/utils/formatters'

const props = defineProps<{
  product: Product
}>()

const { addToCart } = useCart()

const handleAddToCart = () => {
  addToCart(props.product)
}

const getImageUrl = (product: Product): string => {
  return product.image?.file?.url || 'https://via.placeholder.com/300x300?text=No+Image'
}
</script>

<style scoped>
.product-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
}

.product-image {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: #f8f9fa;
}

.product-image img {
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
}

.product-body {
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.product-link {
  text-decoration: none;
  color: inherit;
}

.product-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.2s;
}

.product-link:hover .product-title {
  color: #667eea;
}

.product-colors {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  align-items: center;
}

.color-dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #ddd;
  cursor: pointer;
  transition: transform 0.2s;
}

.color-dot:hover {
  transform: scale(1.2);
}

.more-colors {
  font-size: 0.75rem;
  color: #666;
}

.product-footer {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.product-price {
  font-size: 1.25rem;
  font-weight: bold;
  color: #667eea;
}

.add-to-cart-btn {
  padding: 0.5rem 1rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}

.add-to-cart-btn:hover {
  background: #5a67d8;
}
</style>