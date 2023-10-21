<!-- TheHeader.vue -->
<template>
    <header>
      <div>
        <img alt="logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
      </div>
      <div class="button-container">
        <!-- Trigger Login Modal -->
        <button @click="toggleLoginModal" class="btn btn-outline-secondary">Anmelden</button>
        <!-- Trigger Register Modal -->
        <button @click="toggleRegisterModal" class="btn btn-success">Registrieren</button>
      </div>
  
      <!-- Login Modal -->
      <b-modal v-model="showLoginModal" title="Anmelden">
        <LoginAndRegister type="login" />
      </b-modal>
  
      <!-- Register Modal -->
      <b-modal v-model="showRegisterModal" title="Registrieren">
        <LoginAndRegister type="register" />
      </b-modal>
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
