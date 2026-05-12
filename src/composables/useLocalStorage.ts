import { ref, watch, type Ref } from 'vue'

export function useLocalStorage<T>(key: string, defaultValue: T): {
  data: Ref<T>
  save: () => void
  clear: () => void
} {
  const storedValue = localStorage.getItem(key)
  const data = ref<T>(
    storedValue ? JSON.parse(storedValue) : defaultValue
  )
  
  const save = () => {
    localStorage.setItem(key, JSON.stringify(data.value))
  }
  
  const clear = () => {
    localStorage.removeItem(key)
    data.value = defaultValue
  }
  
  watch(data, save, { deep: true })
  
  return { data, save, clear }
}