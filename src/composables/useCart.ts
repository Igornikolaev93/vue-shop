// src/composables/useCart.ts
import { computed, ref, watch } from 'vue'
import type { CartItem, Product } from '@/types'
import { useLocalStorage } from './useLocalStorage'

export function useCart() {
  const { data: cartData, save } = useLocalStorage<CartItem[]>('cart', [])
  const items = ref<CartItem[]>(cartData.value)
  
  watch(items, save, { deep: true })
  
  const addToCart = (product: Product, quantity: number = 1) => {
    const existingItem = items.value.find((item: CartItem) => item.id === product.id)
    
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      items.value.push({ ...product, quantity })
    }
  }
  
  const removeFromCart = (productId: number) => {
    const index = items.value.findIndex((item: CartItem) => item.id === productId)
    if (index !== -1) {
      items.value.splice(index, 1)
    }
  }
  
  const updateQuantity = (productId: number, quantity: number) => {
    const item = items.value.find((item: CartItem) => item.id === productId)
    if (item) {
      if (quantity <= 0) {
        removeFromCart(productId)
      } else {
        item.quantity = quantity
      }
    }
  }
  
  const clearCart = () => {
    items.value = []
  }
  
  const totalItems = computed(() => 
    items.value.reduce((sum: number, item: CartItem) => sum + item.quantity, 0)
  )
  
  const totalPrice = computed(() => 
    items.value.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0)
  )
  
  const itemCount = computed(() => items.value.length)
  
  const isInCart = (productId: number): boolean => {
    return items.value.some((item: CartItem) => item.id === productId)
  }
  
  const getItemQuantity = (productId: number): number => {
    const item = items.value.find((item: CartItem) => item.id === productId)
    return item?.quantity || 0
  }
  
  return {
    cartItems: items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    itemCount,
    isInCart,
    getItemQuantity
  }
}