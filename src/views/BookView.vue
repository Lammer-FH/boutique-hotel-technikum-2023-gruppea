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

      <b-row>
        <b-col md="6">
          <div>
            <div>Erwachsene (über 12 Jahre):</div>
            <div><b-form-input type="number" id="adults" v-model="adults" min="1" required></b-form-input></div>
          </div>
        </b-col>
        <b-col md="6">
          <div>
            <div>Kinder (unter 12 Jahre):</div>
            <div><b-form-input type="number" id="children" v-model="children" min="0" required></b-form-input></div>
          </div>
        </b-col>
      </b-row>

      <b-form-group label="Zimmerauswahl:" label-for="room">
        <b-form-select id="room" v-model="selectedRoom" :options="roomOptions" @change="updateRoomExtras"></b-form-select>
      </b-form-group>

      <div v-if="selectedRoomExtras.length > 0">
        <h3>Extra Eigenschaften</h3>
        <ul class="icon-list">
          <li v-for="extra in selectedRoomExtras" :key="extra">
            <button class="icon-button">
              <i v-if="extraToIcon(extra)" :class="`bi bi-${extraToIcon(extra)}`"></i>
              <span class="tooltip-text">{{ extra }}</span>
            </button>
          </li>
        </ul>
      </div>

      <b-button type="submit" variant="primary">Buchen</b-button>
    </b-form>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { } from 'vue';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Stil für die Icons
import axios from 'axios';

const checkIn = ref(new Date().toISOString().split('T')[0]);
const checkOut = ref(new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
const adults = ref(1);
const children = ref(0);
const rooms = ref([]);
const selectedRoom = ref(null);
const selectedRoomExtras = ref([]);

async function fetchRooms() {
  try {
    const response = await axios.get('https://boutique-hotel.helmuth-lammer.at/api/v1/rooms');
    rooms.value = response.data;
    selectedRoom.value = rooms.value[0]?.id || null;  // Setzen Sie das erste Zimmer als Standardauswahl
    updateRoomExtras();  // Aktualisieren Sie die Zimmer-Extras basierend auf dem ausgewählten Zimmer
  } catch (error) {
    console.error('Fehler beim Abrufen der Zimmerdaten:', error);
  }
}

function updateRoomExtras() {
  if (selectedRoom.value) {
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
  } else {
    selectedRoomExtras.value = [];
  }
}


const roomOptions = computed(() => {
  return [
    { text: 'Wählen Sie ein Zimmer', value: null },
    ...rooms.value.map(room => ({
      value: room.id,
      text: `${room.roomsName} - ${room.pricePerNight} € pro Nacht`,
    }))
  ];
});

const validExtras = computed(() => {
  return selectedRoomExtras.value.filter(extra => extraToIcon(extra));
});

function submitForm() {
  const selectedRoomDetails = rooms.value.find(room => room.id === selectedRoom.value);
  const numberOfNights = (new Date(checkOut.value) - new Date(checkIn.value)) / (24 * 60 * 60 * 1000);
  const totalPrice = numberOfNights * selectedRoomDetails.pricePerNight * (adults.value + children.value * 0.5); // Angenommen Kinder kosten 50% des Erwachsenenpreises

  let bookingMessage = `Sie haben das Zimmer ${selectedRoomDetails.roomsName} gebucht.\n`;
  bookingMessage += `Anzahl der Erwachsenen: ${adults.value}\n`;

  if (children.value > 0) {
    bookingMessage += `Anzahl der Kinder: ${children.value}\n`;
  }

  bookingMessage += `Gesamtpreis: ${totalPrice} €`;

  console.log('Ihre Buchungsdetails:', bookingMessage);
  alert(bookingMessage);  // Zeigt eine Popup-Nachricht mit den Buchungsdetails
}

function extraToIcon(extraName) {
  const mapping = {
    "bathroom": "house-door",
    "minibar": "cup",
    "television": "tv",
    "livingroom": "couch",
    "aircondition": "thermometer-high",
    "wifi": "wifi",
    "breakfast": "egg-fried",
    "handicapped accessible": "wheelchair"
  };
  return mapping[extraName] || null;
}


watch(selectedRoom, () => {
  updateRoomExtras();
});

onMounted(() => {
  fetchRooms();
  updateRoomExtras();
});
</script>