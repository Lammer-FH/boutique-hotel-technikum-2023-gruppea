<template>
  <b-modal id="booking-modal" v-model="showModal">
    <template #modal-title>
      Zimmer Buchung
    </template>
    <div class="selected-info-box">
      Check-in Datum: {{ checkIn }}
      <br>
      Check-out Datum: {{ checkOut }}
      <br>
      Ausgewähltes Zimmer: {{ selectedRoom }}
    </div>

    <b-form @submit.prevent="submitBookingForm">
      <div v-for="(guest, i) in guestDetails" :key="i">
        <b-row>
          <b-col md="4">
            <b-form-group :label="`Vorname (Gast ${i + 1})`">
              <b-form-input type="text" v-model="guest.firstName" required></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="4">
            <b-form-group :label="`Nachname (Gast ${i + 1})`">
              <b-form-input type="text" v-model="guest.lastName" required></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="4">
            <b-form-group :label="`Geburtstag (Gast ${i + 1})`">
              <b-form-input type="date" v-model="guest.birthday" required></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
      </div>

      <b-form-group label="E-Mail Adresse">
        <b-form-input type="email" v-model="email" required></b-form-input>
      </b-form-group>
      <b-form-group label="E-Mail Adresse bestätigen">
        <b-form-input type="email" v-model="emailConfirm" required></b-form-input>
      </b-form-group>

      <b-form-group label="Frühstück">
        <b-form-radio-group v-model="selectedBreakfastOption" :options="['Ja', 'Nein']" required></b-form-radio-group>
      </b-form-group>

      <b-button @click="displayConfirmation" variant="success">Bestätigen</b-button>
      <ConfirmationModal :showConfirmationModal="showConfirmationModal"
        @update:showConfirmationModal="showConfirmationModal = $event" @confirmed="handleConfirmed" @edit="handleEdit" />

    </b-form>
  </b-modal>
</template>

<script setup>
import { ref, defineProps, computed, toRefs, watch } from 'vue';
import ConfirmationModal from './ConfirmationModal.vue';

const props = defineProps({
  numberOfAdults: Number,
  numberOfChildren: {
    type: Number,
    default: 0
  },
  checkIn: String,
  checkOut: String,
  selectedRoom: [String, Number]
});

const showConfirmationModal = ref(false);

const { numberOfAdults, numberOfChildren, checkIn, checkOut, selectedRoom } = toRefs(props);
const showModal = ref(false);

const totalGuests = computed(() => {
  const adultCount = parseInt(numberOfAdults.value, 10);
  const childrenCount = parseInt(numberOfChildren.value, 10);
  const total = adultCount + childrenCount;
  return total >= 0 ? total : 0;
});

watch([numberOfAdults, numberOfChildren], () => {
  initializeGuestDetails();
});

const displayConfirmation = () => {
  console.log("displayConfirmation wurde aufgerufen");
  showConfirmationModal.value = true;
};

const bookingSuccess = ref(false);
const handleConfirmed = () => {
  console.log("Event 'confirmed' empfangen");
  // Dein Code zur Bestätigung der Buchung
};

const handleEdit = () => {
  console.log("Event 'edit' empfangen");
  // Dein Code zur Bearbeitung der Buchung
};

// Für Testdaten
const guestDetails = ref([
  { firstName: 'John', lastName: 'Doe', birthday: '1990-01-01' }
]);
const email = ref("test@example.com");
const emailConfirm = ref("test@example.com");
const selectedBreakfastOption = ref("Ja");

const initializeGuestDetails = () => {
  if (guestDetails.value.length === 0) {
    guestDetails.value = Array.from({ length: totalGuests.value }, () => ({ firstName: '', lastName: '', birthday: '' }));
  }
};

// Aufruf der Funktion, um guestDetails zu initialisieren
initializeGuestDetails();

// ... Rest des Codes

// const selectedBreakfastOption = ref(null); 
// const guestDetails = ref([]);
// const email = ref("");
// const emailConfirm = ref("");
// const initializeGuestDetails = () => {
//   guestDetails.value = Array.from({ length: totalGuests.value }, () => ({ firstName: '', lastName: '', birthday: '' }));
// };

// // Aufruf der Funktion, um guestDetails zu initialisieren
// initializeGuestDetails();
const submitBookingForm = () => {
  if (email.value !== emailConfirm.value) {
    console.log("Die E-Mail-Adressen stimmen nicht überein.");
    return;
  }
  if (!selectedBreakfastOption.value) {
    console.log('Bitte wähle eine Option für das Frühstück aus.');
    return;
  }
  console.log('Formular wurde gesendet');
  bookingSuccess.value = true;
};

</script>

<style scoped>
.selected-info-box {
  border: 1px solid #9bb8e5;
  border-radius: 5px;
  background-color: #9bb8e5;
  padding: 10px;
  margin-bottom: 20px;
}

form {
  font-size: small;
}
</style>
