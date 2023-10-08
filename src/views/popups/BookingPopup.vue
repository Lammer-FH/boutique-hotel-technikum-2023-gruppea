<template>
  <b-modal id="booking-modal" v-model="showModal">
    <template #modal-title>
      Zimmer Buchung
    </template>

    <b-form @submit.prevent="submitBookingForm">
      <div v-for="i in totalGuests" :key="i">
        <b-row>
          <b-col md="6">
            <b-form-group :label="`Vorname (Gast ${i})`">
              <b-form-input type="text" required></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group :label="`Nachname (Gast ${i})`">
              <b-form-input type="text" required></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
      </div>

      <b-form-group label="E-Mail Adresse">
        <b-form-input type="email" required></b-form-input>
      </b-form-group>
      <b-form-group label="E-Mail Adresse bestätigen">
        <b-form-input type="email" required></b-form-input>
      </b-form-group>

      <b-form-group label="Frühstück">
        <b-form-radio value="Ja">Ja</b-form-radio>
        <b-form-radio value="Nein">Nein</b-form-radio>
      </b-form-group>

      <b-button type="submit" variant="success">Bestätigen</b-button>
    </b-form>
    <!-- Schließe das b-form-Element hier -->
  </b-modal>
</template>

<script setup>
import { ref, defineProps } from 'vue';

// Definiere Props für den Popup
const props = defineProps({
  isOpen: Boolean,
  adults: Number,
  children: Number
});

// Erhalte die Anzahl der Gäste
const totalGuests = computed(() => {
  const total = parseInt(props.adults, 10) + parseInt(props.children, 10);
  console.log("Total Guests:", total);
  return total >= 0 ? total : 0; // Stelle sicher, dass die Anzahl der Gäste nicht negativ ist
});

function submitBookingForm() {
  // Deine Logik hier
}
</script>

<style scoped>
  /* Popup-spezifische Styles */
</style>
