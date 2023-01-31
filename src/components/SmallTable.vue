<script>
import BaseButton from './BaseButton.vue';

export default {
  name: "SmallTable",
  components: { BaseButton },
  props: {
    contents: Object,
    method: String
  },
  methods: {
    // Method to delete a certain row from database
    async deleteCategory(id) {
      // Get token from local storage and save to a variable
      let token = localStorage.getItem('token');

      // Fetch to delete data from database
      const resp = await fetch("https://garnbollen.herokuapp.com/api/categories/" + id, {
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
      this.$emit("categoryDeleted");
    },
    // Method to delete a certain row from database
    async deleteBrand(id) {
      // Get token from local storage and save to a variable
      let token = localStorage.getItem('token');

      // Fetch to delete data from database
      const resp = await fetch("https://garnbollen.herokuapp.com/api/brands/" + id, {
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
      this.$emit("brandDeleted");
    }
  },
  //Declaration of emit
  emits: ["categoryDeleted", "brandDeleted"]
}
</script>
  
<template>
  <div class="mx-auto col-12">
    <table class="table table-hover">
      <thead>
        <tr>
          <th>Namn</th>
          <th class="invisible w-10 text-center">Ändra</th>
          <th class="invisible w-10 text-center">Radera</th>
        </tr>
      </thead>
      <tbody>
        <!-- For each loop on table row element that prints information about a category or brand in each row -->
        <tr v-for="content in contents" :content="content" :key="content.id">
          <td class="align-middle">{{ content.name }}</td>
          <!-- If statements that checks the value of a prop and then renders a link button to change category or brand -->
          <td v-if="method === 'category'" class="align-middle text-center">
            <RouterLink :to="{ name: 'uppdatera kategori', params: { id: content.id } }">
              <BaseButton text="Ändra" />
            </RouterLink>
          </td>
          <td v-if="method === 'brand'" class="align-middle text-center">
            <RouterLink :to="{ name: 'uppdatera märke', params: { id: content.id } }">
              <BaseButton text="Ändra" />
            </RouterLink>
          </td>
          <!-- If statements that checks the value of a prop and then renders a button that calls a method to delete category or brand -->
          <td v-if="method === 'category'" class="align-middle text-center">
            <BaseButton class="btn-delete" @click="deleteCategory(content.id)" text="Radera" />
          </td>
          <td v-if="method === 'brand'" class="align-middle text-center">
            <BaseButton class="btn-delete" @click="deleteBrand(content.id)" text="Radera" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.btn-delete {
    background-color: #9e0000;
    color: white;
}

.btn-delete:hover {
    background-color: #b80000;
    color: white;
}

.w-10 {
    width: 10% !important;
  }
  </style>