<template>
  <div class="cart-page">
    <h1 class="cart-title">Корзина</h1>
    
    <div v-if="cartItems.length === 0" class="empty-cart">
      <div class="empty-cart-icon">🛒</div>
      <h2>Ваша корзина пуста</h2>
      <p>Добавьте товары в корзину, чтобы продолжить покупки</p>
      <router-link to="/" class="continue-shopping-btn">
        Перейти к покупкам
      </router-link>
    </div>
    
    <div v-else class="cart-content">
      <!-- Список товаров -->
      <div class="cart-items-section">
        <div class="cart-header">
          <div class="header-product">Товар</div>
          <div class="header-price">Цена</div>
          <div class="header-quantity">Количество</div>
          <div class="header-total">Итого</div>
          <div class="header-actions"></div>
        </div>
        
        <div class="cart-items">
          <div v-for="item in cartItems" :key="item.id" class="cart-item">
            <div class="item-product">
              <img :src="getImageUrl(item)" :alt="item.title" class="item-image">
              <div class="item-info">
                <router-link :to="`/product/${item.id}`" class="item-title">
                  {{ item.title }}
                </router-link>
                <div class="item-colors" v-if="item.colors && item.colors.length > 0">
                  <span 
                    v-for="color in item.colors.slice(0, 2)" 
                    :key="color.id"
                    class="color-dot"
                    :style="{ backgroundColor: color.code }"
                    :title="color.title"
                  ></span>
                </div>
              </div>
            </div>
            
            <div class="item-price">{{ formatPrice(item.price) }}</div>
            
            <div class="item-quantity">
              <button 
                class="quantity-btn"
                @click="updateQuantity(item.id, item.quantity - 1)"
                :disabled="item.quantity <= 1"
              >
                -
              </button>
              <span class="quantity-value">{{ item.quantity }}</span>
              <button 
                class="quantity-btn"
                @click="updateQuantity(item.id, item.quantity + 1)"
              >
                +
              </button>
            </div>
            
            <div class="item-total">{{ formatPrice(item.price * item.quantity) }}</div>
            
            <div class="item-actions">
              <button class="remove-btn" @click="removeItem(item.id)" title="Удалить">
                🗑️
              </button>
            </div>
          </div>
        </div>
        
        <!-- Кнопка очистки корзины -->
        <div class="cart-actions">
          <button class="clear-cart-btn" @click="clearCart">
            Очистить корзину
          </button>
        </div>
      </div>
      
      <!-- Итого и оформление -->
      <div class="cart-summary">
        <h2>Итого</h2>
        <div class="summary-details">
          <div class="summary-row">
            <span>Товаров ({{ totalItems }} шт.):</span>
            <span>{{ formatPrice(totalPrice) }}</span>
          </div>
          <div class="summary-row">
            <span>Доставка:</span>
            <span>Бесплатно</span>
          </div>
          <div class="summary-divider"></div>
          <div class="summary-row total">
            <span>Итого к оплате:</span>
            <span class="total-price">{{ formatPrice(totalPrice) }}</span>
          </div>
        </div>
        
        <button class="checkout-btn" @click="goToCheckout">
          Оформить заказ
        </button>
        
        <router-link to="/" class="continue-shopping-link">
          ← Продолжить покупки
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useCart } from '@/composables/useCart'
import { formatPrice } from '@/utils/formatters'
import type { CartItem } from '@/types'

const router = useRouter()
const { cartItems, updateQuantity, removeFromCart, clearCart, totalItems, totalPrice } = useCart()

const getImageUrl = (item: CartItem): string => {
  if (item.image?.file?.url) {
    if (item.image.file.url.startsWith('/')) {
      return `https://vue-study.skillbox.cc${item.image.file.url}`
    }
    return item.image.file.url
  }
  return 'https://via.placeholder.com/100x100?text=No+Image'
}

const removeItem = (id: number) => {
  if (confirm('Удалить товар из корзины?')) {
    removeFromCart(id)
  }
}

const goToCheckout = () => {
  router.push('/checkout')
}
</script>

<style scoped>
.cart-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.cart-title {
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #333;
}

