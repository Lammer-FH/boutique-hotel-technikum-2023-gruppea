import axios from 'axios';

const state = {
  // Dein State hier
};

const mutations = {
  // Deine Mutations hier
};

const actions = {
  async registerUser({ commit }, payload) {
    try {
      const response = await axios.post('https://boutique-hotel.helmuth-lammer.at/api/v1/register', payload);
      commit('SET_USER', response.data);
      // Zeige Bestätigungsanzeige
    } catch (error) {
      // Handle Error
    }
  },
};

export default {
  state,
  mutations,
  actions,
};
