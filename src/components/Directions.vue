<template>
  <div class="directions">
    <h2 class="directionToHotel">Anfahrt zum Hotel</h2>
    <div id="map"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDPPRao1R_di8XikFL1DOeuqT2Eoxn_g2Q&callback=initMap`;
    script.async = true;
    window.initMap = this.initMap;
    document.head.appendChild(script);
  },
  methods: {
    initMap() {
      const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 48.2434, lng: 16.3774 }, // Koordinaten für Höchstädtpl. 6, 1200 Wien
        zoom: 15,
      });
      
      new google.maps.Marker({
        position: { lat: 48.2434, lng: 16.3774 }, // Koordinaten für Höchstädtpl. 6, 1200 Wien
        map,
        title: "Unser Hotel",
      });
    },
  },
};
</script>

<style scoped>
#map {
  height: 400px;
  width: 100%;
}

h2.directionToHotel {
  border-bottom: var(--bs-modal-header-border-width) solid var(--bs-modal-header-border-color);
  margin-top: 2rem;
  font-size: larger;
  padding: 0;
}
</style>
