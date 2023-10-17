<!-- RoomsView.vue -->
<template>
  <div class="container mt-5">
    <div class="rooms">
      <h1 class="text-center">Find Out What Kind of Room You Prefer!</h1>
      <div class="room-grid">
        <div v-for="room in firstFiveRooms" :key="room.id" class="room-box">
          <div class="room-info">
            Room {{ room.roomsNumber }}<br />
            {{ room.roomsName.replace("Default ", "") }}
          </div>
          <img :src="`src/images/rooms/${room.roomsNumber}.jpg`" alt="Room Image" class="room-image"
            @click="togglePopup(`src/images/rooms/${room.roomsNumber}.jpg`)" />
          <div class="room-description">
            {{ getDescription(room.roomsName) }}
          </div>
          <RoomExtrasIcons :roomExtras="filterExtras(room.extras)" />

        </div>
        <div class="load-more-container">
          <button @click="loadMoreRooms" v-if="firstFiveRooms.length < rooms.length" class="btn btn-primary">
            Mehr Zimmer anzeigen
          </button>
        </div>
      </div>
    </div>
    <div v-if="showPopup" class="image-popup" @click="togglePopup('')">
      <img :src="popupImageSrc" alt="Popup Image" class="room-image" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import RoomExtrasIcons from '@/components/RoomExtrasIcons.vue';

const showPopup = ref(false);
const popupImageSrc = ref("");

const togglePopup = (imageSrc) => {
  showPopup.value = !showPopup.value;
  popupImageSrc.value = imageSrc;
};

const ROOM_TYPES = {
  DOUBLE_BEDROOM: "Double Bedroom",
  SINGLE_BEDROOM: "Single Bedroom",
  SUITE: "Suite",
};

const filterExtras = (extras) => {
  return extras.filter((extra) => {
    const key = Object.keys(extra)[0];
    return extra[key] === 1;
  });
};

const rooms = ref([]);
const firstFiveRooms = ref([]);

const loadMoreRooms = () => {
  const currentLength = firstFiveRooms.value.length;
  const newRooms = rooms.value.slice(currentLength, currentLength + 5);
  firstFiveRooms.value = [...firstFiveRooms.value, ...newRooms];
};

const fetchRooms = async () => {
  try {
    const response = await axios.get(
      "https://boutique-hotel.helmuth-lammer.at/api/v1/rooms"
    );
    rooms.value = response.data;
    firstFiveRooms.value = rooms.value.slice(0, 5);
  } catch (error) {
    console.error("Error fetching rooms:", error);
  }
};

const getDescription = (name) => {
  if (name.includes(ROOM_TYPES.DOUBLE_BEDROOM)) {
    return "Das Genießerzimmer für Paare im großzügigen Doppelbett";
  } else if (name.includes(ROOM_TYPES.SINGLE_BEDROOM)) {
    return "Das perfekte Zimmer für Alleinreisende";
  } else if (name.includes(ROOM_TYPES.SUITE)) {
    return "Luxuriöser Raum für diejenigen, die das Beste wollen";
  } else {
    return "Ein komfortables Zimmer, perfekt für Ihren Aufenthalt";
  }
};

onMounted(() => {
  fetchRooms();
});
</script>

<style scoped>
.image-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.image-popup img {
  max-width: 90%;
  max-height: 90%;
  height: inherit;
  width: auto;
  border: 1px solid #9bb8e5;
  border-radius: 5px;
  padding: 2%;
}

.image-popup .room-image {
  max-width: 90%;
  max-height: 90%;
  height: auto;
  width: auto;
  border: 1px solid #9bb8e5;
  border-radius: 5px;
  padding: 2%;
  border-radius: 10px;
}

.room-box .room-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
}


.text-center {
  text-align: center;
  margin: 0 0 32px 0;
}

.room-info {
  text-align: -webkit-left;
  width: 100%;
  margin: 0 0 10px 0;
}

.room-description {
  text-align: -webkit-left;
  width: 100%;
  min-height: 80px;
  margin: 8px 0;
}

/* .room-extras i {
  font-size: 24px;
  margin: 0 5px;
  color: #4382e2e4;
  text-align: -webkit-center;
  transition: color 0.3s;
}

.room-extras i:hover {
  color: #2a66c9;
}

.room-extras {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  flex-grow: 1;
  align-items: baseline;
} */

.room-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.room-box {
  flex: 1;
  min-width: calc(20% - 16px);
  max-width: 100%;
  box-sizing: border-box;
  border: 1px solid #9bb8e5;
  border-radius: 5px;
  padding: 2%;
}

@media (min-width: 1025px) {
  .room-box {
    min-width: calc(20% - 16px);
    padding: 1%;
  }
}

@media (max-width: 1024px) {
  .room-box {
    min-width: calc(33.33% - 16px);
  }
}

@media (max-width: 768px) {
  .room-box {
    min-width: calc(50% - 16px);
  }
}

@media (max-width: 480px) {
  .room-box {
    min-width: 100%;
    padding: 3%;
  }
}

.load-more-container {
  flex: 1;
  min-width: calc(20% - 16px);
  max-width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
}

.tooltip-text {
  visibility: hidden;
  background-color: #555;
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
  font-size: small;
}
</style>