<template>
   <div class="hero-section">
      <div class="hero-content">
        <h1 class="smaller-heading">Zimmer buchen</h1>
      </div>
   </div>

  <b-row>
    <b-col md="6" id="booking">
      <div class="booking-search">
        <b-form>
          <!-- Check-in Datum -->
          <b-form-group label="Check-in Datum:" label-for="checkIn">
            <b-form-input type="date" id="checkIn" v-model="checkIn" required></b-form-input>
          </b-form-group>
          <!-- Check-out Datum -->
          <b-form-group label="Check-out Datum:" label-for="checkOut">
            <b-form-input type="date" id="checkOut" v-model="checkOut" required></b-form-input>
          </b-form-group>
          <div>
            <div>Erwachsene (über 12 Jahre):</div>
            <div><b-form-input type="number" id="adults" v-model="adults" min="1" required></b-form-input></div>
          </div>
          <div>
            <div>Angerhörige (unter 12 Jahre):</div>
            <div><b-form-input type="number" id="children" v-model="children" min="0" required></b-form-input></div>
          </div>
          <b-form-group class="mt-3" label="Zimmerauswahl:" label-for="room">
            <b-form-select id="room" v-model="selectedRoom" :options="roomOptions"
              @change="updateRoomExtras"></b-form-select>
          </b-form-group>

          <!-- Button für das Popup eingefügt -->
          <b-button @click="bookRoom" variant="primary">Buchen</b-button>
          <BookingPopup v-model="showModal" :hideModal="hideModal" :numberOfAdults="adults" :numberOfChildren="children" :checkIn="checkIn"
            :checkOut="checkOut" :selectedRoom="selectedRoomName" />
          <!-- Adults: {{ adults }}
          Children: {{ children }} -->
        </b-form>
      </div>
    </b-col>

    <b-col md="6" id="imgId">
      <div v-if="selectedRoomExtras.length > 0">
        <div>
          <div v-if="selectedRoomImagePath">
            <img :src="selectedRoomImagePath" alt="Selected Room Image" class="room-image" />
          </div>
        </div>
        <ul class="room-extras">
          <li v-for="extraObj in selectedRoomExtras" :key="Object.keys(extraObj)[0]">
            <span class="tooltip-text">{{ Object.keys(extraObj)[0] }}</span>
            <button class="icon-button">
              <template v-if="Object.keys(extraObj).length > 0">
                <template v-if="extraToIcon(Object.keys(extraObj)[0]).library === 'fa'">
                  <i :class="extraToIcon(Object.keys(extraObj)[0]).icon"></i>
                </template>
                <template v-else-if="extraToIcon(Object.keys(extraObj)[0]).library === 'bi'">
                  <i :class="extraToIcon(Object.keys(extraObj)[0]).icon"></i>
                </template>
              </template>
              <span class="tooltip-text">{{ Object.keys(extraObj)[0] }}</span>
            </button>
          </li>
        </ul>
      </div>
    </b-col>
  </b-row>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';
import bookingsData from '../bookings.json';
import roomsData from '../rooms.json';
import BookingPopup from './popups/BookingPopup.vue';

