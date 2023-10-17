// roomStore.js

import { defineStore } from 'pinia';
import { ROOM_TYPES } from '@/stores/roomTypes';
import axios from 'axios';

export const useRoomStore = defineStore({
  id: '',
  state: () => ({
    selectedRoomDetails: {
      image: '',
      extras: [
        { BATHROOM: 'bathroom' },
        { MINIBAR: 'minibar' },
        { TELEVISION: 'television' },
        { LIVINGROOM: 'livingroom' },
        { AIRCONDITION: 'aircondition' },
        { WIFI: 'wifi' },
        { BREAKFAST: 'breakfast' },
        { HANDICAPPED_ACCESSIBLE: 'handicapped accessible' }
      ],
      description: '',
    },
  }),
  getters: {
    getSelectedRoomDetails(state) {
      return state.selectedRoomDetails;
    },
    getRoomExtras(state) {
      return state.selectedRoomDetails.extras;
    },
    getRoomDescription(state) {
      const { description } = state.selectedRoomDetails;
      console.log(description);
      if (description.includes(ROOM_TYPES.DOUBLE_BEDROOM)) {
        return "Das Genießerzimmer für Paare im großzügigen Doppelbett";
      } else if (description.includes(ROOM_TYPES.SINGLE_BEDROOM)) {
        return "Das perfekte Zimmer für Alleinreisende";
      } else if (description.includes(ROOM_TYPES.SUITE)) {
        return "Luxuriöser Raum für diejenigen, die das Beste wollen";
      } else {
        return "Ein komfortables Zimmer, perfekt für Ihren Aufenthalt";
      }
    },
  },
  actions: {
    setSelectedRoomDetails(details) {
      this.selectedRoomDetails = details;
    },
    addExtra(extra) {
      this.selectedRoomDetails.extras.push(extra);
    },
    removeExtra(extraName) {
      this.selectedRoomDetails.extras = this.selectedRoomDetails.extras.filter(
        extra => Object.keys(extra)[0] !== extraName
      );
    },
    async fetchRooms() {
      try {
        const response = await axios.get(
          "https://boutique-hotel.helmuth-lammer.at/api/v1/rooms"
        );
        this.rooms = response.data; // Aktualisiere die rooms-Property im State
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    },
  },
});