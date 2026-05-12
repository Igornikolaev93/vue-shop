import { reactive, readonly } from 'vue'
import type { Product, CartItem } from '@/types'

interface StoreState {
  products: Product[]
  cart: CartItem[]
  loading: boolean
  error: string | null
}

const initialState: StoreState = {
  products: [],
  cart: [],
  loading: false,
  error: null
}

const state = reactive<StoreState>({ ...initialState })

export const store = {
  // State (readonly)
  products: readonly(state).products,
  cart: readonly(state).cart,
  loading: readonly(state).loading,
  error: readonly(state).error,
  
  // Mutations
  setProducts(products: Product[]) {
    state.products = products
  },
  
  setLoading(loading: boolean) {
    state.loading = loading
  },
  
  setError(error: string | null) {
    state.error = error
  },
  
  addToCart(product: Product) {
    const existingItem = state.cart.find(item => item.id === product.id)
    if (existingItem) {
      existingItem.quantity++
    } else {
      state.cart.push({ ...product, quantity: 1 })
    }
  },
  
  removeFromCart(productId: number) {
    const index = state.cart.findIndex(item => item.id === productId)
    if (index !== -1) {
      state.cart.splice(index, 1)
    }
  },
  
  updateQuantity(productId: number, quantity: number) {
    const item = state.cart.find(item => item.id === productId)
    if (item && quantity > 0) {
      item.quantity = quantity
    }
  },
  
  clearCart() {
    state.cart = []
  },
  
  resetStore() {
    Object.assign(state, initialState)
  }
}