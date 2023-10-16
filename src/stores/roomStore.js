import { defineStore } from 'pinia';

export const useRoomStore = defineStore({
  id: 'room',
  state: () => ({
    selectedRoomDetails: {
      image: '',
      extras: [],
      description: ''
    },
  }),
  actions: {
    setSelectedRoomDetails(details) {
      this.selectedRoomDetails = details;
    }
  }
});
