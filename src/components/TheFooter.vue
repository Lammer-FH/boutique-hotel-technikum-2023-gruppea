<template>
  <div>
    <footer>
      <div class="footer-links">
        <router-link class="footer-links" to="/impressum">Impressum</router-link>&nbsp;&nbsp;
        <span class="separator">|&nbsp;&nbsp;</span>
        <router-link class="footer-links" to="/about">Über uns</router-link>
      </div>
    </footer>
  </div>
</template>

<style scoped>
footer {
  width: 100%;
  background-color: #333;
  color: white;
  padding: 20px;
  text-align: center;
}

.footer-links {
  color: white;
  display: flex;
  justify-content: center;
  text-decoration: none;
}

.router-link {
  color: white;
  font-weight: bold;
  margin: 0 10px;
  text-decoration: none;
}

.router-link:hover {
  color: white;
  font-weight: bold;
  text-decoration: underline;
}
</style>
