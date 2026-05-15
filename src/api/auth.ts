// src/api/auth.ts
import type { User, LoginCredentials, RegisterData, AuthResponse, Order } from '@/types'

// Для демонстрации используем localStorage как имитацию бэкенда
class AuthService {
  private readonly TOKEN_KEY = 'auth_token'
  private readonly USER_KEY = 'user_data'

  // Регистрация
  async register(data: RegisterData): Promise<AuthResponse> {
    // Имитация API запроса
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = this.getUsers()
        
        // Проверяем, не существует ли пользователь
        if (users.some(u => u.email === data.email)) {
          reject(new Error('Пользователь с таким email уже существует'))
          return
        }

        // Создаем нового пользователя
        const newUser: User = {
          id: Date.now(),
          email: data.email,
          name: data.name,
          phone: data.phone,
          createdAt: new Date().toISOString(),
          orders: []
        }

        const token = this.generateToken()
        users.push(newUser)
        localStorage.setItem('users', JSON.stringify(users))

        resolve({ user: newUser, token })
      }, 500)
    })
  }

  // Вход
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = this.getUsers()
        const user = users.find(u => u.email === credentials.email)
        
        if (!user) {
          reject(new Error('Пользователь не найден'))
          return
        }

        const token = this.generateToken()
        resolve({ user, token })
      }, 500)
    })
  }

  // Выход
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY)
    localStorage.removeItem(this.USER_KEY)
  }

  // Получение текущего пользователя
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem(this.USER_KEY)
    if (!userStr) return null
    try {
      return JSON.parse(userStr)
    } catch {
      return null
    }
  }

  // Сохранение данных пользователя
  saveUser(user: User, token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token)
    localStorage.setItem(this.USER_KEY, JSON.stringify(user))
  }

  // Проверка авторизации
  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY)
  }

  // Обновление профиля
  async updateProfile(userData: Partial<User>): Promise<User> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const currentUser = this.getCurrentUser()
        if (!currentUser) {
          reject(new Error('Пользователь не авторизован'))
          return
        }

        const updatedUser = { ...currentUser, ...userData }
        localStorage.setItem(this.USER_KEY, JSON.stringify(updatedUser))
        
        // Обновляем в списке пользователей
        const users = this.getUsers()
        const index = users.findIndex(u => u.id === currentUser.id)
        if (index !== -1) {
          users[index] = updatedUser
          localStorage.setItem('users', JSON.stringify(users))
        }

        resolve(updatedUser)
      }, 500)
    })
  }

  // Получение истории заказов
  getUserOrders(): Order[] {
    const user = this.getCurrentUser()
    const ordersKey = `orders_${user?.id}`
    const orders = localStorage.getItem(ordersKey)
    return orders ? JSON.parse(orders) : []
  }

  // Сохранение заказа
  saveOrder(order: Order): void {
    const user = this.getCurrentUser()
    if (user) {
      const ordersKey = `orders_${user.id}`
      const currentOrders = this.getUserOrders()
      currentOrders.unshift(order)
      localStorage.setItem(ordersKey, JSON.stringify(currentOrders))
    }
  }

  private getUsers(): User[] {
    const users = localStorage.getItem('users')
    return users ? JSON.parse(users) : []
  }

  private generateToken(): string {
    return 'token_' + Date.now() + '_' + Math.random().toString(36)
  }
}

export const authService = new AuthService()