const showModal = ref(false);
const checkIn = ref(new Date().toISOString().split('T')[0]);
const checkOut = ref(new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
const rooms = ref([]);
const selectedRoom = ref(null);
const selectedRoomExtras = ref([]);
const adults = ref(1);
const children = ref(0);

const bookRoom = () => {
  showModal.value = true;
}

const selectedRoomDetails = computed(() => {
  return rooms.value.find(room => room.id === selectedRoom.value);
});

const selectedRoomName = computed(() => {
  return selectedRoomDetails.value ? selectedRoomDetails.value.roomsName.replace('Default ', '') : null;
});

function getDatesBetween(startDate, endDate) {
  const dates = [];
  let currentDate = new Date(startDate);
  const stopDate = new Date(endDate);
  while (currentDate <= stopDate) {
    dates.push(new Date(currentDate).toISOString().split('T')[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
}

function getBookedRoomsForPeriod(start, end) {
  const dates = getDatesBetween(start, end);
  const allBookedRooms = bookingsData
    .filter(booking => dates.includes(booking.from))
    .map(booking => booking.rooms_id);
  return [...new Set(allBookedRooms)];
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

// async function fetchRooms() {
//   try {
//     const response = await axios.get('https://boutique-hotel.helmuth-lammer.at/api/v1/rooms');
//     rooms.value = response.data;
//     selectedRoom.value = rooms.value[0]?.id || null;  
//     updateRoomExtras(); 
//   } catch (error) {
//     console.error('Fehler beim Abrufen der Zimmerdaten:', error);
//   }
// }

const bookedRooms = ref([]);
const roomOptions = computed(() => {
  const availableRooms = rooms.value.filter(room => !bookedRooms.value.includes(room.id));
  return [
    { text: 'Wählen Sie ein Zimmer', value: null },
    ...availableRooms.map(room => ({
      value: room.id,
      text: `${room.roomsNumber ? room.roomsNumber + ' - ' : ''}${room.roomsName.replace('Default ', '')} - ${room.pricePerNight} € pro Nacht`,
    }))
  ];
});

const selectedRoomImagePath = computed(() => {
  if (selectedRoom.value) {
    const selectedRoomDetails = rooms.value.find(room => room.id === selectedRoom.value);
    if (selectedRoomDetails && selectedRoomDetails.roomsNumber) {
      return `src/images/rooms/${selectedRoomDetails.roomsNumber}.jpg`;
    }
  }
  return null;
});

function hideModal() {
  showModal.value = !showModal.value;
}
function updateRoomExtras() {
  if (selectedRoom.value) {
    const selected = rooms.value.find(room => room.id === selectedRoom.value);
    selectedRoomExtras.value = [];
    if (selected && selected.extras) {
      for (const extra of selected.extras) {
        const [key, value] = Object.entries(extra)[0];
        if (value === 1) {
          selectedRoomExtras.value.push({ [key]: value });
        }
      }
    }
  } else {
    selectedRoomExtras.value = [];
  }
}

const EXTRAS = {
  BATHROOM: "bathroom",
  MINIBAR: "minibar",
  TELEVISION: "television",
  LIVINGROOM: "livingroom",
  AIRCONDITION: "aircondition",
  WIFI: "wifi",
  BREAKFAST: "breakfast",
  HANDICAPPED_ACCESSIBLE: "handicapped accessible"
};
function extraToIcon(extraName) {
  const mapping = {
    [EXTRAS.BATHROOM]: { library: 'fa', icon: 'fa fa-bath' },
    [EXTRAS.MINIBAR]: { library: 'fa', icon: 'fa-solid fa-wine-glass' },
    [EXTRAS.TELEVISION]: { library: 'bi', icon: 'bi-tv' },
    [EXTRAS.LIVINGROOM]: { library: 'fa', icon: 'fa-solid fa-couch' },
    [EXTRAS.AIRCONDITION]: { library: 'fa', icon: 'fa-solid fa-fan' },
    [EXTRAS.WIFI]: { library: 'bi', icon: 'bi-wifi' },
    [EXTRAS.BREAKFAST]: { library: 'fa', icon: 'fa-solid fa-mug-saucer' },
    [EXTRAS.HANDICAPPED_ACCESSIBLE]: { library: 'bi', icon: 'bi-person-wheelchair' }
  };
  return mapping[extraName] || { library: 'bi', icon: 'bi-question' };
}

watch([checkIn, checkOut], () => {
  bookedRooms.value = getBookedRoomsForPeriod(checkIn.value, checkOut.value);
});
watch(checkIn, () => {
  checkOut.value = checkIn.value;
});
watch(selectedRoom, () => {
  updateRoomExtras();
});
onMounted(() => {
  fetchRooms();
  updateRoomExtras();
});

</script>

<style scoped>
.room-image-container {
  position: relative;
}

.btn {
  width: -webkit-fill-available;
}

.booking-search {
  box-sizing: border-box;
  border: 1px solid #9bb8e5;
  border-radius: 10px;
  padding: 2%;
  width: -webkit-fill-available;
}

img {
  border-radius: 10px;
  width: -webkit-fill-available;
  height: 460px;
  object-fit: cover;
  border: 1px solid #9bb8e5;
  /* padding: 2%; */
}

.room-extras {
  position: relative;
  bottom: 50px;
  display: flex;
  /* flex-wrap: nowrap; */
  justify-content: space-between;
  /* gap: 0px; */
  /* width: 0px; */
  font-size: 30px;
  align-items: center;
  align-content: center;
  flex-direction: row;
  /* padding-bottom: 3rem; */
  padding-right: 2rem;
}

.room-extras i:hover {
  color: rgba(255, 255, 255, 0.900) !important;
}

.icon-button {
  color: rgba(255, 255, 255, 0.550);
}

.row {
  --bs-gutter-x: 1.5rem;
  --bs-gutter-y: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  margin-top: calc(-1 * var(--bs-gutter-y));
  margin-right: calc(-0.5 * var(--bs-gutter-x));
  margin-left: calc(-0.5 * var(--bs-gutter-x));
}

@media (min-width: 1025px) {
  .row {
    width: 100vw;
    max-width: min(calc(100vw - 20px), 1040px);
  }
}

@media (max-width: 1024px) {}

@media (max-width: 768px) {}

@media (max-width: 480px) {
  .room-extras {
    font-size: 20px;
  }
}

@media (max-width: 350px) {
  .room-extras {
    font-size: 15px;
  }
}
.smaller-heading {
  font-size: 2rem;
  padding: 0 10px;
  text-align: center;
}
</style>