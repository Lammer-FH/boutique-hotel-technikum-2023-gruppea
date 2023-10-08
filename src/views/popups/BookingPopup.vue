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
          </b-modal>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  const showModal = ref(false);
  const adults = ref(1);
  const children = ref(0);
  import roomsData from '../rooms.json';
  
  const totalGuests = computed(() => {
  const total = parseInt(adults.value, 10) + parseInt(children.value, 10);
  console.log("Total Guests:", total);
  return total;
});


function submitBookingForm() {
  // Deine Logik hier
}

// Fetch rooms data from local JSON instead of API
function fetchRooms() {
  try {
    rooms.value = roomsData;
    selectedRoom.value = rooms.value[0]?.id || null;
    updateRoomExtras();
  } catch (error) {
    console.error('Fehler beim Abrufen der Zimmerdaten:', error);
  }
}

onMounted(() => {
  fetchRooms();
});
  </script>
  
  <style scoped>
    /* Popup-spezifische Styles */
  </style>
  