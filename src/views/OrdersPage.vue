<template>
  <div class="orders-page">
    <h1>Мои заказы</h1>
    
    <div v-if="orders.length === 0" class="empty-orders">
      <p>У вас пока нет заказов</p>
      <router-link to="/" class="shop-link">Перейти в магазин</router-link>
    </div>
    
    <div v-else class="orders-list">
      <div v-for="order in orders" :key="order.id" class="order-card">
        <div class="order-header">
          <div>
            <strong>Заказ №{{ order.id.slice(-8) }}</strong>
            <span class="order-date">{{ formatDate(order.createdAt) }}</span>
          </div>
          <span :class="['order-status', order.status]">
            {{ getStatusText(order.status) }}
          </span>
        </div>
        
        <div class="order-items">
          <div v-for="item in order.items" :key="item.id" class="order-item">
            <img :src="getImageUrl(item)" :alt="item.title" class="item-image">
            <div class="item-info">
              <h4>{{ item.title }}</h4>
              <p>{{ formatPrice(item.price) }} × {{ item.quantity }}</p>
            </div>
            <div class="item-total">{{ formatPrice(item.price * item.quantity) }}</div>
          </div>
        </div>
        
        <div class="order-footer">
          <div class="order-total">
            Итого: <strong>{{ formatPrice(order.total) }}</strong>
          </div>
          <div class="order-address">
            <strong>Адрес доставки:</strong> {{ order.shippingAddress.address }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { authService } from '@/api/auth'
import { formatPrice } from '@/utils/formatters'
import type { Order } from '@/types'

const router = useRouter()
const { isAuthenticated } = useAuth()
const orders = ref<Order[]>([])

const getImageUrl = (item: any): string => {
  if (item.image?.file?.url) {
    if (item.image.file.url.startsWith('/')) {
      return `https://vue-study.skillbox.cc${item.image.file.url}`
    }
    return item.image.file.url
  }
  return 'https://via.placeholder.com/60x60?text=No+Image'
}

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

const getStatusText = (status: string) => {
  const statusMap: Record<string, string> = {
    pending: 'Ожидает обработки',
    processing: 'В обработке',
    shipped: 'Отправлен',
    delivered: 'Доставлен',
    cancelled: 'Отменен'
  }
  return statusMap[status] || status
}

onMounted(() => {
  if (!isAuthenticated.value) {
    router.push('/')
    return
  }
  orders.value = authService.getUserOrders()
})
</script>

<style scoped>
.orders-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.orders-page h1 {
  margin-bottom: 2rem;
  color: #333;
}

.empty-orders {
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 12px;
}

.shop-link {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background: #667eea;
  color: white;
  text-decoration: none;
  border-radius: 6px;
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.order-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #e0e0e0;
}

.order-date {
  color: #666;
  font-size: 0.85rem;
  margin-left: 1rem;
}

.order-status {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
}

.order-status.pending {
  background: #fff3cd;
  color: #856404;
}

.order-status.processing {
  background: #cce5ff;
  color: #004085;
}

.order-status.shipped {
  background: #d4edda;
  color: #155724;
}

.order-status.delivered {
  background: #d1ecf1;
  color: #0c5460;
}

.order-status.cancelled {
  background: #f8d7da;
  color: #721c24;
}

.order-items {
  margin-bottom: 1rem;
}

.order-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.item-image {
  width: 60px;
  height: 60px;
  object-fit: contain;
}

.item-info {
  flex: 1;
}

.item-info h4 {
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.item-total {
  font-weight: bold;
  color: #667eea;
}

.order-footer {
  padding-top: 1rem;
  border-top: 1px solid #e0e0e0;
  text-align: right;
}

.order-total {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.order-address {
  font-size: 0.85rem;
  color: #666;
}
</style>