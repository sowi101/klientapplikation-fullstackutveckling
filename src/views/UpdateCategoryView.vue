<script>
import UpdateSmallForm from '../components/UpdateSmallForm.vue';

export default {
  components: { UpdateSmallForm },
  data() {
    return {
      category: [],
    }
  },
  methods: {
    // Method to fetch data for a category
    async getCategory() {
      // Get token from local storage and save to a variable
      let token = localStorage.getItem('token');

      // Fetch to get data for a certain row in database
      const resp = await fetch("https://garnbollen.herokuapp.com/api/categories/" + this.$route.params.id, {
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
      this.category = data;
    },

  },
  mounted() {
    // Call of method
    this.getCategory();
  },
  emits: ["categoryUpdated"]
}
</script>

<template>
  <!-- Main content -->
  <main class="d-block mx-auto py-3">
    <h1 class="text-center">Ändra kategori</h1>
    <section class="container-fluid col-12 col-md-10 col-lg-8 py-3">
      <!-- Form to update category, shows previous data for category, sends an emit to rerender dropdown list in navigation -->
      <UpdateSmallForm use="updateCategory" :content="category" label="Namn på kategori"
        @categoryUpdated="$emit('categoryUpdated')" />
    </section>
  </main>
</template>