<template>
  <div class="rooms">
    <h1>Our Rooms</h1>

    <div class="masonry">
      <div class="image-container" v-for="room in paginatedRooms" :key="room.id" @click="openModal(room)">
        <img :src="`src/images/rooms/${room.roomsNumber}.jpg`" :alt="room.roomsNumber"
          :title="`${room.roomsName} - Room (${room.roomsNumber})`">
      </div>
    </div>

    <!-- Modal -->
    <div class="modal" v-if="isModalOpen">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <img :src="`src/images/rooms/${currentRoom.roomsNumber}.jpg`" :alt="currentRoom.roomsNumber" @click="closeModal">
        <!-- Hinzufügen des @click Handlers hier -->
      </div>
    </div>

    <!-- Paginierung -->
    <div class="pagination">
      <button @click="previousPage" :disabled="currentPage <= 0">Previous</button>
      <button @click="nextPage" :disabled="currentPage >= maxPages - 1">Next</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      rooms: [],
      currentPage: 0,
      roomsPerPage: 5,
      isModalOpen: false,
      currentRoom: null
    };
  },
  async created() {
    try {
      const response = await axios.get('https://boutique-hotel.helmuth-lammer.at/api/v1/rooms');
      this.rooms = response.data;
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  },
  computed: {
    paginatedRooms() {
      const start = this.currentPage * this.roomsPerPage;
      const end = start + this.roomsPerPage;
      return this.rooms.slice(start, end);
    },
    maxPages() {
      return Math.ceil(this.rooms.length / this.roomsPerPage);
    }
  },
  methods: {
    nextPage() {
      if (this.currentPage < this.maxPages - 1) this.currentPage++;
    },
    previousPage() {
      if (this.currentPage > 0) this.currentPage--;
    },
    openModal(room) {
      this.currentRoom = room;
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
      this.currentRoom = null;
    }
  }
}
</script>

<style>
/* Modal Styles */
.modal {
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  position: relative;
  padding: 20px;
  width: 80%;
  max-width: 500px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.close {
  color: white;
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.close:hover,
.close:focus {
  color: #000;
  background-color: #fff;
}

.modal-content img {
  width: 100%;
  object-fit: contain;
}

@keyframes animatetop {
  from {
    top: -300px;
    opacity: 0;
  }

  to {
    top: 0;
    opacity: 1;
  }
}

.pagination {
  justify-content: space-between;
  margin-top: 20px;
}

.masonry {
  display: grid;
  grid-gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(18%, 1fr));
  grid-auto-rows: 100%;
}

.masonry .image-container {
  position: relative;
  overflow: visible;
  border-radius: 8px;
  transition: transform 0.3s;
}

.masonry .image-container:hover {
  z-index: 20;
  /* Bring the hovered item to the front */
}

.masonry img {
  width: 100%;
  height: 500px;
  object-fit: cover;
  transition: transform 0.3s;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.masonry .image-container:hover img {
  transform: scale(0.9);
}

.masonry .original-image {
  position: absolute;
  top: 0;
  left: 100%;
  width: 00px;
  height: auto;
  object-fit: contain;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 10;
  transition: left 0.3s;
}

.masonry .image-container:hover .original-image {
  left: calc(100% + 10px);
}
</style>
