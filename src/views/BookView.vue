<template>
  <div class="container mt-5">
    <b-row>
      <b-col>
        <h1>Hotelbuchung</h1>
      </b-col>
    </b-row>
    <b-form @submit.prevent="submitForm">
      <b-form-group label="Check-in Datum:" label-for="checkIn">
        <b-form-input type="date" id="checkIn" v-model="checkIn" required></b-form-input>
      </b-form-group>

      <b-form-group label="Check-out Datum:" label-for="checkOut">
        <b-form-input type="date" id="checkOut" v-model="checkOut" required></b-form-input>
      </b-form-group>

      <b-form-group label="Anzahl der Personen:" label-for="persons">
        <b-form-input type="number" id="persons" v-model="persons" min="1" required></b-form-input>
      </b-form-group>

      <b-form-group label="Zimmerauswahl:" label-for="room">
        <b-form-select id="room" v-model="selectedRoom" :options="roomOptions" @change="updateRoomExtras"></b-form-select>
      </b-form-group>

      <div v-if="selectedRoomExtras.length > 0">
        <h3>Ausgewählte Zimmer-Eigenschaften:</h3>
        <ul>
          <li v-for="extra in selectedRoomExtras" :key="extra">{{ extra }}</li>
        </ul>
      </div>

      <b-button type="submit" variant="primary">Buchen</b-button>
    </b-form>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

// Initialize ref variables
const checkIn = ref(new Date().toISOString().split('T')[0]);  // Current Date
const checkOut = ref(new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]); // Next Day
const persons = ref(1);
const rooms = ref([]);
const selectedRoom = ref(null);
const selectedRoomExtras = ref([]);

async function fetchRooms() {
  try {
    const response = await axios.get('https://boutique-hotel.helmuth-lammer.at/api/v1/rooms');
    rooms.value = response.data;
    selectedRoom.value = rooms.value[0]?.id;
  } catch (error) {
    console.error('Fehler beim Abrufen der Zimmerdaten:', error);
  }
}

const roomOptions = computed(() => {
  return rooms.value.map(room => ({
    value: room.id,
    text: `${room.roomsName} - ${room.pricePerNight} € pro Nacht`,
  }));
});

function updateRoomExtras() {
  const selected = rooms.value.find(room => room.id === selectedRoom.value);
  selectedRoomExtras.value = [];

  if (selected && selected.extras) {
    for (const extra of selected.extras) {
      const [key, value] = Object.entries(extra)[0];
      if (value === 1) {
        selectedRoomExtras.value.push(key);
      }
    }
  }
}

function submitForm() {
  const bookingDetails = {
    checkIn: checkIn.value,
    checkOut: checkOut.value,
    persons: persons.value,
    room: rooms.value.find(room => room.id === selectedRoom.value),
  };

  console.log('Ihre Buchungsdetails:', bookingDetails);
}

onMounted(() => {
  fetchRooms();
  updateRoomExtras();
});
</script>

<style>
/* Benutzerdefinierte CSS-Regel, um die Schriftfarbe der ausgewählten Option zu ändern */
.select-selected {
  color: rgba(0, 0, 0, 0.5);
}
</style>
