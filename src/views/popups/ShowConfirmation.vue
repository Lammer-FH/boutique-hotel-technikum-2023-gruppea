<template>
    <b-modal :model-value="showConfirmation" @update:modelValue="$emit('update:showConfirmation', $event)">
      <template #modal-title>
        Buchung erfolgreich
      </template>
      <div>
        Deine Buchung wurde erfolgreich durchgeführt.
      </div>
      <br>
      <div class="confirmButton">
        <b-button @click="closeModal" variant="success">OK</b-button>
      </div>
    </b-modal>
  </template>
  
  <script setup>
import { ref, defineEmits, defineProps } from 'vue';

const showConfirmation = ref(false);
const emit = defineEmits();

  const props = defineProps({
    showConfirmation: Boolean,
  });
  
  const closeModal = () => {
    emit('update:showConfirmation', false);
  };
  </script>
  
  <style scoped>
  .confirmButton {
    display: flex;
    justify-content: center;
  }
  </style>
  