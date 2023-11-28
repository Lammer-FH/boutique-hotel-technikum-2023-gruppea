// authService.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        error: null,
    }),
    actions: {
        async register(userData) {
            try {
                const response = await axios.post('https://boutique-hotel.helmuth-lammer.at/api/v1/register', userData);
                this.user = response.data;
                this.error = null;
            } catch (error) {
                this.error = error.response.data.message;
            }
        },
        async login(credentials) {
            try {
                const response = await axios.post('https://boutique-hotel.helmuth-lammer.at/api/v1/login', credentials);
                this.user = response.data;
                this.error = null;
            } catch (error) {
                this.error = error.response.data.message;
            }
        },
        logout() {
            this.user = null;
        }
    },
});
