<template>
  <div id="app">
    <header class="app-header">
      <div class="container">
        <router-link to="/" class="logo">
          <span class="logo-icon">🛍️</span>
          <span class="logo-text">Интернет-магазин</span>
        </router-link>
        <div class="header-actions">
          <CartIcon />
          <UserMenu />
        </div>
      </div>
    </header>
    
    <main class="app-main">
      <div class="container">
        <router-view />
      </div>
    </main>
    
    <footer class="app-footer">
      <div class="container">
        <p>&copy; 2024 Интернет-магазин. Все права защищены.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import CartIcon from './components/CartIcon.vue'
import UserMenu from './components/UserMenu.vue'
</script>

<style>
/* стили остаются те же */
.header-actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}
</style>