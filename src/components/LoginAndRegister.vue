<!-- LoginAndRegister.vue -->
<template>
    <div class="logRegButton">
        <!-- Buttons zum Öffnen der Modals -->
        <button @click="toggleModal('login')" class="btn btn-outline-secondary">Anmelden</button>
        <button @click="toggleModal('register')" class="btn btn-success">Registrieren</button>

        <!-- Modal für Anmeldung und Registrierung -->
        <b-modal v-model="showModal" :title="modalTitle">
            <component :is="currentComponent" :modal-state="modalState" @close-modal="showModal = false"></component>
        </b-modal>
    </div>
</template>
  
<script setup>
import LoginForm from './LoginForm.vue';
import RegisterForm from './RegisterForm.vue';
import { ref, computed } from 'vue';


const showModal = ref(false);
const modalState = ref('login');

const currentComponent = computed(() => {
  return modalState.value === 'login' ? LoginForm : RegisterForm;
});

const modalTitle = computed(() => {
  return modalState.value === 'login' ? 'Anmelden' : 'Registrieren';
});

const toggleModal = (state) => {
    modalState.value = state;
    showModal.value = true;
};
</script>
  

<style scoped>
.logRegButton {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.modal {
    display: block;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
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
}
</style>