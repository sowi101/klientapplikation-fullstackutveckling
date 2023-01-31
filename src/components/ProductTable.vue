<script>
import BaseButton from './BaseButton.vue';

export default {
  name: "ProductTable",
  components: { BaseButton },
  props: {
    products: Object
  },
  methods: {
    // Method to delete a certain row from database
    async deleteProduct(id) {
      // Get token from local storage and save to a variable
      let token = localStorage.getItem('token');

      // Fetch to delete data from database
      const resp = await fetch("https://garnbollen.herokuapp.com/api/products/" + id, {
        method: "DELETE",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        }
      });
      
      // Save response from API to database
      const data = await resp.json();
      
      // Emit to parent component when product has been deleted
      this.$emit("productDeleted");
    }
  },
  //Declaration of emit
  emits: ["productDeleted"]
}
</script>
  
<template>
  <table class="table table-hover w-50">
    <thead>
      <tr>
        <th>Artikelnr</th>
        <th>Namn</th>
        <th>Pris</th>
        <th>Antal i lager</th>
        <th>Kategori</th>
        <th>Märke</th>
        <th class="invisible w-10">Ändra</th>
        <th class="invisible w-10">Radera</th>
      </tr>
    </thead>
    <tbody>
      <!-- For each loop on table row element that prints information about a product in each row -->
      <tr v-for="product in products" :product="product" :key="product.id">
        <td class="align-middle">{{ product.article }}</td>
        <td class="align-middle">{{ product.name }}</td>
        <td class="align-middle">{{ product.price }}</td>
        <td class="align-middle">{{ product.amount }}</td>
        <td class="align-middle">{{ product.category_name }}</td>
        <td class="align-middle">{{ product.brand_name }}</td>
        <td class="align-middle">
          <!-- Link to page to update product -->
          <RouterLink :to="{ name: 'uppdatera produkt', params: { id: product.id } }">
            <BaseButton text="Ändra" />
          </RouterLink>
        </td>
        <td class="align-middle">
          <!-- Button that calls method to delete product -->
          <BaseButton @click="deleteProduct(product.id)" text="Radera" />
        </td>
      </tr>
    </tbody>
  </table>
</template>