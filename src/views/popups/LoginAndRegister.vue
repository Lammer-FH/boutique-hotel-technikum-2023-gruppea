<!-- LoginAndRegister.vue -->
<template>
  <div>
    <!-- Buttons zum Öffnen der Modals -->
    <button @click="showLoginModal" class="btn btn-outline-secondary">Anmelden</button>
    <button @click="showRegisterModal" class="btn btn-success">Registrieren</button>

    <!-- Modal für die Anmeldung -->
    <b-modal id="login-modal" title="Anmelden">
      <b-form @submit.prevent="submitLoginForm">
        <b-form-group label="Benutzername" class="mb-3">
          <b-form-input v-model="loginUsername" required></b-form-input>
        </b-form-group>
        <b-form-group label="Passwort" class="mb-3">
          <b-form-input type="password" v-model="loginPassword" required></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Anmelden</b-button>
      </b-form>
    </b-modal>

    <!-- Modal für die Registrierung -->
    <b-modal id="register-modal" title="Registrieren">
      <b-form @submit.prevent="submitRegisterForm">
        <b-form-group label="Benutzername" class="mb-3">
          <b-form-input v-model="registerUsername" required></b-form-input>
        </b-form-group>
        <b-form-group label="Passwort" class="mb-3">
          <b-form-input type="password" v-model="registerPassword" required></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Registrieren</b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const showLoginModal = ref(false);
const showRegisterModal = ref(false);

// Daten für die Anmelde- und Registrierungsformulare
const loginUsername = ref('');
const loginPassword = ref('');
const registerUsername = ref('');
const registerPassword = ref('');

// Dummy-Funktionen für die Formulareinreichung
const submitLoginForm = () => {
  console.log('Anmeldeformular eingereicht:', { username: loginUsername.value, password: loginPassword.value });
};

const submitRegisterForm = () => {
  console.log('Registrierungsformular eingereicht:', { username: registerUsername.value, password: registerPassword.value });
};
</script>

<style scoped>
.registerForm[data-v-bb52c3e3] {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
  text-align: -webkit-left;
  float: left;
}
</style>