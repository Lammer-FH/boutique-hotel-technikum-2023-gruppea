<template>
  <div class="hero-section">
    <div class="hero-content">
      <h1 class="smaller-heading">Über uns</h1>
    </div>
  </div>

  <div class="people-container">
    <div class="team-heading">
      <h2 class="centered-heading">Unser Team</h2>
      <p class="text-justify">Willkommen bei Boutique Hotel - Ihrem exklusiven Ziel für unvergessliche Aufenthalte und
        erstklassigen Service. Wir sind stolz darauf, Ihnen ein Team von Experten präsentieren zu können, das sich mit
        Leidenschaft und Hingabe dafür einsetzt, Ihren Aufenthalt zu einem unvergesslichen Erlebnis zu machen.</p>
      <p class="text-justify">Unsere Leidenschaft für Gastfreundschaft und unser Engagement für Exzellenz sind die
        Eckpfeiler, auf denen Boutique Hotel aufgebaut ist. Jedes Mitglied unseres Teams bringt ein einzigartiges Set von
        Fähigkeiten und Fachwissen mit sich, um sicherzustellen, dass Ihr Aufenthalt unvergesslich wird.</p>
    </div>
    <table class="person-table">
      <tr v-for="(person, index) in team" :key="index">
        <td class="busPic">
          <img :src="person.image" :alt="`${person.firstName} ${person.lastName}`" class="person-image" />
        </td>
        <td class="busPos">
          <h4>{{ person.title }}</h4>
          <p>{{ person.firstName }} {{ person.lastName }}</p>
          <a :href="'mailto:' + person.email">{{ person.email }}</a>
        </td>
      </tr>
    </table>

    <div class="team-heading">
      <h2 class="centered-heading">Unser Hotel</h2>
      <table>
        <tr>
          <td>
            <p class="text-justify-picture">Unsere elegant eingerichteten Zimmer und Suiten bieten einen atemberaubenden
              Blick auf die umliegende Natur und die Stadt. Mit erstklassigem Service und Annehmlichkeiten, darunter ein
              gehobenes Restaurant, ein Wellnessbereich und Tagungsräume, garantieren wir Ihnen einen unvergesslichen
              Aufenthalt.</p>
          </td>
          <td>
            <img src="/src/images/hotel1.jpeg" alt="Bild 1" class="hotel-image" />
          </td>
        </tr>
        <tr>
          <td>
            <p class="text-justify-picture">Erleben Sie die kulinarische Vielfalt in unserem Restaurant, das exquisite
              Gerichte und erlesene Weine serviert. Entspannen Sie im Wellnessbereich, der eine breite Palette von
              Massagen und Schönheitsbehandlungen bietet. Unsere Konferenzräume sind perfekt für geschäftliche
              Veranstaltungen und Tagungen.</p>
          </td>
          <td>
            <img src="/src/images/hotel2.jpeg" alt="Bild 2" class="hotel-image" />
          </td>
        </tr>
      </table>
    </div>


  </div>
</template>

<script>
export default {
  data() {
    return {
      team: [
        {
          title: "Geschäftsführung  ",
          firstName: "Roman",
          lastName: "Höller",
          image: "/src/images/roman.png",
          email: "rh@boutique.com"
        },
        {
          title: "Management",
          firstName: "Kadir",
          lastName: "Yalcin",
          image: "/src/images/kadir.png",
          email: "ky@boutique.com"
        },
        {
          title: "Finanzen",
          firstName: "Gergö",
          lastName: "Jeles",
          image: "/src/images/geri.png",
          email: "gj@boutique.com"
        }
      ]
    };
  }
};
</script>

<style>
.text-justify {
  text-align: justify;
}

.text-justify-picture {
  text-align: justify;
  margin: 10px;
}

.centered-heading {
  text-align: center;
  margin-top: 15px;
  margin-bottom: 15px;
}

.team-heading {
  text-align: center;
}

.people-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.person {
  width: calc(33.33% - 20px);
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

img {
  width: 100px;
  height: 100px;
}

.hotel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;

}

.smaller-heading {
  font-size: 2rem;
  padding: 0 10px;
  text-align: center;
}

.person-table {
  width: 100%;
  background-color: #eeeded;
  border-collapse: separate;
  border-spacing: 5px;
  padding: 10px;
}

.person-table td {
  padding: 10px;
  border: 5px solid #ffffff;
}

.person-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
}

@media (max-width: 768px) {
  .person-table tr {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .busPic,
  .busPos {
    flex: 1;
  }

  .person {
    width: 100%;
  }

  .person-table td {
    width: 100%;
  }
}
</style>
