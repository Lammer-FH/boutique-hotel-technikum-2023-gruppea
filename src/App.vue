<script setup>
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue';
const showSidebar = ref(false);
const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value;
}
</script>

<template>
  <header>
    <button @click="toggleSidebar" class="btn btn-primary">☰</button>
    <div v-if="showSidebar" class="sidebar">
      <button @click="toggleSidebar" class="close-btn">✖</button>
      <RouterLink to="/" @click.native="toggleSidebar" class="btn btn-primary mb-2">Home</RouterLink>
      <RouterLink to="/book" @click.native="toggleSidebar" class="btn btn-primary mb-2">Book</RouterLink>
      <RouterLink to="/rooms" @click.native="toggleSidebar" class="btn btn-primary mb-2">Rooms</RouterLink>
      <RouterLink to="/about" @click.native="toggleSidebar" class="btn btn-primary mb-2">About</RouterLink>
      <RouterLink to="/impressum" @click.native="toggleSidebar" class="btn btn-primary mb-2">Impressum</RouterLink>
    </div>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
    <div class="wrapper">
      <HelloWorld msg="HOTEL TECHNIKUM-A" />
    </div>
    <div>
      <nav id="mainnav">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/book">Book</RouterLink>
        <RouterLink to="/rooms">Rooms</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/impressum">Impressum</RouterLink>
      </nav>
    </div>
  </header>
  <RouterView :showSidebar="showSidebar" />
</template>

<style scoped>
.btn {
  display: none;
}

.sidebar[style*="display: block"] {
  display: flex;
  flex-direction: column;
}

.sidebar {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 21.125rem;
  height: 100vh;
  background-color: #111;
  /* background-color: hsla(160, 100%, 37%, 1); */
  /* background-color: hsl(211.43deg 28.77% 28.63%); */
  padding: 60px 25px 0 25px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.3);
  z-index: 900;
  animation: toright 0.25s;
}

.sidebar a {
  display: block;
  padding: 10px;
  color: white;
  text-decoration: none;
  margin-bottom: 5px;
  border-radius: 0.25rem;
  /* abgerundete Ecken */
  transition: background-color 0.2s ease-in-out;
  /* sanfter Übergang für Hover */
  font-size: x-large;
}

.sidebar a:hover {
  background-color: #575757;
}

@media (max-width: 768px) {
  .btn {
    display: block;
  }
}

.close-btn {
  border: none;
  color: white;
  font-size: 24px;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

@keyframes toright {
  from {
    transform: translateX(-100%);
  }

  to {
    transform: translateX(0);
  }
}

.logo {
  padding: 3%;
  top: 10px;
  right: 10px;
}

nav#mainnav {
  text-align: center;
  padding: 10px;
  z-index: 900;
}

nav#mainnav span {
  display: none;
}

nav#mainnav a {
  display: none;
  ;
}

/* Bei Bildschirmbreiten über 768px werden die Textbeschreibungen ausgeblendet */
@media (min-width: 769px) {
  nav#mainnav span {
    display: inline;
  }

  nav#mainnav a {
    display: inline-block;
    margin: 0 15px;
    /* Optional: Ein bisschen Abstand zwischen den Icons */
  }
}
  @media (max-width: 768px) {
.logo {
  justify-content: center;
  }
}
</style>
