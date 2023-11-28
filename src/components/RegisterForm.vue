<!-- RegisterForm.vue -->
<template>
    <div v-if="registrationSuccessful">
        <div class="alert alert-success" role="alert">
            Registrierung erfolgreich! Du kannst dich jetzt anmelden.
        </div>
    </div>

    <b-form @submit.prevent="submitRegister" v-else>
        <b-form-group label="E-Mail" class="mb-3" describedby="email-help">
            <b-form-input type="email" v-model="email" autocomplete="username" placeholder="beispiel@domain.com"
                aria-describedby="email-help" @blur="emailBlurred = true"
                :state="email && emailBlurred ? validateEmail(email) : null" required></b-form-input>
            <b-form-invalid-feedback v-if="emailBlurred && !validateEmail(email)">
                Bitte gib eine gültige E-Mail-Adresse ein.
            </b-form-invalid-feedback>
            <b-form-text id="email-help">Deine E-Mail für die Anmeldung.</b-form-text>
        </b-form-group>

        <b-form-group label="Vorname" class="mb-3">
            <b-form-input v-model="firstName" required autocomplete="given-name"></b-form-input>
        </b-form-group>
        <b-form-group label="Nachname" class="mb-3">
            <b-form-input v-model="lastName" required autocomplete="family-name"></b-form-input>
        </b-form-group>
        <b-form-group label="Geburtstag" class="mb-3">
            <b-form-input type="date" v-model="birthday" required autocomplete="bday"></b-form-input>
        </b-form-group>

        <b-form-group label="Passwort" class="mb-3">
            <b-form-input type="password" v-model="password"
                :autocomplete="modalState === 'login' ? 'current-password' : 'new-password'" required></b-form-input>
        </b-form-group>
        <b-form-group label="Passwort Bestätigen" class="mb-3">
            <b-form-input type="password" v-model="confirmPassword" autocomplete="new-password" required></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Registrieren</b-button>
    </b-form>
</template>
  
<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authService';
import { defineProps } from 'vue';

const props = defineProps({
    modalState: String,
});

const firstName = ref('Max');
const lastName = ref('Mustermann');
const password = ref('Passwort123');
const confirmPassword = ref('Passwort123');
const emailBlurred = ref(false);

const generateTestEmail = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    return `${year}${month}${day}_${hours}${minutes}${seconds}@tester.com`;
};
const email = ref(generateTestEmail());

const generateTestBirthday = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear() - 18;
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const birthday = ref(generateTestBirthday());

const authStore = useAuthStore();

const registrationSuccessful = ref(false);

const submitRegister = async () => {
    if (password.value !== confirmPassword.value) {
        alert('Die Passwörter stimmen nicht überein.');
        return;
    }

    try {
        await authStore.register({
            firstname: firstName.value,
            lastname: lastName.value,
            email: email.value,
            password: password.value
        });

        if (authStore.user) {
            registrationSuccessful.value = true;
        }
    } catch (error) {
        console.error('Registrierung fehlgeschlagen', authStore.error);
        alert('Registrierung fehlgeschlagen: ' + authStore.error);
    }
};

const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
};
</script>

<style scoped>
button.btn.btn-secondary.btn-md.btn {
    display: none;
}
</style>