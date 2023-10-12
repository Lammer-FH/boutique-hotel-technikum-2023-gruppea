<template>
    <b-modal :model-value="showConfirmationModal" @update:modelValue="$emit('update:showConfirmationModal', $event)"
        hide-footer>

        <template #modal-title>
            Buchungsbestätigung
        </template>
        <div>
            Check-in: {{ checkIn }}
            <br>
            Check-out: {{ checkOut }}
            <br>
            Zimmer: {{ selectedRoom }}
        </div>
        <br> Gästedaten: <br>
        <div v-for="(guest, index) in guestDetails" :key="index">
            <div>{{ `(Gast ${index + 1}): ${guest.firstName} ${guest.lastName}, ${guest.birthday}` }}</div>
        </div>
        <br>
        <div class="confirmButtons">
            <div>
                <b-button @click="confirmBooking" variant="success">Buchung bestätigen</b-button>
            </div>
            <ShowConfirmation :model-value="showConfirmation" @update:modelValue="showConfirmation = $event"
                :checkIn="checkIn" :checkOut="checkOut" :selectedRoom="selectedRoom" :guestDetails="guestDetails" />
            <div>
                <b-button @click="editBooking" variant="warning">Bearbeiten</b-button>
            </div>
        </div>

    </b-modal>
</template>
  
<script setup>
import { ref, defineEmits, defineProps } from 'vue';
import ShowConfirmation from './ShowConfirmation.vue';

const emit = defineEmits();
const showConfirmation = ref(false);

const props = defineProps({
    showConfirmationModal: Boolean,
    checkIn: String,
    checkOut: String,
    selectedRoom: [String, Number],
    guestDetails: Array
});

const confirmBooking = () => {
    console.log("Buchung bestätigen wurde geklickt");
    showConfirmation.value = true;
    emit('confirmed');
    emit('update:showConfirmationModal', false);
    emit('close-booking-popup');
};

const editBooking = () => {
    console.log("Bearbeiten wurde geklickt");
    emit('edit');
    emit('update:showConfirmationModal', false);
};
</script>

<style scoped>
.confirmButtons {
    display: flex;
    justify-content: space-between;
}

.btn {
    position: inherit;
    width: -webkit-fill-available;
    padding: var(--bs-btn-padding-y) var(--bs-btn-padding-x);
}
</style>
