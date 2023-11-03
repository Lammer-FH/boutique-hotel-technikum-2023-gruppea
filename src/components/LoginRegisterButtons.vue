<template>
    <div class="logRegButton">
        <button @click="toggleLoginModal" class="btn btn-outline-secondary">Anmelden</button>
        <button @click="toggleRegisterModal" class="btn btn-success">Registrieren</button>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';

const toggleLoginModal = () => {
    // Dein Code zum Öffnen des Login-Modals
};

const toggleRegisterModal = () => {
    // Dein Code zum Öffnen des Register-Modals
};
</script>
  
<style scoped>
.logRegButton {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
button.btn.btn-outline-secondary {
    border: transparent;
    font-weight: 600;
    --bs-btn-hover-bg: none;
    --bs-btn-hover-color: #1dbf73;
}
button.btn.btn-success {
    --bs-btn-color: #1dbf73;
    --bs-btn-hover-bg: #1dbf73;
    --bs-btn-bg: none;
    border-color: #1dbf73;
}
</style>
  