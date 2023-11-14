<template>
    <!-- Login Formular -->
    <b-form @submit.prevent="submitLogin">
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
        <template v-if="props.modalState === 'register'">
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
                <b-form-input type="password" v-model="confirmPassword" autocomplete="new-password" required></b-form-input>
            </b-form-group>
        </template>

        <!-- Passwortfeld für beide Formulare -->
        <b-form-group label="Passwort" class="mb-3">
            <b-form-input type="password" v-model="password"
                :autocomplete="modalState === 'login' ? 'current-password' : 'new-password'" required></b-form-input>
        </b-form-group>
    </b-form>
</template>
  
<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authService';
import { defineProps } from 'vue';

const emailBlurred = ref(false);
const props = defineProps({
    modalState: String,
});

const email = ref('');
const password = ref('');
const authStore = useAuthStore();

const submitLogin = async () => {
    try {
        await authStore.login({ email: email.value, password: password.value });
        if (authStore.user) {
            // Login erfolgreich
            $emit('close-modal');
        }
    } catch (error) {
        // Fehlerbehandlung
    }
};
</script>
  