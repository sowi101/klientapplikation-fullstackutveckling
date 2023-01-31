<script>
import BaseInput from "./BaseInput.vue";
import SubmitButton from "./SubmitButton.vue";

export default {
  name: "UpdateSmallForm",
  components: { BaseInput, SubmitButton },
  data() {
    return {
      error: "",
    }
  },
  props: {
    content: Object,
    use: String,
    label: String
  },
  methods: {
    // Method to update a category
    async updateCategory() {
      // Empty message
      this.error = "";

      // Get token from local storage and save to a variable
      let token = localStorage.getItem('token');

      // Save data from form to a variable
      let categoryBody = {
        name: this.content.name,

      };

      // Fetch to update a certain row in database
      const resp = await fetch("https://garnbollen.herokuapp.com/api/categories/" + this.$route.params.id, {
        method: "PUT",
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json",
          "Authorization": "Bearer " + token
        },
        body: JSON.stringify(categoryBody)
      });
      
      // Save response to a variable
      const data = await resp.json();

      // If statement to check if response from API has errors and save error messages to a variable
      if (resp.status === 422) {
        this.error = "Formuläret är felaktigt ifyllt."
        if (data.errors.name != null) {
          this.error += " Du har inte fyllt i något namn på kategorin."
        }
      } else {
        // Emit to parent component
        this.$emit("categoryUpdated");

        // Redirection to CategoryListView
        this.$router.push({ name: 'kategorier' });
      }
    },
    // Method to update a brand
    async updateBrand() {
      // Empty message
      this.error = "";

      // Get token from local storage and save to a variable
      let token = localStorage.getItem('token');

      // Save data from form to a variable
      let brandBody = {
        name: this.content.name,
      };

      // Fetch to update a certain row in database
      const resp = await fetch("https://garnbollen.herokuapp.com/api/brands/" + this.$route.params.id, {
        method: "PUT",
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json",
          "Authorization": "Bearer " + token
        },
        body: JSON.stringify(brandBody)
      });

      // Save response to a variable
      const data = await resp.json();

      // If statement to check if response from API has errors and save error messages to a variable
      if (resp.status === 422) {
        this.error = "Formuläret är felaktigt ifyllt."
        if (data.errors.name != null) {
          this.error += " Du har inte fyllt i något namn på märket."
        }
      } else {
        // Emit to parent component
        this.$emit("brandUpdated");

        // Redirection to ProductListView
        this.$router.push({ name: 'märken' });
      }
    },
    // Method that calls method depending what the form is used for
    handleSubmit(use) {
      // If statement that checks value of prop
      if (use === "updateCategory") {
        this.updateCategory();
      } else if (use === "updateBrand") {
        this.updateBrand();
      }
    }
  },
  emits: ["categoryUpdated", "brandUpdated"]
}
</script>
  

<template>
  <!-- Form that calls a method when submitted -->
  <form @submit.prevent="handleSubmit(use)">
    <div class="row align-items-end">
      <div class="col-12 col-md-8">
        <!-- Input element for category or brand name -->
        <BaseInput id="name" type="text" :label="label" v-model="content.name" />
      </div>
      <div class="col-12 col-md-4 mt-2">
        <!-- Button to submit form -->
        <SubmitButton class="col-12" value="Spara ändring" />
      </div>
    </div>

    <!-- Printing of message -->
    <div class="col-12 mt-2">
      <p v-if="error != ''" class="alert alert-danger " role="alert">{{ error }}</p>
    </div>
  </form>
</template>