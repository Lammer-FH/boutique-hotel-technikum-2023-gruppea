<template>
  <b-modal id="booking-modal" v-model="showModal">
    <template #modal-title>
      Zimmer Buchung
    </template>

    <!-- Box für ausgewähltes Datum und Zimmer -->
    <div class="selected-info-box">
      Check-in Datum: {{ checkIn }}
      <br>
      Check-out Datum: {{ checkOut }}
      <br>
      Ausgewähltes Zimmer: {{ selectedRoom }}
    </div>

    Total Guests: {{ totalGuests }}

    <b-form @submit.prevent="submitBookingForm">
      <div v-for="(guest, i) in guestDetails" :key="i">
        <b-row>
          <b-col md="6">
            <b-form-group :label="`Vorname (Gast ${i + 1})`">
              <b-form-input type="text" v-model="guest.firstName" required></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group :label="`Nachname (Gast ${i + 1})`">
              <b-form-input type="text" v-model="guest.lastName" required></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
      </div>

      <b-form-group label="E-Mail Adresse">
        <b-form-input type="email" required></b-form-input>
      </b-form-group>
      <b-form-group label="E-Mail Adresse bestätigen">
        <b-form-input type="email" required></b-form-input>
      </b-form-group>

      <b-form-group label="Frühstück">
        <b-form-radio-group v-model="selectedBreakfastOption" :options="['Ja', 'Nein']" required></b-form-radio-group>
      </b-form-group>

      <b-button type="submit" variant="success">Bestätigen</b-button>
    </b-form>
  </b-modal>
</template>

<script setup>
import { ref, defineProps, computed, toRefs, watch } from 'vue';

const props = defineProps({
  numberOfAdults: Number,
  numberOfChildren: {
    type: Number,
    default: 0
  },
  checkIn: String,
  checkOut: String,
  selectedRoom: [String, Number] // Je nach Datentyp des gewählten Zimmers
});

const { numberOfAdults, numberOfChildren, checkIn, checkOut, selectedRoom } = toRefs(props);

const showModal = ref(false);

const totalGuests = computed(() => {
  const adultCount = parseInt(numberOfAdults.value, 10);
  const childrenCount = parseInt(numberOfChildren.value, 10);
  const total = adultCount + childrenCount;
  return total >= 0 ? total : 0;
});

const guestDetails = ref([]); // Ein Array zur Speicherung von Gastdetails

const initializeGuestDetails = () => {
  guestDetails.value = Array.from({ length: totalGuests.value }, () => ({ firstName: '', lastName: '' }));
};

// Aufruf der Funktion, um guestDetails zu initialisieren
initializeGuestDetails();

watch([numberOfAdults, numberOfChildren], () => {
  initializeGuestDetails();
});

watch([numberOfAdults, numberOfChildren], initializeGuestDetails);

const selectedBreakfastOption = ref(null); // Initialwert ist null

const submitBookingForm = () => {
  if (!selectedBreakfastOption.value) {
    console.log('Bitte wähle eine Option für das Frühstück aus.');
    return;
  }
  console.log('Formular wurde gesendet');
};

</script>

<style scoped>
.selected-info-box {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 20px;
}
</style>
