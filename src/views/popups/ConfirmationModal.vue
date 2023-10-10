<template>
    <b-modal :model-value="showConfirmationModal" @update:modelValue="$emit('update:showConfirmationModal', $event)">

        <template #modal-title>
            Buchungsbestätigung
        </template>
        <div>
            Check-in Datum: {{ checkIn }}
            <br>
            Check-out Datum: {{ checkOut }}
            <br>
            Ausgewähltes Zimmer: {{ selectedRoom }}

        </div>
        <b-button @click="confirmBooking" variant="success">Buchung bestätigen</b-button>
        <b-button @click="editBooking" variant="warning">Bearbeiten</b-button>
        
    </b-modal>
</template>
  
<script setup>
import { defineEmits, defineProps } from 'vue';

const props = defineProps(['checkIn', 'checkOut', 'selectedRoom', 'showConfirmationModal']);
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
