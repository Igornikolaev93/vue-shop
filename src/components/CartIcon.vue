<template>
  <router-link to="/cart" class="cart-icon">
    <span class="cart-icon-emoji">🛒</span>
    <span v-if="totalItems > 0" class="cart-badge">{{ totalItems }}</span>
  </router-link>
</template>

<script setup lang="ts">
import { useCart } from '@/composables/useCart'

const { totalItems } = useCart()
</script>

<style scoped>
.cart-icon {
  position: relative;
  cursor: pointer;
  font-size: 1.8rem;
  transition: transform 0.2s;
  text-decoration: none;
  color: white;
  display: inline-block;
}

.cart-icon:hover {
  transform: scale(1.1);
}

.cart-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #ff4757;
  color: white;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}
</style>