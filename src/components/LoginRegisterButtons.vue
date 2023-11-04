<!-- LoginRegisterButtons.vue -->
<template>
    <div class="logRegButton">
        <button @click="toggleModal(true)" class="btn btn-outline-secondary">Anmelden</button>
        <button @click="toggleModal(false)" class="btn btn-success">Registrieren</button>
        <!-- Das Test-Popup -->
        <div v-if="showModal" class="modal">
            <div class="modal-content">
                <span class="close" @click="showModal = false">&times;</span>
                <p>{{ isLogin ? 'Anmeldeformular' : 'Registrierungsformular' }}</p>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { ref, defineEmits } from 'vue';

const showModal = ref(false);
const isLogin = ref(true);
const emit = defineEmits(['update:showModal', 'update:isLogin']);

const toggleModal = (login) => {
    showModal.value = true;
    isLogin.value = login;
    emit('update:showModal', showModal.value);
    emit('update:isLogin', isLogin.value);
};
</script>
  
<style scoped>
.logRegButton {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

/* ... dein bestehender Stil ... */
/* Stil für das Test-Popup */
.modal {
    display: block;
    /* Hidden by default */
    position: fixed;
    /* Stay in place */
    z-index: 1;
    /* Sit on top */
    left: 0;
    top: 0;
    width: 100%;
    /* Full width */
    height: 100%;
    /* Full height */
    overflow: auto;
    /* Enable scroll if needed */
    background-color: rgb(0, 0, 0);
    /* Fallback color */
    background-color: rgba(0, 0, 0, 0.4);
    /* Black w/ opacity */
}

.modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    /* 15% from the top and centered */
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    /* Could be more or less, depending on screen size */
}

.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
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
}</style>