<!-- LoginAndRegister.vue -->
<template>
  <div>
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
import { ref, watch, defineProps } from 'vue';

// Definiere die Props
const props = defineProps({
  showModalProp: Boolean,
  isLoginProp: Boolean
});

// Reaktive Referenzen, die mit den Props initialisiert werden
const showModal = ref(props.showModalProp);
const isLogin = ref(props.isLoginProp);

// Beobachte die Props für Änderungen und aktualisiere die lokalen Referenzen
watch(props, (newProps) => {
  showModal.value = newProps.showModalProp;
  isLogin.value = newProps.isLoginProp;
});

// Eine Methode, um das Modal zu schließen
const closeModal = () => {
  showModal.value = false;
  // Hier könntest du auch ein Ereignis emittieren, um die übergeordnete Komponente zu informieren
};
</script>

<style scoped>
.registerForm[data-v-bb52c3e3] {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
  text-align: -webkit-left;
  float: left;
}
</style>