<script setup>
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
    <header>
        <img alt="logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

        <!-- <div>
            <nav id="mainnav">
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/book">Book</RouterLink>
                <RouterLink to="/rooms">Rooms</RouterLink>
                <RouterLink to="/about">About</RouterLink>
                <RouterLink to="/impressum">Impressum</RouterLink>
            </nav>
        </div> -->
    </header>
</template>

<style scoped>
.logo {
    top: 10px;
    right: 10px;
}

/* nav#mainnav {
    text-align: center;
    padding: 10px;
    z-index: 900;
} */


@media (min-width: 1024px) {
    
}

/* Bei Bildschirmbreiten über 768px werden die Textbeschreibungen ausgeblendet */
@media (min-width: 769px) {
    nav#mainnav span {
        display: inline;
    }

    nav#mainnav a {
        display: inline-block;
        margin: 0 15px;
        /* Optional: Ein bisschen Abstand zwischen den Icons */
    }
}

@media (max-width: 768px) {
    .logo {
        justify-content: center;
        padding: 0%;
    }
}
</style>
