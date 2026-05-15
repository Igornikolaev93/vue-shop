<template>
  <div v-if="visible" class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Регистрация</h2>
        <button class="close-btn" @click="close">&times;</button>
      </div>
      
      <div class="modal-body">
        <div v-if="error" class="error-message">{{ error }}</div>
        
        <form @submit.prevent="handleRegister">
          <div class="form-group">
            <label>Имя</label>
            <input 
              type="text" 
              v-model="form.name" 
              required
              placeholder="Введите ваше имя"
            >
          </div>
          
          <div class="form-group">
            <label>Email</label>
            <input 
              type="email" 
              v-model="form.email" 
              required
              placeholder="example@mail.com"
            >
          </div>
          
          <div class="form-group">
            <label>Телефон (необязательно)</label>
            <input 
              type="tel" 
              v-model="form.phone" 
              placeholder="+7 (999) 123-45-67"
            >
          </div>
          
          <div class="form-group">
            <label>Пароль</label>
            <input 
              type="password" 
              v-model="form.password" 
              required
              placeholder="••••••"
            >
          </div>
          
          <button type="submit" class="register-btn" :disabled="loading">
            {{ loading ? 'Регистрация...' : 'Зарегистрироваться' }}
          </button>
        </form>
        
        <div class="modal-footer">
          <p>
            Уже есть аккаунт? 
            <button type="button" class="link-btn" @click="switchToLogin">Войти</button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useAuth } from '@/composables/useAuth'
import type { RegisterData } from '@/types'

const props = defineProps<{
  visible: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'switchToLogin'): void
}>()

const { register, loading, error } = useAuth()

const form = reactive<RegisterData>({
  name: '',
  email: '',
  password: '',
  phone: ''
})

const handleRegister = async () => {
  const success = await register(form)
  if (success) {
    emit('close')
  }
}

const close = () => {
  emit('close')
}

const switchToLogin = () => {
  emit('switchToLogin')
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e0e0e0;
}

.modal-header h2 {
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
}

.modal-body {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
}

.register-btn {
  width: 100%;
  padding: 0.75rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
}

.register-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-message {
  background: #fee;
  color: #e74c3c;
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;
}

.modal-footer {
  margin-top: 1.5rem;
  text-align: center;
  padding-top: 1rem;
  border-top: 1px solid #e0e0e0;
}

.link-btn {
  background: none;
  border: none;
  color: #667eea;
  cursor: pointer;
  font-weight: 500;
}

.link-btn:hover {
  text-decoration: underline;
}
</style>