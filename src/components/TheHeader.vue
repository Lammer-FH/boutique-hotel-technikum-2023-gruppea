<!-- TheHeader.vue -->
<template>
    <header>
        <router-link to="/">
            <img alt="logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
        </router-link>

        <!-- <div>
            <nav id="mainnav">
                <RouterLink to="/">Boutique Hotel</RouterLink>
                <RouterLink to="/book">Buchen</RouterLink>
                <RouterLink to="/rooms">Unsere Zimmer</RouterLink>
                <RouterLink to="/about">Über uns</RouterLink>
                <RouterLink to="/impressum">Impressum</RouterLink>
            </nav>
        </div> -->
    </header>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import LoginAndRegister from '../views/popups/LoginAndRegister.vue';
  
  const showLoginModal = ref(false);
  const showRegisterModal = ref(false);
  
  const toggleLoginModal = () => {
    showLoginModal.value = !showLoginModal.value;
  };
  
  const toggleRegisterModal = () => {
    showRegisterModal.value = !showRegisterModal.value;
  };
  </script>
  
<style scoped>
.router-link-active,
.router-link-exact-active,
.my-active-class,
.my-exact-active-class {
    background: none;
}

.router-link-active, .router-link-exact-active {
  outline: none !important;  
  box-shadow: none !important;
}

.logo {
    top: 10px;
    right: 10px;
}

.button-container {
    display: inline-block;
    margin-left: 20px;
}

.btn {
    margin-right: 10px;
}

button.btn.btn-success {
    background-color: transparent;
    border-color: #26c6a4;
    color: #26c6a4;
    font-weight: bold;
}

button.btn.btn-outline-secondary {
    border-color: transparent;
    color: #9bb8e5;
    font-weight: bold;
}

.btn-success:hover {
    background-color: #26c6a4 !important;
    color: white !important;
}

.btn-outline-secondary:hover {
    background-color: #9bb8e5 !important;
    color: white !important;
}

@media (min-width: 1024px) {}

@media (min-width: 769px) {
    nav#mainnav span {
        display: inline;
    }

    nav#mainnav a {
        display: inline-block;
        margin: 0 15px;
    }
}

@media (max-width: 768px) {
    .logo {
        justify-content: center;
        padding: 0%;
    }
}
</style>
