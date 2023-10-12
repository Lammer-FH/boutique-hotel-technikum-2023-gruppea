<template>
    <div v-if="confirmationSuccess">
    Buchung erfolgreich!
    <button @click="closeModal">OK</button>
  </div>
  <div v-else>
    <b-modal :model-value="showConfirmationModal" @update:modelValue="$emit('update:showConfirmationModal', $event)">

        <template #modal-title>
            Buchungsbestätigung
        </template>
        <div>
            Check-in: {{ checkIn }}
            <br>
            Check-out: {{ checkOut }}
            <br>
            1x {{ selectedRoom }}
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
            <div>
                <b-button @click="editBooking" variant="warning">Bearbeiten</b-button>
            </div>
        </div>

    </b-modal>
  </div>
</template>
  
<script setup>
import { defineEmits, defineProps } from 'vue';

const props = defineProps({
    showConfirmationModal: Boolean,
    checkIn: String,
    checkOut: String,
    selectedRoom: [String, Number],
    guestDetails: Array
});

const emit = defineEmits();

const confirmBooking = () => {
    console.log("Buchung bestätigen wurde geklickt");
    emit('confirmed');
    emit('update:showConfirmationModal', false);
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
