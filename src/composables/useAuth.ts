import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '@/api/auth'
import type { User, LoginCredentials, RegisterData } from '@/types'

export function useAuth() {
  const router = useRouter()
  const user = ref<User | null>(null)
  const isAuthenticated = ref(false)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Загрузка пользователя при старте
  const loadUser = () => {
    const currentUser = authService.getCurrentUser()
    user.value = currentUser
    isAuthenticated.value = !!currentUser
  }

  // Регистрация
  const register = async (data: RegisterData) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await authService.register(data)
      authService.saveUser(response.user, response.token)
      user.value = response.user
      isAuthenticated.value = true
      router.push('/account')
      return true
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Ошибка регистрации'
      return false
    } finally {
      loading.value = false
    }
  }

  // Вход
  const login = async (credentials: LoginCredentials) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await authService.login(credentials)
      authService.saveUser(response.user, response.token)
      user.value = response.user
      isAuthenticated.value = true
      router.push('/account')
      return true
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Ошибка входа'
      return false
    } finally {
      loading.value = false
    }
  }

  // Выход
  const logout = () => {
    authService.logout()
    user.value = null
    isAuthenticated.value = false
    router.push('/')
  }

  // Обновление профиля
  const updateProfile = async (data: Partial<User>) => {
    loading.value = true
    error.value = null
    
    try {
      const updatedUser = await authService.updateProfile(data)
      user.value = updatedUser
      return true
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Ошибка обновления'
      return false
    } finally {
      loading.value = false
    }
  }

  // Имя пользователя для приветствия
  const greeting = computed(() => {
    if (!user.value) return ''
    const hour = new Date().getHours()
    if (hour < 12) return 'Доброе утро'
    if (hour < 18) return 'Добрый день'
    return 'Добрый вечер'
  })

  onMounted(() => {
    loadUser()
  })

  return {
    user,
    isAuthenticated,
    loading,
    error,
    greeting,
    register,
    login,
    logout,
    updateProfile,
    loadUser
  }
}