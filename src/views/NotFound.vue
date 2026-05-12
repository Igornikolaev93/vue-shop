<template>
  <div class="not-found">
    <div class="not-found-content">
      <h1>404</h1>
      <h2>Страница не найдена</h2>
      <p>Извините, запрашиваемая страница не существует.</p>
      <router-link to="/" class="home-link">
        Вернуться на главную
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.not-found-content {
  text-align: center;
  padding: 2rem;
}

.not-found-content h1 {
  font-size: 6rem;
  color: #667eea;
  margin-bottom: 1rem;
}

.not-found-content h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #333;
}

.not-found-content p {
  color: #666;
  margin-bottom: 2rem;
}

.home-link {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: #667eea;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  transition: background 0.2s;
}

.home-link:hover {
  background: #5a67d8;
}
</style>