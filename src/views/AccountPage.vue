<template>
  <div class="account-page">
    <div class="account-header">
      <h1>Личный кабинет</h1>
      <p>{{ greeting }}, {{ user?.name }}!</p>
    </div>
    
    <div class="account-content">
      <!-- Профиль -->
      <div class="profile-section">
        <h2>Профиль</h2>
        <div class="profile-info">
          <div class="avatar-large">
            {{ userInitials }}
          </div>
          
          <form @submit.prevent="saveProfile" class="profile-form">
            <div class="form-group">
              <label>Имя</label>
              <input type="text" v-model="profileForm.name">
            </div>
            
            <div class="form-group">
              <label>Email</label>
              <input type="email" v-model="profileForm.email" disabled>
            </div>
            
            <div class="form-group">
              <label>Телефон</label>
              <input type="tel" v-model="profileForm.phone">
            </div>
            
            <button type="submit" class="save-btn" :disabled="saving">
              {{ saving ? 'Сохранение...' : 'Сохранить изменения' }}
            </button>
          </form>
        </div>
      </div>
      
      <!-- Статистика -->
      <div class="stats-section">
        <h2>Статистика</h2>
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-value">{{ orders.length }}</div>
            <div class="stat-label">Всего заказов</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ totalSpent }} ₽</div>
            <div class="stat-label">Потрачено</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { authService } from '@/api/auth'

const router = useRouter()
const { user, greeting, updateProfile, isAuthenticated } = useAuth()
const saving = ref(false)

const profileForm = reactive({
  name: user.value?.name || '',
  email: user.value?.email || '',
  phone: user.value?.phone || ''
})

const orders = ref(authService.getUserOrders())
const totalSpent = computed(() => 
  orders.value.reduce((sum, order) => sum + order.total, 0)
)

const userInitials = computed(() => {
  if (!user.value?.name) return '?'
  return user.value.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

const saveProfile = async () => {
  saving.value = true
  const success = await updateProfile({
    name: profileForm.name,
    phone: profileForm.phone
  })
  saving.value = false
  if (success) {
    alert('Профиль обновлен!')
  }
}

// Проверка авторизации
onMounted(() => {
  if (!isAuthenticated.value) {
    router.push('/')
  }
})
</script>

<style scoped>
.account-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.account-header {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e0e0e0;
}

.account-header h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.account-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.profile-section,
.stats-section {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.profile-section h2,
.stats-section h2 {
  margin-bottom: 1.5rem;
  color: #333;
}

.profile-info {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}

.avatar-large {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: bold;
  color: white;
}

.profile-form {
  flex: 1;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #666;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
}

.form-group input:disabled {
  background: #f5f5f5;
  color: #999;
}

.save-btn {
  padding: 0.75rem 1.5rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.2s;
}

.save-btn:hover:not(:disabled) {
  background: #5a67d8;
}

.save-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.stat-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.9;
}

@media (max-width: 768px) {
  .account-content {
    grid-template-columns: 1fr;
  }
  
  .profile-info {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}
</style>