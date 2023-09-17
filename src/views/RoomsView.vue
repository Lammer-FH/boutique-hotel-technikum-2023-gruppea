<template>
  <div class="container mt-5">
    <div class="rooms">
      <h1 class="text-center">Find Out what kind of room you prefer!</h1>
      <div class="room-grid">
        <div v-for="room in firstFiveRooms" :key="room.id" class="room-box">
          <div class="room-info">
            Room {{ room.roomsNumber }}<br>
            {{ room.roomsName.replace('Default ', '') }}
          </div>
          <img :src="`src/images/rooms/${room.roomsNumber}.jpg`" alt="Room Image" class="room-image">
          <div class="room-description">
            {{ getDescription(room.roomsName) }}
          </div>
          <div class="room-extras">
            <i v-for="extraObj in room.extras" :key="extraObj">
              <button class="icon-button">
                <i v-if="extraToIcon(extraObj)" :class="`bi bi-${extraToIcon(extraObj)}`"></i>
                <span class="tooltip-text">{{ Object.keys(extraObj)[0] }}</span>
              </button>
            </i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import 'bootstrap-icons/font/bootstrap-icons.css'; // Stil für die Icons
import { ref, onMounted } from 'vue';
import axios from 'axios';

const rooms = ref([]);
const firstFiveRooms = ref([]);

const fetchRooms = async () => {
  try {
    const response = await axios.get('https://boutique-hotel.helmuth-lammer.at/api/v1/rooms');
    rooms.value = response.data;
    firstFiveRooms.value = rooms.value.slice(0, 5);
  } catch (error) {
    console.error('Error fetching rooms:', error);
  }
};

const getDescription = (name) => {
  if (name === "Double Bedroom") {
    return "Das Genießerzimmer für Paare im großzügigen Doppelbett";
  } else if (name === "Single Bedroom") {
    return "Das perfekte Zimmer für Alleinreisende";
  } else if (name === "Suite") {
    return "Luxuriöser Raum für diejenigen, die das Beste wollen";
  } else {
    return "Ein komfortables Zimmer, perfekt für Ihren Aufenthalt";
  }
};

const extraToIcon = (extraName) => {
  const mapping = {
    "bathroom": "house-door",
    "minibar": "cup",
    "television": "tv",
    "livingroom": "minecart",
    "aircondition": "thermometer-high",
    "wifi": "wifi",
    "breakfast": "egg-fried",
    "handicapped accessible": "person-wheelchair"
  };
  const key = Object.keys(extraName)[0];
  return mapping[key] || "bi-question";
};

onMounted(() => {
  fetchRooms();
});
</script>

<style scoped>
.room-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.text-center {
  text-align: center;
}

.room-info,
.room-description {
  text-align: center;
  /* Zentriert den Text */
  width: 100%;
  /* Nimmt die gesamte verfügbare Breite ein */
}

.room-extras i {
  font-size: 24px;
  margin: 0 5px;
}

.room-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.room-box {
  flex: 1;
  min-width: calc(20% - 16px);
  /* Ändern Sie die Prozentsätze je nach Anzahl der sichtbaren room-boxes */
  max-width: 100%;
  box-sizing: border-box;
}

@media (min-width: 1025px) {
  .room-box {
    min-width: calc(20% - 16px);
    /* Anzahl der sichtbaren room-boxes ändern */
  }
}

@media (max-width: 1024px) {
  .room-box {
    min-width: calc(33.33% - 16px);
    /* Anzahl der sichtbaren room-boxes ändern */
  }
}

@media (max-width: 768px) {
  .room-box {
    min-width: calc(50% - 16px);
    /* Anzahl der sichtbaren room-boxes ändern */
  }
}

@media (max-width: 480px) {
  .room-box {
    min-width: 100%;
    /* Zeigen Sie alle room-boxes an */
  }
}
</style>
