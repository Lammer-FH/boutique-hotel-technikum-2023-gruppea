<template>
  <b-row class="row1">
    <b-col>
      <h1>Hotelbuchung</h1>
    </b-col>
  </b-row>

  <b-row>
    <b-col md="6" id="booking">
      <div class="booking-search">
        <b-form @submit.prevent="submitForm">
          <b-row>
            <!-- Check-in Datum -->
            <b-col md="6">
              <b-form-group label="Check-in Datum:" label-for="checkIn">
                <b-form-input type="date" id="checkIn" v-model="checkIn" required></b-form-input>
              </b-form-group>
            </b-col>

            <!-- Check-out Datum -->
            <b-col md="6" class="test">
              <b-form-group label="Check-out Datum:" label-for="checkOut">
                <b-form-input type="date" id="checkOut" v-model="checkOut" required></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col md="6">
              <div>
                <div>Erwachsene (über 12 Jahre):</div>
                <div><b-form-input type="number" id="adults" v-model="adults" min="1" required></b-form-input></div>
              </div>
            </b-col>
            <b-col md="6">
              <div>
                <div>Angerhörige (unter 12 Jahre):</div>
                <div><b-form-input type="number" id="children" v-model="children" min="0" required></b-form-input></div>
              </div>
            </b-col>
          </b-row>

          <b-form-group class="mt-3" label="Zimmerauswahl:" label-for="room">
            <b-form-select id="room" v-model="selectedRoom" :options="roomOptions"
              @change="updateRoomExtras"></b-form-select>
          </b-form-group>
          <b-button type="submit" variant="primary">Buchen</b-button>
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
              <!-- Erhalten des Schlüssels (extraName) aus extraObj -->
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

const bookedRooms = ref([]); // Liste der gebuchten Zimmer

async function fetchBookingsForDate(date) {
  try {
    const response = await axios.get(`https://boutique-hotel.helmuth-lammer.at/api/v1/bookings?date=${date}`);
    bookedRooms.value = response.data.map(booking => booking.room_id);
  } catch (error) {
    console.error('Fehler beim Abrufen der Buchungsdaten:', error);
  }
}

