<!-- ShowConfirmation.vue -->
<template>
  <b-modal :model-value="showConfirmation" @update:modelValue="$emit('update:showConfirmation', $event)" hide-footer>
    <template #modal-title>
      Buchung erfolgreich
    </template>
    <div class="buchungErfolgreich">
      Deine Buchung wurde erfolgreich durchgeführt.
    </div>
    <div class="bookingDetails">
      <div>
        Check-in: {{ checkIn }}
        <br>
        Check-out: {{ checkOut }}
        <br>
        Zimmer: {{ selectedRoom }}
      </div>
      <div v-for="(guest, i) in guestDetails" :key="i">
        {{ `Gast ${i + 1}: ${guest.firstName} ${guest.lastName}, Geburtstag: ${guest.birthday}` }}
      </div>
      <div class="infoBox">
        <img class="showImage" :src="roomImage" alt="Zimmerbild">
        <div>
          <!-- <h3>Zimmer Titel: {{ roomTitle }}</h3> -->
          <p class="descrCSS">{{ roomDescription }}</p>
          <div v-if="roomExtras && roomExtras.length">
            <!-- <h4>Extras:</h4> -->
            <!-- <pre>{{ roomExtras }}</pre> -->
            <RoomExtrasIcons :roomExtras="roomExtras" />
          </div>
        </div>
      </div>
    </div>
    <br>
    <div class="confirmButton">
      <b-button @click="() => $router.push('/')" variant="success">OK</b-button>
    </div>
  </b-modal>
</template>

<script setup>
import { ref, defineEmits, defineProps, computed } from 'vue';
import { useRoomStore } from '@/stores/roomStore';
// import Directions from './components/Directions.vue';
// import Contact from './components/Contact.vue';
const roomStore = useRoomStore();
const roomImage = ref('');
const roomExtras = computed(() => roomStore.getRoomExtras);
const roomDescription = computed(() => roomStore.getRoomDescription);
const roomTitle = computed(() => roomStore.getRoomTitle);
const showConfirmation = ref(false);
const emit = defineEmits();

async function loadRoomImage() {
  roomImage.value = await roomStore.fetchRoomImage('101');
}

loadRoomImage();

const props = defineProps({
  showConfirmation: Boolean,
  checkIn: String,
  checkOut: String,
  selectedRoom: [String, Number],
  guestDetails: Array
});
</script>
  
<style scoped>
.confirmButton {
  display: flex;
  justify-content: center;
}

.bookingDetails {
  display: flex;
  justify-content: center;
  flex-direction: column;
  /* align-items: center; */
  /* background-color: #9bb8e5; */
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #d8e7ff;
  border-radius: 5px;
  padding: 2%;
}

.showImage {
  width: calc(100% - 0%);
  /* height: calc(100% - 10%); */
  object-fit: cover;
  box-sizing: border-box;
  /* border: 1px solid #9bb8e5; */
  border-radius: 5px;
  /* padding: 2%; */
  margin: 10px 0 10px 0;
}

p.descrCSS {
  text-align: center;
}

.room-extras {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  gap: 1rem;
  flex-grow: 1;
}

.buchungErfolgreich {
  display: flex;
  justify-content: center;
  color: aliceblue;
  border-radius: 5px;
  background-color: #198754;
  padding: 10px;
  margin-bottom: 20px;
  color: #000;
}
</style>
  