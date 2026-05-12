<template>
  <div id="app">
    <header class="app-header">
      <div class="container">
        <router-link to="/" class="logo">
          <span class="logo-icon">🛍️</span>
          <span class="logo-text">Интернет-магазин</span>
        </router-link>
        <CartIcon />
      </div>
    </header>
    
    <main class="app-main">
      <div class="container">
        <router-view />
      </div>
    </main>
    
    <footer class="app-footer">
      <div class="container">
        <p>&copy; 2026 Интернет-магазин. Все права защищены.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import CartIcon from './components/CartIcon.vue'
</script>

<style scoped>
.app-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  /*display: flex;
  justify-content: space-between;*/
  align-items: center;
}

.logo {
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: scale(1.05);
}

.logo-icon {
  font-size: 1.8rem;
}

.app-main {
  min-height: calc(100vh - 140px);
  padding: 2rem 0;
}

.app-footer {
  background: #2c3e50;
  color: white;
  padding: 1.5rem 0;
  text-align: center;
  margin-top: auto;
}

@media (max-width: 768px) {
  .logo-text {
    display: none;
  }
  
  .logo-icon {
    font-size: 2rem;
  }
}
</style>