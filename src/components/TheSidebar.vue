<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router';

let showSidebar = ref(false);

const toggleSidebar = () => {
    showSidebar.value = !showSidebar.value;
}
</script>

<template>
    <button @click="toggleSidebar" class="btn btn">☰</button>

    <div v-if="showSidebar" class="sidebar">
        <img alt="Logo" class="sidebar-logo" src="@/assets/logo.svg" width="50" height="50" />

        <button @click="toggleSidebar" class="close-btn">✖</button>
        <RouterLink to="/" @click.native="toggleSidebar" class="btn btn-primary mb-2 btn-left-align">
            <i class="fas fa-home"></i> Home
        </RouterLink>
        <RouterLink to="/book" @click.native="toggleSidebar" class="btn btn-primary mb-2 btn-left-align">
            <i class="fa-solid fa-calendar-days"></i> Book
        </RouterLink>
        <RouterLink to="/rooms" @click.native="toggleSidebar" class="btn btn-primary mb-2 btn-left-align">
            <i class="fas fa-bed"></i> Rooms
        </RouterLink>
        <RouterLink to="/about" @click.native="toggleSidebar" class="btn btn-primary mb-2 btn-left-align">
            <i class="fas fa-info-circle"></i> About
        </RouterLink>
        <RouterLink to="/impressum" @click.native="toggleSidebar" class="btn btn-primary mb-2 btn-left-align">
            <i class="fas fa-legal"></i> Impressum
        </RouterLink>
    </div>
</template>

<style scoped>
.btn {
    display: block;
    /* background: #000; */
    border: transparent;
    font-size: xxx-large;

}

.sidebar[style*="display: block"] {
    display: flex;
    flex-direction: column;
}

.sidebar {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    /* 21.125rem; */
    height: 100vh;
    background-color: #111;
    opacity: 93%;
    /* background-color: hsla(160, 100%, 37%, 1); */
    /* background-color: hsl(211.43deg 28.77% 28.63%); */
    padding: 30px 25px 0 25px;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.3);
    z-index: 900;
    animation: toright 0.25s;
}

.sidebar a {
    display: block;
    padding: 10px;
    color: white;
    text-decoration: none;
    text-align: left;
    margin-bottom: 5px;
    transition: background-color 0.2s ease-in-out;
    font-size: x-large;
}

.sidebar-logo {
    margin: 0 20px 30px 0px;
    filter: grayscale(100%);
    padding: 0.5rem;
    height: 100px;
    width: 100px;
}

/* .sidebar a:hover {
    background-color: #575757;
} */

.btn-left-align {
    text-align: left;
    justify-content: flex-start;
    display: flex;
    align-items: center;
    background-color: transparent;
    --bs-btn-border-color: transparent;
}

.btn-left-align i {
    margin-right: 40px;
    width: 20px;
    /* Feste Breite für alle Icons */
    text-align: center;
}

@media (max-width: 768px) {
    .btn {
        display: block;
    }
}

.close-btn {
    border: none;
    color: white;
    font-size: 20px;
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    color: #ffffff;
    background: transparent;
}

@keyframes toright {
    from {
        transform: translateX(-100%);
    }

    to {
        transform: translateX(0);
    }
}

.logo {
    padding: 3%;
    top: 10px;
    right: 10px;
}

nav#mainnav {
    text-align: center;
    padding: 10px;
    z-index: 900;
}

nav#mainnav span {
    display: none;
}

nav#mainnav a {
    display: none;
    ;
}

/* Bei Bildschirmbreiten über 768px werden die Textbeschreibungen ausgeblendet */
@media (min-width: 768px) {
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
    }
}
@media (min-width: 1024px) {
    /* .close-btn {

        max-width: min(calc(100vw - 20px), 1140px);
    } */
}
</style>
