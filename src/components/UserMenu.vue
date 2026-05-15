<template>
  <div class="user-menu">
    <div v-if="isAuthenticated" class="user-info" @click="toggleDropdown">
      <div class="avatar">
        {{ userInitials }}
      </div>
      <span class="user-name">{{ userName }}</span>
      <span class="dropdown-arrow">▼</span>
    </div>
    
    <button v-else class="login-btn-header" @click="showLoginModal = true">
      👤 Войти
    </button>
    
    <!-- Выпадающее меню -->
    <div v-if="showDropdown" class="dropdown-menu" @click.stop>
      <router-link to="/account" class="dropdown-item" @click="showDropdown = false">
        👤 Личный кабинет
      </router-link>
      <router-link to="/orders" class="dropdown-item" @click="showDropdown = false">
        📦 Мои заказы
      </router-link>
      <hr>
      <button class="dropdown-item logout" @click="handleLogout">
        🚪 Выйти
      </button>
    </div>
    
    <!-- Модальные окна -->
    <LoginModal 
      :visible="showLoginModal" 
      @close="showLoginModal = false"
      @switch-to-register="showLoginModal = false; showRegisterModal = true"
    />
    <RegisterModal 
      :visible="showRegisterModal" 
      @close="showRegisterModal = false"
      @switch-to-login="showRegisterModal = false; showLoginModal = true"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { useRouter } from 'vue-router'
import LoginModal from './LoginModal.vue'
import RegisterModal from './RegisterModal.vue'

const router = useRouter()
const { user, isAuthenticated, logout } = useAuth()
const showDropdown = ref(false)
const showLoginModal = ref(false)
const showRegisterModal = ref(false)

const userName = computed(() => user.value?.name || '')
const userInitials = computed(() => {
  if (!user.value?.name) return '?'
  return user.value.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const handleLogout = () => {
  logout()
  showDropdown.value = false
  router.push('/')
}

// Закрываем dropdown при клике вне
document.addEventListener('click', () => {
  showDropdown.value = false
})
</script>

<style scoped>
.user-menu {
  position: relative;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: background 0.2s;
}

.user-info:hover {
  background: rgba(255,255,255,0.1);
}

.avatar {
  width: 32px;
  height: 32px;
  background: #ff4757;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
}

.user-name {
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dropdown-arrow {
  font-size: 0.7rem;
}

.login-btn-header {
  background: rgba(255,255,255,0.2);
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.2s;
}

.login-btn-header:hover {
  background: rgba(255,255,255,0.3);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  min-width: 200px;
  z-index: 1000;
  overflow: hidden;
}

.dropdown-item {
  display: block;
  padding: 0.75rem 1rem;
  color: #333;
  text-decoration: none;
  transition: background 0.2s;
  cursor: pointer;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  font-size: 0.9rem;
}

.dropdown-item:hover {
  background: #f5f5f5;
}

.dropdown-item.logout {
  color: #e74c3c;
}

hr {
  margin: 0;
  border: none;
  border-top: 1px solid #e0e0e0;
}
</style>