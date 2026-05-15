// src/types/index.ts
export interface Product {
  id: number
  title: string
  slug: string
  price: number
  image: {
    file: {
      url: string
      name: string
      originalName: string
      extension: string
      size: string
    }
  }
  colors: Array<{
    id: number
    title: string
    code: string
  }>
  description?: string
  category?: string
  rating?: {
    rate: number
    count: number
  }
}

export interface CartItem extends Product {
  quantity: number
}

export interface ApiError {
  message: string
  status?: number
}

export type LoadingStatus = 'idle' | 'loading' | 'success' | 'error'

export interface User {
  id: number
  email: string
  name: string
  phone?: string
  avatar?: string
  orders?: Order[]
  createdAt: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
  phone?: string
}

export interface AuthResponse {
  user: User
  token: string
}

export interface Order {
  id: string
  items: CartItem[]
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  createdAt: string
  shippingAddress: {
    name: string
    email: string
    phone: string
    address: string
    comment?: string
  }
}

export interface Category {
  name: string
  slug: string
}