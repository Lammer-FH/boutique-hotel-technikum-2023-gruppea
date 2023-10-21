<script setup>
import TheSidebar from './components/TheSidebar.vue';
import TheHeader from './components/TheHeader.vue';
import TheOverlay from './components/TheOverlay.vue';
import TheFooter from './components/TheFooter.vue';

</script>

<template>
  <header id="mainHeader">
    <TheHeader id="myHeader" />
    <TheOverlay id="myOverlay" msg="Boutique Hotel" />
    <TheSidebar id="mySidebar" />
  </header> 
  <RouterView />
  <TheFooter id="myFooter"/>
</template>

<style scoped>
header#mainHeader[data-v-7a7a37b1] {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
}

@media (min-width: 1024px) {
    header#mainHeader {
        flex-wrap: wrap;
    }
}

@media (max-width: 500px) {
    div#myOverlay {
        display: none;
    }
}
</style>