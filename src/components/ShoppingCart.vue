<template>
  <Transition name="slide">
    <div v-if="visible" class="cart-overlay" @click.self="close">
      <div class="cart-panel">
        <div class="cart-header">
          <h2>Корзина</h2>
          <button class="close-btn" @click="close">&times;</button>
        </div>
        
        <div class="cart-content">
          <div v-if="cartItems.length === 0" class="empty-cart">
            <div class="empty-cart-icon">🛒</div>
            <p>Ваша корзина пуста</p>
            <button class="continue-shopping" @click="close">Продолжить покупки</button>
          </div>
          
          <div v-else class="cart-items">
            <div v-for="item in cartItems" :key="item.id" class="cart-item">
              <img :src="getImageUrl(item)" :alt="item.title" class="item-image">
              
              <div class="item-details">
                <h3>{{ truncateText(item.title, 30) }}</h3>
                <p class="item-price">{{ formatPrice(item.price) }}</p>
              </div>
              
              <div class="item-quantity">
                <button @click="updateQuantity(item.id, item.quantity - 1)">-</button>
                <span>{{ item.quantity }}</span>
                <button @click="updateQuantity(item.id, item.quantity + 1)">+</button>
              </div>
              
              <div class="item-total">
                {{ formatPrice(item.price * item.quantity) }}
              </div>
              
              <button class="remove-btn" @click="removeItem(item.id)">
                🗑️
              </button>
            </div>
          </div>
        </div>
        
        <div v-if="cartItems.length > 0" class="cart-footer">
          <div class="cart-total">
            <span>Итого:</span>
            <strong>{{ formatPrice(totalPrice) }}</strong>
          </div>
          
          <div class="cart-actions">
            <button class="clear-cart-btn" @click="clearCart">
              Очистить корзину
            </button>
            <button class="checkout-btn" @click="goToCheckout">
              Оформить заказ
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useCart } from '@/composables/useCart'
import { formatPrice, truncateText } from '@/utils/formatters'
import type { CartItem } from '@/types'

const props = defineProps<{
  visible: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const router = useRouter()
const { cartItems, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart()

const getImageUrl = (item: CartItem): string => {
  if (item.image?.file?.url) {
    if (item.image.file.url.startsWith('/')) {
      return `https://vue-study.skillbox.cc${item.image.file.url}`
    }
    return item.image.file.url
  }
  return 'https://via.placeholder.com/100x100?text=No+Image'
}

const close = () => {
  emit('close')
}

const removeItem = (id: number) => {
  removeFromCart(id)
}

const goToCheckout = () => {
  close()
  router.push('/checkout')
}
</script>

<style scoped>
/* Стили остаются без изменений */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

.cart-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: flex-end;
  z-index: 1000;
}

.cart-panel {
  width: 100%;
  max-width: 500px;
  background: white;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-shadow: -2px 0 10px rgba(0,0,0,0.1);
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e0e0e0;
}

.close-btn {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #666;
}

.cart-content {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

.empty-cart {
  text-align: center;
  padding: 2rem;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid #f0f0f0;
}

.item-image {
  width: 60px;
  height: 60px;
  object-fit: contain;
}

.item-details {
  flex: 1;
}

.item-quantity {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.item-quantity button {
  width: 30px;
  height: 30px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
}

.item-total {
  font-weight: bold;
  min-width: 80px;
  text-align: right;
}

.remove-btn {
  background: none;
  border: none;
  cursor: pointer;
}

.cart-footer {
  padding: 1rem;
  border-top: 1px solid #e0e0e0;
}

.cart-total {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.cart-actions {
  display: flex;
  gap: 1rem;
}

.clear-cart-btn,
.checkout-btn {
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.checkout-btn {
  background: #667eea;
  color: white;
}

.clear-cart-btn {
  background: #f8f9fa;
  border: 1px solid #ddd;
}
</style>