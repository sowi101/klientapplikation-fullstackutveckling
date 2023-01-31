<script>
import BaseButton from './BaseButton.vue';
import NavbarDropdown from './NavbarDropdown.vue';

export default {
  name: "Header",
  data() {
    return {
      categories: [],
      brands: [],
      productlink: "produkter",
      addlink: "lägg till produkt"
    }
  },
  components: { BaseButton, NavbarDropdown },
  methods: {
    // Method to get all categories from database
    async getCategories() {
      // Get token from local storage and save to a variable
      let token = localStorage.getItem('token');

      // Fetch to get all categories from database
      const resp = await fetch("https://garnbollen.herokuapp.com/api/categories", {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json",
          "Authorization": "Bearer " + token
        }
      });
      
      // Save reponse from API to a new variable
      const data = await resp.json();
      
      // Save all objects to an array
      this.categories = data;
    },
    // Method to get all brands from database
    async getBrands() {
      // Method to get all categories from database
      let token = localStorage.getItem('token');

      // Fetch to get all brand from database and save to a variable
      const resp = await fetch("https://garnbollen.herokuapp.com/api/brands", {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json",
          "Authorization": "Bearer " + token
        }
      });
      
      // Save reponse from API to a new variable
      const data = await resp.json();
      
      // Save all objects to an array
      this.brands = data;
    },
    // Method to logout user
    async logoutUser() {
      // Get token from local storage and save to a variable
      let token = localStorage.getItem('token');

      // Fetch to delete token from database
      const resp = await fetch("https://garnbollen.herokuapp.com/api/logout", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json",
          "Authorization": "Bearer " + token
        }
      });

      // Save reponse from API to a new variable
      const data = await resp.json();

      // Clear local storage
      localStorage.clear();

      //Redirection to LoginView
      this.$router.push({ name: 'inloggning' });
    }
  },
  mounted() {
    // Call of methods
    this.getCategories();
    this.getBrands();
  }
}
</script>
  
<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <!-- Logotype -->
        <RouterLink to="/dashboard" class="navbar-brand">
          <img src="../assets/light_logotype.svg" alt="Garnbollens logotype, ett garnnystan" class="img-fluid">
        </RouterLink>

        <!-- Toggle button for mobile menu -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Navigation -->
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav me-auto mb-2 mb-md-0">
            <!-- Link to add products -->
            <li class="nav-item">
              <RouterLink :to="{ name: addlink }" class="nav-link">Lägg till ny produkt</RouterLink>
            </li>
            <!-- Link to show all products -->
            <li class="nav-item">
              <RouterLink :to="{ name: productlink }" class="nav-link">Alla produkter</RouterLink>
            </li>
            <!-- Dropdown navigation to show products for a certain category and link to add and show all categories -->
            <NavbarDropdown :contents="categories" text="Produkter efter kategori" routename="kategori"
              listname="kategorier" listcontent="Lägg till och hantera kategorier" />
              <!-- Dropdown navigation to show products for a certain brand and link to add and show all brands -->
            <NavbarDropdown :contents="brands" text="Produkter efter märke" routename="märke" listname="märken"
              listcontent="Lägg till och hantera märken" />
          </ul>

          <div>
            <!-- Button to logout user, calls method-->
            <BaseButton text="Logga ut" @click="logoutUser()" />
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.navbar-brand {
  width: 15%;
  min-width: 200px
}

img {
  width: 100%;
  min-width: 200px
}
</style>
  