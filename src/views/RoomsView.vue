<template>
  <div class="rooms">
    <h1>Our Rooms</h1>

    <div class="masonry">
      <div v-for="room in rooms.slice(0, 5)" :key="room.id">
        <img :src="`src/images/rooms/${room.roomsNumber}.jpg`" :alt="room.roomsNumber" :title="`${room.roomsName} - Room (${room.roomsNumber})`">
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      rooms: []
    }
  },
  async created() {
    try {
      const response = await axios.get('https://boutique-hotel.helmuth-lammer.at/api/v1/rooms');
      this.rooms = response.data;
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  }
}
</script>

<style>
.masonry {
  display: grid;
  grid-gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(15%, 1fr));
  grid-auto-rows: 100%;
}

.masonry img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
