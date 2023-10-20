<template>
    <!-- Dein HTML-Code hier -->
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  
  export default {
    methods: {
      ...mapActions(['registerUser']),
      async submitForm() {
        const payload = {
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          username: this.username,
          password: this.password,
        };
        await this.registerUser(payload);
      },
    },
  };
  </script>
  