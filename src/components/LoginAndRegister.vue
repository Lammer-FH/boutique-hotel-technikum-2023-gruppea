<template>
  <form @submit.prevent="submitForm">
    <input v-model="firstname" placeholder="Vorname" required>
    <input v-model="lastname" placeholder="Nachname" required>
    <input type="email" v-model="email" placeholder="E-Mail" required>
    <input v-model="username" placeholder="Benutzername" required>
    <input type="password" v-model="password" placeholder="Passwort" required>
    <input type="password" v-model="passwordConfirmation" placeholder="Passwort bestätigen" required>
    <button type="submit">Registrieren</button>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { useGuestsStore } from '@/stores/guests';
import { useRouter } from 'vue-router';

const firstname = ref('');
const lastname = ref('');
const email = ref('');
const username = ref('');
const password = ref('');
const passwordConfirmation = ref('');

const guests = useGuestsStore();
const router = useRouter();

const submitForm = async () => {
  if (password.value !== passwordConfirmation.value) {
    alert('Passwörter stimmen nicht überein');
    return;
  }

  const payload = {
    firstname: firstname.value,
    lastname: lastname.value,
    email: email.value,
    username: username.value,
    password: password.value,
  };
  
  await guests.registerUser(payload);

  if (guests.registrationMessage) {
    router.push('/');
  }
};
</script>
