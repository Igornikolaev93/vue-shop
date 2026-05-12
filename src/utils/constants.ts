export const API_URL = 'https://vue-study.skillbox.cc/api'

export const STORAGE_KEYS = {
  CART: 'shop_cart',
  USER: 'shop_user',
  THEME: 'shop_theme'
} as const

export const ROUTES = {
  HOME: '/',
  PRODUCT: '/product',
  CART: '/cart',
  CHECKOUT: '/checkout'
} as const

export const SORT_OPTIONS = {
  DEFAULT: 'default',
  PRICE_ASC: 'price_asc',
  PRICE_DESC: 'price_desc',
  RATING_DESC: 'rating_desc'
} as const

export const PRODUCTS_PER_PAGE = 12

export const DEBOUNCE_DELAY = 300