<template>
  <div>
    <!-- Buttons zum Öffnen der Modals -->
    <button @click="showModal('login-modal')" class="btn btn-outline-secondary">Anmelden</button>
    <button @click="showModal('register-modal')" class="btn btn-success">Registrieren</button>

    <!-- Modal für die Anmeldung -->
    <b-modal id="login-modal" title="Anmelden">
      <form @submit.prevent="submitLoginForm">
        <div class="form-group mb-3">
          <input type="text" class="form-control" v-model="loginUsername" placeholder="Benutzername" required>
        </div>
        <div class="form-group mb-3">
          <input type="password" class="form-control" v-model="loginPassword" placeholder="Passwort" required>
        </div>
        <button type="submit" class="btn btn-primary">Anmelden</button>
      </form>
    </b-modal>

    <!-- Modal für die Registrierung -->
    <b-modal id="register-modal" title="Registrieren">
      <form @submit.prevent="submitRegisterForm">
        <div class="form-group mb-3">
          <input type="text" class="form-control" v-model="registerUsername" placeholder="Benutzername" required>
        </div>
        <div class="form-group mb-3">
          <input type="password" class="form-control" v-model="registerPassword" placeholder="Passwort" required>
        </div>
        <button type="submit" class="btn btn-primary">Registrieren</button>
      </form>
    </b-modal>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useBVModal } from 'bootstrap-vue';

// Funktion zum Anzeigen der Modals
const { showModal } = useBVModal();

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