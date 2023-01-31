<script>
import UpdateProductForm from '../components/UpdateProductForm.vue';

export default {
  components: { UpdateProductForm },
  data() {
    return {
      product: [],
    }
  },
  methods: {
    // Method to get data for a product
    async getProduct() {
      // Get token from local storage and save to a variable
      let token = localStorage.getItem('token');

      // Fetch to get data for a certain row in database
      const resp = await fetch("https://garnbollen.herokuapp.com/api/products/" + this.$route.params.id, {
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
      this.product = data;
    },
  },
  mounted() {
    // Call of method
    this.getProduct();
  }
}
</script>

<template>
  <!-- Main content -->
  <main class="d-block mx-auto py-3">
    <h1 class="text-center">Ändra produkt</h1>
    <section class="container-fluid col-12 col-md-10 col-lg-8 py-3">
      <!-- Form to update product, shows previous data for product -->
      <UpdateProductForm :product="product" />
    </section>
  </main>
</template>