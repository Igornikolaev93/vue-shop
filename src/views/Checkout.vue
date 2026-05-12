<template>
  <div class="checkout">
    <h1 class="checkout-title">Оформление заказа</h1>
    
    <div v-if="cartItems.length === 0" class="empty-cart">
      <p>Корзина пуста</p>
      <router-link to="/" class="continue-shopping">Продолжить покупки</router-link>
    </div>
    
    <div v-else class="checkout-content">
      <div class="order-summary">
        <h2>Ваш заказ</h2>
        <div class="order-items">
          <div v-for="item in cartItems" :key="item.id" class="order-item">
            <img :src="item.image" :alt="item.title" class="item-image">
            <div class="item-details">
              <h3>{{ item.title }}</h3>
              <p>{{ formatPrice(item.price) }} × {{ item.quantity }}</p>
            </div>
            <div class="item-total">
              {{ formatPrice(item.price * item.quantity) }}
            </div>
          </div>
        </div>
        
        <div class="order-total">
          <span>Итого:</span>
          <strong>{{ formatPrice(totalPrice) }}</strong>
        </div>
      </div>
      
      <div class="checkout-form">
        <h2>Контактная информация</h2>
        
        <form @submit.prevent="submitOrder">
          <div class="form-group">
            <label for="name">Имя</label>
            <input 
              type="text" 
              id="name" 
              v-model="form.name" 
              required
              placeholder="Введите ваше имя"
            >
          </div>
          
          <div class="form-group">
            <label for="email">Email</label>
            <input 
              type="email" 
              id="email" 
              v-model="form.email" 
              required
              placeholder="example@mail.com"
            >
          </div>
          
          <div class="form-group">
            <label for="phone">Телефон</label>
            <input 
              type="tel" 
              id="phone" 
              v-model="form.phone" 
              required
              placeholder="+7 (999) 123-45-67"
            >
          </div>
          
          <div class="form-group">
            <label for="address">Адрес доставки</label>
            <textarea 
              id="address" 
              v-model="form.address" 
              required
              rows="3"
              placeholder="Введите ваш адрес"
            ></textarea>
          </div>
          
          <div class="form-group">
            <label for="comment">Комментарий к заказу (необязательно)</label>
            <textarea 
              id="comment" 
              v-model="form.comment"
              rows="2"
              placeholder="Дополнительная информация"
            ></textarea>
          </div>
          
          <button type="submit" class="submit-btn" :disabled="isSubmitting">
            {{ isSubmitting ? 'Оформление...' : 'Оформить заказ' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCart } from '@/composables/useCart'
import { formatPrice } from '@/utils/formatters'

const router = useRouter()
const { cartItems, totalPrice, clearCart } = useCart()
const isSubmitting = ref(false)

const form = reactive({
  name: '',
  email: '',
  phone: '',
  address: '',
  comment: ''
})

const submitOrder = async () => {
  isSubmitting.value = true
  
  // Симуляция отправки заказа
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  const order = {
    ...form,
    items: cartItems.value,
    total: totalPrice.value,
    date: new Date().toISOString()
  }
  
  console.log('Order submitted:', order)
  
  // Здесь можно отправить заказ на сервер
  // await apiClient.post('/orders', order)
  
  alert('Спасибо за заказ! Наш менеджер свяжется с вами в ближайшее время.')
  clearCart()
  router.push('/')
}

const validateForm = () => {
  return form.name && form.email && form.phone && form.address
}
</script>

<style scoped>
.checkout {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.checkout-title {
  margin-bottom: 2rem;
  color: #333;
}

.empty-cart {
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 12px;
}

.continue-shopping {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background: #667eea;
  color: white;
  text-decoration: none;
  border-radius: 6px;
}

.checkout-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.order-summary {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.order-summary h2,
.checkout-form h2 {
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.order-items {
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 1.5rem;
}

.order-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
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

.item-details h3 {
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.item-total {
  font-weight: bold;
  color: #667eea;
}

.order-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 2px solid #e0e0e0;
  font-size: 1.2rem;
}

.checkout-form {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #667eea;
}

.submit-btn {
  width: 100%;
  padding: 1rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

.submit-btn:hover:not(:disabled) {
  background: #5a67d8;
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .checkout-content {
    grid-template-columns: 1fr;
  }
  
  .checkout {
    padding: 1rem;
  }
}
</style>