const roomOptions = computed(() => {
  const availableRooms = rooms.value.filter(room => !bookedRooms.value.includes(room.id));
  return [
    { text: 'Wählen Sie ein Zimmer', value: null },
    ...availableRooms.map(room => ({
      value: room.id,
      text: `${room.roomsName.replace('Default ', '')} - ${room.pricePerNight} € pro Nacht`,
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

function updateRoomExtras() {


  if (selectedRoom.value) {
    const selected = rooms.value.find(room => room.id === selectedRoom.value);
    selectedRoomExtras.value = [];
    if (selected && selected.extras) {
      for (const extra of selected.extras) {
        const [key, value] = Object.entries(extra)[0];
        // Überprüfen Sie, ob der Wert 1 ist, bevor Sie den Schlüssel speichern
        if (value === 1) {
          selectedRoomExtras.value.push({ [key]: value }); // Store the key-value pair if value is 1
        }
      }
    }
  } else {
    selectedRoomExtras.value = [];
  }
}

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

watch(selectedRoom, () => {
  updateRoomExtras();
});

watch(checkIn, () => {
  fetchBookingsForDate(checkIn.value);
});

watch(checkOut, () => {
  fetchBookingsForDate(checkOut.value);
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

.tooltip-text {
  visibility: hidden;
  background-color: rgba(128, 128, 128, 0.202);
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 10px;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -60px;
  opacity: 0;
  transition: opacity 0.3s;
}

.room-extras {
  position: relative;
  bottom: 57px;
  left: 0%;
  transform: translateX(0%);
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  gap: 17px;
  width: 347px;
  font-size: 24px !important;
  /* oder eine andere gewünschte Größe */
}

.room-extras i:hover {
  color: rgba(255, 255, 255, 0.900) !important;
  /* Eine dunklere Schattierung von #4382e2 */
}

.icon-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
  position: relative;
  color: rgba(255, 255, 255, 0.600);
}

ol,
ul {
  padding-left: 0rem;
}

ol,
ul,
dl {
  margin-top: 15px;
  margin-bottom: 1rem;
  padding: 1%;
  display: flex;
  align-items: center;
}


l[data-v-2dd5deba],
ul[data-v-2dd5deba],
dl[data-v-2dd5deba] {
  margin-top: 15px;
  margin-bottom: 1rem;
  padding: 0 0 7px 9px;
  display: flex;
  align-items: center;
  justify-content: start;
}

.row {
  margin-top: 5%;
  margin-bottom: 1%;
}

.btn {
  position: relative;
  object-fit: cover;
  /* font-size: 100px; */
  width: -webkit-fill-available;
}

.booking-search {
  width: -webkit-fill-available;
  box-sizing: border-box;
  /*eine kleine rand um die box*/
  border: 1px solid #9bb8e5;
  border-radius: 10px;
  padding: 2%;
}

img {
  border-radius: 10px;
  background: rgba(9, 9, 9, 0.45);
  width: 100% !important;
  height: 442px;
  flex-shrink: 0;
  object-fit: cover;
}

div#imgId {
  margin-top: inherit;
}

/**********  @media **********/

@media (min-width: 1025px) {

  img {
    height: 358.53px;
    object-fit: cover;
  }

  .room-extras {
    position: relative;
    bottom: 69px;
    left: 4%;
    transform: translateX(0%);
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    gap: 26px !important;
    width: 452px;
    font-size: 200% !important;
  }


  div#imgId {
    margin-top: 0;
  }

  .booking-search {
    width: -webkit-fill-available;
    box-sizing: border-box;
    /*eine kleine rand um die box*/
    border: 1px solid #9bb8e5;
    padding: 2%;
  }

  .room-extras {
    justify-content: space-evenly;
    gap: 20px;
    flex-wrap: wrap;
    list-style: none;
    padding-left: 0;
    margin-top: 12px;
    margin-bottom: 1rem;
    padding: 1%;
    display: flex;
    align-items: center;
  }
}

@media (max-width: 1024px) {
  img {
    height: 377.16px;
    object-fit: cover;
  }

  div#imgId {
    margin-top: 0;
  }

  .booking-search {
    width: -webkit-fill-available;
    box-sizing: border-box;
    /*eine kleine rand um die box*/
    border: 1px solid #9bb8e5;
    padding: 2%;
  }

  .room-extras {
    position: relative;
    bottom: 69px;
    left: 1%;
    transform: translateX(0%);
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    gap: 26px !important;
    width: 452px;
    font-size: 120% !important;

  }
}

@media (max-width: 768px) {
  #app {
    max-width: 1280px;
    margin: 0px 20px 0px 20px;
    padding: 2rem;
    font-weight: normal;
  }

  .booking-search {
    width: -webkit-fill-available;
    box-sizing: border-box;
    /*eine kleine rand um die box*/
    border: 1px solid #9bb8e5;
    padding: 2%;
  }

  img {
    border-radius: 10px;
    background: rgba(9, 9, 9, 0.45);
    /* width: 330px !important; */
    height: 360.03px;
    flex-shrink: 0;
    width: 100% !important;
  }

  .room-extras {
    position: relative;
    bottom: 59px;
    left: 8%;
    transform: translateX(0%);
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    gap: 14px !important;
    width: 442px;
    font-size: 120% !important;
  }
}

@media (max-width: 480px) {
  .booking-search {
    width: -webkit-fill-available;
    margin-bottom: 3%;
    padding: 2%;
  }

  img {
    border-radius: 10px;
    background: rgba(9, 9, 9, 0.45);
    /* width: 330px !important; */
    height: 442px;
    flex-shrink: 0;
    width: 100% !important;
  }

  .room-extras {
    position: relative;
    bottom: 66px;
    left: 4%;
    transform: translateX(0%);
    display: flex;
    flex-wrap: wrap;
    gap: 19px !important;
    width: 416px;
    font-size: 133% !important;
  }
}
</style>
