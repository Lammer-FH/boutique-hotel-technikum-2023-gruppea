<template>
  <div class="home-page">
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="smaller-heading">Willkommen im Boutique Hotel</h1>
        <img src="/src/images/startpicture.jpeg" alt="Hotel Lobby" class="hero-image" />
        <p class="text-below-image">Entdecken Sie pure Luxus- und Entspannungserlebnisse in unserem exklusiven Hotel. Genießen Sie Ihren Aufenthalt in unseren eleganten Zimmern und erstklassigen Annehmlichkeiten.</p>
        <router-link to="/book" class="cta-button">Jetzt buchen</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-page {
  font-family: 'Arial', sans-serif;
  text-align: center;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.hero-image {
  width: 100%;
  height: auto;
}

p {
  font-size: 1.2rem;
  margin-bottom: 30px;
}

.cta-button {
  display: inline-block;
  background: #ff8c42;
  color: white;
  font-size: 1.2rem;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s;
}

.cta-button:hover {
  background: #ff6f00;
}

.smaller-heading {
  font-size: 2rem;
  margin-bottom: 40px;
  padding: 0 20px;
}

.text-below-image {
  font-size: 1.2rem;
  margin-top: 40px;
  padding: 0 20px;
}

</style>
