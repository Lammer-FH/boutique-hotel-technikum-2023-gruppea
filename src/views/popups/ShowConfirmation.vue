<template>
  <b-modal :model-value="showConfirmation" @update:modelValue="$emit('update:showConfirmation', $event)" hide-footer>
    <template #modal-title>
      Buchung erfolgreich
    </template>
    <div class="buchungErfolgreich">
      Deine Buchung wurde erfolgreich durchgeführt.
    </div>
    <div class="bookingDetails">
      <div>
        Check-in: {{ props.checkIn }}
        <br>
        Check-out: {{ props.checkOut }}
        <br>
        Zimmer: {{ props.selectedRoom }}
      </div>
      <div v-for="(guest, i) in props.guestDetails" :key="i">
        {{ `Gast ${i + 1}: ${guest.firstName} ${guest.lastName}, Geburtstag: ${guest.birthday}` }}
      </div>
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
  checkIn: String,
  checkOut: String,
  selectedRoom: [String, Number],
  guestDetails: Array
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

.buchungErfolgreich {
  display: flex;
  justify-content: center;
  color: aliceblue;
  border: 1px solid #f3494cda;
  border-radius: 5px;
  background-color: #f3494cda;
  padding: 10px;
  margin-bottom: 20px;
}

.bookingDetails {
  display: flex;
  justify-content: center;
  flex-direction: column;
  border: 1px solid #9bb8e5;
  border-radius: 5px;
  background-color: #9bb8e5;
  padding: 10px;
  color: #343a40;
}
</style>
  