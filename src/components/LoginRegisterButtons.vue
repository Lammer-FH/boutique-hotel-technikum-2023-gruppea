<!-- LoginRegisterButtons.vue -->
<template>
    <div class="logRegButton">
        <!-- Buttons zum Öffnen der Modals -->
        <button @click="toggleModal('login')" class="btn btn-outline-secondary">Anmelden</button>
        <button @click="toggleModal('register')" class="btn btn-success">Registrieren</button>

        <!-- Einzelnes Modal für die Anmeldung und Registrierung -->
        <b-modal v-model="showModal" :title="modalState === 'login' ? 'Anmelden' : 'Registrieren'">
            <b-form @submit.prevent="modalState === 'login' ? submitLoginForm() : submitRegisterForm()">

                <!-- E-Mail Feld für beide Formulare -->
                <b-form-group label="E-Mail" class="mb-3" describedby="email-help">
                    <b-form-input type="email" v-model="email" autocomplete="username" placeholder="beispiel@domain.com"
                        aria-describedby="email-help" @blur="emailBlurred = true"
                        :state="email && emailBlurred ? validateEmail(email) : null" required></b-form-input>
                    <b-form-invalid-feedback v-if="emailBlurred && !validateEmail(email)">
                        Bitte gib eine gültige E-Mail-Adresse ein.
                    </b-form-invalid-feedback>
                    <b-form-text id="email-help">Deine E-Mail für die Anmeldung.</b-form-text>
                </b-form-group>

                <!-- Registrierungsfelder -->
                <template v-if="modalState === 'register'">
                    <b-form-group label="Vorname" class="mb-3">
                        <b-form-input v-model="firstName" required autocomplete="firstname"></b-form-input>
                    </b-form-group>
                    <b-form-group label="Nachname" class="mb-3">
                        <b-form-input v-model="lastName" required autocomplete="lastname"></b-form-input>
                    </b-form-group>
                    <b-form-group label="Geburtstag" class="mb-3">
                        <b-form-input type="date" v-model="birthday" required autocomplete="birthday"></b-form-input>
                    </b-form-group>
                    <b-form-group label="Passwort Bestätigen" class="mb-3">
                        <b-form-input type="password" v-model="confirmPassword" autocomplete="new-password"
                            required></b-form-input>
                    </b-form-group>
                </template>

                <!-- Passwortfeld für beide Formulare -->
                <b-form-group label="Passwort" class="mb-3">
                    <b-form-input type="password" v-model="password"
                        :autocomplete="modalState === 'login' ? 'current-password' : 'new-password'"
                        required></b-form-input>
                </b-form-group>

                <!-- Anmelde- oder Registrierungsknopf -->
                <b-button type="submit" variant="primary">{{ modalState === 'login' ? 'Anmelden' : 'Registrieren'
                }}</b-button>
            </b-form>
        </b-modal>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { BModal, BForm, BFormGroup, BFormInput, BButton } from 'bootstrap-vue-3';

const showModal = ref(false);
const modalState = ref('login');
// const email = ref('');
// const firstName = ref('');
// const lastName = ref('');
// const password = ref('');
// const confirmPassword = ref('');
const emailBlurred = ref(false);
// const birthday = ref('');
const registrationSuccess = ref(false);

const apiURL = 'https://boutique-hotel.helmuth-lammer.at/api/v1/register';
const registerUser = async () => {
    if (password.value !== confirmPassword.value) {
        alert('Die Passwörter stimmen nicht überein.');
        return;
    }

    try {
        const response = await axios.post(apiURL, {
            firstname: firstName.value,
            lastname: lastName.value,
            email: email.value,
            username: email.value,
            password: password.value
        });
        console.log('Registrierung erfolgreich', response.data);
        alert('Registrierung erfolgreich!');
        showModal.value = false;

    } catch (error) {
        console.error('Registrierung fehlgeschlagen', error);
        alert('Registrierung fehlgeschlagen: ' + error.response.data.message);
    }
};

const toggleModal = (state) => {
    showModal.value = true;
    modalState.value = state;
};

const submitLoginForm = () => {
    console.log('Anmelden', email.value, password.value);
    showModal.value = false;
};

const submitRegisterForm = async () => {
    if (password.value !== confirmPassword.value) {
        alert('Die Passwörter stimmen nicht überein.');
        return;
    }
    await registerUser();
    console.log('Registrieren', firstName.value, lastName.value, email.value, password.value);
    showModal.value = false;
};

const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
};

const formatDate = (date) => {
    let hours = date.getHours().toString().padStart(2, '0');
    let minutes = date.getMinutes().toString().padStart(2, '0');
    let seconds = date.getSeconds().toString().padStart(2, '0');
    return `${date.getDate()}${date.getMonth() + 1}${date.getFullYear()}_${hours}${minutes}${seconds}`;
};

// Testdaten
const currentDate = new Date();
const email = ref(`${formatDate(new Date())}@test.com`);
const firstName = ref('Max');
const lastName = ref('Mustermann');
const password = ref('Passwort123');
const confirmPassword = ref('Passwort123');
const birthday = ref(`${currentDate.getFullYear() - 18}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`);
</script>

<style scoped>
.logRegButton {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.modal {
    display: block;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
}

.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}

button.btn.btn-outline-secondary {
    border: transparent;
    font-weight: 600;
    --bs-btn-hover-bg: none;
    --bs-btn-hover-color: #1dbf73;
}

button.btn.btn-success {
    --bs-btn-color: #1dbf73;
    --bs-btn-hover-bg: #1dbf73;
    --bs-btn-bg: none;
    border-color: #1dbf73;
}
</style>