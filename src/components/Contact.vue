<template>
  <div class="contact-container">
    <h2 class="contacth2">Kontakt</h2>
    <p>
      <i class="bi bi-envelope"></i>
      <a href="mailto:contact@buotique-hotel.at">contact@buotique-hotel.at</a>
    </p>
    <p>
      <i class="bi bi-telephone"></i>
      <a href="tel:+431234567890">+43 1 234 567 890</a>
    </p>

    <form @submit.prevent="sendContactForm">
      <div class="mb-3">
        <label for="name" class="form-label">Name:</label>
        <input id="name" class="form-control" v-model="contactForm.name" required />
      </div>

      <div class="mb-3">
        <label for="email" class="form-label">E-Mail:</label>
        <input id="email" type="email" class="form-control" v-model="contactForm.email" required />
      </div>

      <div class="mb-3">
        <label for="message" class="form-label">Nachricht:</label>
        <textarea id="message" class="form-control" v-model="contactForm.message" required></textarea>
      </div>

      <button type="submit" class="btn btn-primary">Senden</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const contactForm = ref({
  name: '',
  email: '',
  message: ''
});

const sendContactForm = () => {
  // Logik zum Senden des Kontaktformulars, z.B. über axios
};
</script>

<style scoped>
.contact-container {
  /* Dein CSS hier */
}

h2.contacth2 {
  border-bottom: var(--bs-modal-header-border-width) solid var(--bs-modal-header-border-color);
  margin-top: 2rem;
  font-size: larger;
  padding: 0;
}

.social-media-icons i{
  margin: 1rem 0 1rem 0;
  font-size: 24px;

}
i.bi.bi-envelope,
i.bi.bi-telephone {
  font-size: large;
  display: inline;
}
</style>
