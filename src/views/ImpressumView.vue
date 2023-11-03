<template>
  <div class="container mt-4">
    <div class="row justify-content-center align-items-center" style="min-height: 100vh">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <!-- Apply animation classes -->
            <h1 class="blue-heading animated fadeIn display-4">Impressum</h1>
            <strong class="animated fadeIn font-weight-bold">
              Responsible for the content:
            </strong>
            <address class="animated fadeIn">
              <strong class="font-weight-normal text-sm">Boutique Hotel GmbH</strong><br />
              <small class="text-sm">
                Lifestreet 12<br />
                22314 Alexandria <br />
                US State Virginia <br />
              </small>
            </address>
            <contact class="animated fadeIn">
              <strong class="font-weight-normal text-sm">Contact</strong><br />
              <small class="text-sm">
                Phone: +1 877 555 331 <br />
                Email: info@boutique-hotels.com <br />
              </small>
            </contact>
            <strong class="animated fadeIn font-weight-bold">
              Commercial register Number
            </strong>
            <p class="animated fadeIn font-weight-normal text-sm">RN 149248B</p>
            <strong class="animated fadeIn font-weight-bold">Commercial Count:</strong>
            <p class="animated fadeIn font-weight-normal text-sm">
              Supreme Court of Virginia
            </p>
            <strong class="animated fadeIn font-weight-bold">
              TaxID Identification Number
            </strong>
            <p class="animated fadeIn font-weight-normal text-sm">EIN33202A</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Impressum",
};
</script>

<style scoped>
.blue-heading {
  color: lightblue;
  font-family: "Arial", sans-serif;
}

@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .smaller-heading {
    font-size: 2rem;
    padding: 0 10px;
    text-align: center;
  }

  .card-body {
    padding: 30px;
  }

  /* Adjust font styles */
  .font-weight-bold {
    font-weight: bold;
  }

  .font-weight-normal {
    font-weight: normal;
  }

  .display-4 {
    font-size: 2.5rem;
  }
}
</style>
