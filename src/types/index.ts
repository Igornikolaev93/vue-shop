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