import { defineStore } from 'pinia';
import axios from 'axios';

export const useGuestsStore = defineStore('guests', {
  state: () => ({
    registrationMessage: '',
  }),
  actions: {
    async registerUser(payload) {
      try {
        const response = await axios.post('https://boutique-hotel.helmuth-lammer.at/api/v1/register', payload);
        this.$patch({ user: response.data });
        this.$patch({ registrationMessage: 'Danke für die Registrierung!' });
      } catch (error) {
        this.$patch({ registrationMessage: 'Registrierung fehlgeschlagen!' });
      }
    },
  },
});
