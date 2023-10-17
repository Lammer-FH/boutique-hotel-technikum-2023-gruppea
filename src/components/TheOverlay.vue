<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      Buchen Sie ein Zimmer!
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  margin-top: 20px;

}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;

}

@media (min-width: 1024px) {

  .greetings h1,
  .greetings h3 {
    text-align: center;
  }
}

@media (max-width: 768px) {

  .greetings h1,
    .greetings h3 {
      text-align: center;
    }

    .greetings h1 {
      font-size: 2rem;
    }

    .greetings h3 {
      font-size: 1rem;
    }
}

@media (max-width: 576px) {

  .greetings h1 {
    font-size: 1.5rem;
  }

  .greetings h3 {
    font-size: 0.8rem;
  }

}
</style>
