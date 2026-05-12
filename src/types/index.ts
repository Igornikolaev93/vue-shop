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
  // Добавьте эти поля позже, если они появятся в других ответах API
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

export interface Category {
  name: string
  slug: string
}

export interface Order {
  id: string
  items: CartItem[]
  total: number
  date: Date
  status: 'pending' | 'processing' | 'completed' | 'cancelled'
}