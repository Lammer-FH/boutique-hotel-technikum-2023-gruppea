<script setup>
import TheSidebar from './components/TheSidebar.vue';
import TheHeader from './components/TheHeader.vue';
import TheOverlay from './components/TheOverlay.vue';
import TheFooter from './components/TheFooter.vue';

</script>

<template>
    <div class="main-container">
        <header id="mainHeader">
            <TheSidebar id="mySidebar" />
            <TheHeader id="myHeader" />
            <TheOverlay id="myOverlay" msg="Boutique Hotel" />
        </header>
        <div class="content">
            <RouterView />
        </div>
        <footer class="footer">
            <TheFooter id="myFooter" />
        </footer>

    </div>
</template>

<style scoped>
.content {
    flex: 1;
    line-height: normal;
}

.main-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

header#mainHeader[data-v-7a7a37b1][data-v-7a7a37b1] {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
    max-width: 1040px;

}

@media (min-width: 1024px) {
    header#mainHeader {
        flex-wrap: wrap;
    }
}

@media (max-width: 768px) {
}

@media (max-width: 500px) {
    div#myOverlay {
        display: none;
    }
}
</style>