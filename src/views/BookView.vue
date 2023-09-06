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
        <b-form-select id="room" v-model="selectedRoom" :options="roomOptions"></b-form-select>
      </b-form-group>

      <b-button type="submit" variant="primary">Buchen</b-button>
    </b-form>
  </div>
  
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios'; // Vergewissern Sie sich, dass axios in Ihrem Projekt installiert ist

function getTodayDate() {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // Januar ist 0!
  const yyyy = today.getFullYear();

  return `${yyyy}-${mm}-${dd}`;
}

const checkIn = ref(getTodayDate());
const checkOut = ref(getTodayDate()+1);
const persons = ref(1);
const rooms = ref([]); // Ein leeres Array für die Zimmerdaten
const selectedRoom = ref(null); // Wird später aktualisiert

async function fetchRooms() {
  try {
    const response = await axios.get('https://boutique-hotel.helmuth-lammer.at/api/v1/rooms');
    rooms.value = response.data;
    selectedRoom.value = rooms.value[0]?.id; // Setzen Sie das erste Zimmer als Standardauswahl
  } catch (error) {
    console.error('Fehler beim Abrufen der Zimmerdaten:', error);
  }
}

onMounted(() => {
  fetchRooms(); // Zimmerdaten beim Laden der Komponente abrufen
});

const roomOptions = computed(() => {
  return rooms.value.map(room => ({
    value: room.id,
    text: `${room.roomsName} - ${room.pricePerNight} € pro Nacht`,
  }));
});

function submitForm() {
  const bookingDetails = {
    checkIn: checkIn.value,
    checkOut: checkOut.value,
    persons: persons.value,
    room: rooms.value.find(room => room.id === selectedRoom.value),
  };

  console.log('Ihre Buchungsdetails:', bookingDetails);
  // Fügen Sie hier den Code für die API-Anfrage oder andere Aktionen ein
}
</script>