/* Пустая корзина */
.empty-cart {
  text-align: center;
  padding: 4rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.empty-cart-icon {
  font-size: 5rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-cart h2 {
  margin-bottom: 0.5rem;
  color: #333;
}

.empty-cart p {
  color: #666;
  margin-bottom: 2rem;
}

.continue-shopping-btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: #667eea;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  transition: background 0.2s;
}

.continue-shopping-btn:hover {
  background: #5a67d8;
}

/* Содержимое корзины */
.cart-content {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 2rem;
}

/* Секция с товарами */
.cart-items-section {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.cart-header {
  display: grid;
  grid-template-columns: 3fr 1fr 1.5fr 1fr 0.5fr;
  gap: 1rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
  font-weight: 600;
  color: #666;
  margin-bottom: 1rem;
}

.header-product {
  grid-column: 1;
}

.header-price {
  grid-column: 2;
}

.header-quantity {
  grid-column: 3;
}

.header-total {
  grid-column: 4;
}

.header-actions {
  grid-column: 5;
}

/* Товар */
.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-item {
  display: grid;
  grid-template-columns: 3fr 1fr 1.5fr 1fr 0.5fr;
  gap: 1rem;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.cart-item:last-child {
  border-bottom: none;
}

.item-product {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.item-image {
  width: 80px;
  height: 80px;
  object-fit: contain;
}

.item-info {
  flex: 1;
}

.item-title {
  font-weight: 500;
  color: #333;
  text-decoration: none;
  transition: color 0.2s;
  display: block;
  margin-bottom: 0.5rem;
}

.item-title:hover {
  color: #667eea;
}

.item-colors {
  display: flex;
  gap: 0.5rem;
}

.color-dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #ddd;
}

.item-price {
  font-weight: 500;
  color: #333;
}

.item-quantity {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.quantity-btn {
  width: 30px;
  height: 30px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s;
}

.quantity-btn:hover:not(:disabled) {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

.quantity-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity-value {
  min-width: 40px;
  text-align: center;
  font-weight: 500;
}

.item-total {
  font-weight: bold;
  color: #667eea;
}

.remove-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.2s;
  padding: 0.25rem;
}

.remove-btn:hover {
  opacity: 1;
}

.cart-actions {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: flex-end;
}

.clear-cart-btn {
  padding: 0.5rem 1rem;
  background: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.clear-cart-btn:hover {
  background: #e74c3c;
  color: white;
  border-color: #e74c3c;
}

/* Сводка заказа */
.cart-summary {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  height: fit-content;
  position: sticky;
  top: 100px;
}

.cart-summary h2 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #333;
}

.summary-details {
  margin-bottom: 1.5rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  color: #666;
}

.summary-row.total {
  margin-top: 0.5rem;
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
}

.total-price {
  color: #667eea;
}

.summary-divider {
  height: 1px;
  background: #e0e0e0;
  margin: 1rem 0;
}

.checkout-btn {
  width: 100%;
  padding: 1rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: background 0.2s;
  margin-bottom: 1rem;
}

.checkout-btn:hover {
  background: #5a67d8;
}

.continue-shopping-link {
  display: block;
  text-align: center;
  color: #666;
  text-decoration: none;
  transition: color 0.2s;
}

.continue-shopping-link:hover {
  color: #667eea;
}

/* Адаптив */
@media (max-width: 968px) {
  .cart-content {
    grid-template-columns: 1fr;
  }
  
  .cart-header {
    display: none;
  }
  
  .cart-item {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 1rem;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    margin-bottom: 1rem;
  }
  
  .item-product {
    flex-direction: column;
    text-align: center;
  }
  
  .item-price,
  .item-quantity,
  .item-total,
  .item-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0;
    border-top: 1px solid #f0f0f0;
  }
  
  .item-price::before {
    content: "Цена:";
    font-weight: 600;
    color: #666;
  }
  
  .item-quantity::before {
    content: "Количество:";
    font-weight: 600;
    color: #666;
  }
  
  .item-total::before {
    content: "Итого:";
    font-weight: 600;
    color: #666;
  }
  
  .cart-summary {
    position: static;
  }
}

@media (max-width: 768px) {
  .cart-page {
    padding: 1rem;
  }
  
  .cart-title {
    font-size: 1.5rem;
  }
}
</style>