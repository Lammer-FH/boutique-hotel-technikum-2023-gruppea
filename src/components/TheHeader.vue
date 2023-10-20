<script setup>
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
    <header>
        <img alt="logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
        <div class="button-container">
            <RouterLink to="/register">
                <button class="btn btn-success">Registrieren</button>
            </RouterLink>
            <RouterLink to="/login">
                <button class="btn btn-outline-secondary">Anmelden</button>
            </RouterLink>
        </div>
    </header>
</template>

<style scoped>
.logo {
    top: 10px;
    right: 10px;
}

.button-container {
    display: inline-block;
    margin-left: 20px;
}

.btn {
    margin-right: 10px;
}

.btn-success RouterLink,
.btn-outline-secondary RouterLink {
    color: inherit;
    text-decoration: inherit;
}

button.btn.btn-success {
    background-color: transparent;
    border-color: #26c6a4;
    color: #26c6a4;
    font-weight: bold;
}

button.btn.btn-outline-secondary {
    border-color: transparent;
    color: #9bb8e5;
    font-weight: bold;
}

@media (min-width: 1024px) {}

@media (min-width: 769px) {
    nav#mainnav span {
        display: inline;
    }

    nav#mainnav a {
        display: inline-block;
        margin: 0 15px;
    }
}

@media (max-width: 768px) {
    .logo {
        justify-content: center;
        padding: 0%;
    }
}
</style>
