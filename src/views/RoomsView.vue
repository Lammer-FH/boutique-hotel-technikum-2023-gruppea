<template>
  <div class="container mt-5">
    <div class="rooms">
      <h1 class="text-center">Find Out What Kind of Room You Prefer!</h1>
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
            <i v-for="extraObj in filterExtras(room.extras)" :key="Object.keys(extraObj)[0]">
              <span class="tooltip-text">{{ Object.keys(extraObj)[0] }}</span>
              <button class="icon-button">
                <!-- Für Font Awesome Icons -->
                <i v-if="extraToIcon(extraObj).library === 'fa'" :class="extraToIcon(extraObj).icon"></i>
                <!-- Für Bootstrap Icons -->
                <i v-else-if="extraToIcon(extraObj).library === 'bi'" :class="extraToIcon(extraObj).icon"></i>
                <span class="tooltip-text">{{ Object.keys(extraObj)[0] }}</span>
              </button>
            </i>
          </div>

        </div>
        <div class="load-more-container">
          <button @click="loadMoreRooms" v-if="firstFiveRooms.length < rooms.length" class="btn btn-primary">Mehr Zimmer
            anzeigen</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import 'bootstrap-icons/font/bootstrap-icons.css'; // Stil für die Icons
import { ref, onMounted } from 'vue';
import axios from 'axios';

const ROOM_TYPES = {
  DOUBLE_BEDROOM: "Double Bedroom",
  SINGLE_BEDROOM: "Single Bedroom",
  SUITE: "Suite"
};

const filterExtras = (extras) => {
  return extras.filter(extra => {
    const key = Object.keys(extra)[0];
    return extra[key] === 1;
  });
};


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

const extraToIcon = (extraName) => {
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
  const key = Object.keys(extraName)[0];
  return mapping[key] || { library: 'bi', icon: 'bi-question' };
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
    const response = await axios.get('https://boutique-hotel.helmuth-lammer.at/api/v1/rooms');
    rooms.value = response.data;
    firstFiveRooms.value = rooms.value.slice(0, 5);
  } catch (error) {
    console.error('Error fetching rooms:', error);
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

// Hier würde der vorherige Stil fortgesetzt werden.



<style scoped>
.room-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.text-center {
  text-align: center;
  margin: 0 0 32px 0;
  

}

.room-info {
  text-align: -webkit-left;
  /* Zentriert den Text */
  width: 100%;
  /* Nimmt die gesamte verfügbare Breite ein */
  margin: 0 0 10px 0;
}

.room-description {
  text-align: -webkit-left;
  /* Zentriert den Text */
  width: 100%;
  /* Nimmt die gesamte verfügbare Breite ein */
  min-height: 80px;
  /* Fügen Sie eine Mindesthöhe hinzu, damit alle room-boxes die gleiche Höhe haben */
  margin: 8px 0;
}

.room-extras i {
  font-size: 24px;
  margin: 0 5px;
  color: #4382e2e4;
  text-align: -webkit-center;
  transition: color 0.3s; /* sanfter Übergang für den Farbwechsel */
}

.room-extras i:hover {
  color: #2a66c9; /* Eine dunklere Schattierung von #4382e2 */
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
  /*eine kleine rand um die box*/
  border: 1px solid #9bb8e5;
  border-radius: 5px;
  padding: 2%;
}

@media (min-width: 1025px) {
  .room-box {
    min-width: calc(20% - 16px);
    /* Anzahl der sichtbaren room-boxes ändern */
    padding: 1%;
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
    padding: 3%;
  }
}

.load-more-container {
  flex: 1;
  min-width: calc(20% - 16px);
  /* Die gleiche Breite wie room-box */
  max-width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  /* Zentrieren Sie den Inhalt horizontal und vertikal */
  padding: 16px;
  /* Fügen Sie Padding hinzu, um den Button zu zentrieren */
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
