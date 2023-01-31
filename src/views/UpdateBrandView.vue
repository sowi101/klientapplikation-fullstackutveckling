<script>
import UpdateSmallForm from '../components/UpdateSmallForm.vue';

export default {
  components: { UpdateSmallForm },
  data() {
    return {
      brand: [],
    }
  },
  methods: {
    // Method to fetch data for a brand
    async getBrand() {
      // Get token from local storage and save to a variable
      let token = localStorage.getItem('token');

      // Fetch to get data for a certain row in database
      const resp = await fetch("https://garnbollen.herokuapp.com/api/brands/" + this.$route.params.id, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json",
          "Authorization": "Bearer " + token
        }
      });

      // Save response to a new variable
      const data = await resp.json();
      
      // Save the object to an array
      this.brand = data;
    },

  },
  mounted() {
    // Call of method
    this.getBrand();
  },
  emits: ["brandUpdated"]
}
</script>

<template>
  <!-- Main content -->
  <main class="d-block mx-auto py-3">
    <h1 class="text-center">Ändra märke</h1>
    <section class="container-fluid col-12 col-md-10 col-lg-8 py-3">
      <!-- Form to update brand, shows previous data for brand, sends an emit to rerender dropdown list in navigation -->
      <UpdateSmallForm :content="brand" use="updateBrand" label="Namn på märke" @brandUpdated="$emit('brandUpdated')" />
    </section>
  </main>
</template>