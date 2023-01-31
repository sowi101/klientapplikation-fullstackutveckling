<script>
import BaseInput from "./BaseInput.vue";
import SubmitButton from "./SubmitButton.vue";

export default {
  components: { BaseInput, SubmitButton },
  data() {
    return {
      name: "",
      error: "",
      success: ""
    }
  },
  props: {
    value: String,
    label: String
  },
  methods: {
    // Method to add category to database
    async addCategory() {
      // Empty messages
      this.error = "";
      this.success = "";

      // Get token from local storage and save to a variable
      let token = localStorage.getItem('token');
      
      // Save data from form to a variable
      let categoryBody = {
        name: this.name,
      };

      // Fetch to post data to database
      const resp = await fetch("https://garnbollen.herokuapp.com/api/categories", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json",
          "Authorization": "Bearer " + token
        },
        body: JSON.stringify(categoryBody)
      });

      // Save response from API to variable
      const data = await resp.json();

      // If statement to check if response from API has errors and save error messages to a variable
      if (resp.status === 422) {
        this.error = "Formuläret är felaktigt ifyllt."
        if (data.errors.name != null) {
          this.error += " Du har inte fyllt i något namn på kategorin."
        }
      } else {
        // Save success message to variable
        this.success = "Kategorin är lagrad i databasen."

        // Empty form
        this.name = ""
      }

      // Emit that category has been added to parent component
      this.$emit("categoryAddedNav");
      this.$emit("categoryAddedList");
    },
    // Method to add brand to database
    async addBrand() {
      // Empty messages
      this.error = "";
      this.success = "";
      
      // Get token from local storage and save to a variable
      let token = localStorage.getItem('token');

      // Save data from form to a variable
      let brandBody = {
        name: this.name,
      };

      // Fetch to post data to database
      const resp = await fetch("https://garnbollen.herokuapp.com/api/brands", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json",
          "Authorization": "Bearer " + token
        },
        body: JSON.stringify(brandBody)
      });

      // Save response from API to variable
      const data = await resp.json();

      // If statement to check if response from API has errors and save error messages to a variable
      if (resp.status === 422) {
        this.error = "Formuläret är felaktigt ifyllt."
        if (data.errors.name != null) {
          this.error += " Du har inte fyllt i något namn på märket."
        }
      } else {
        // Save success message to variable
        this.success = "Märket är lagrad i databasen."

        // Empty form
        this.name = ""
      }

      // Emit to parent component that brand has been added
      this.$emit("brandAddedNav");
      this.$emit("brandAddedList");
    },
    // Method that calls method depending what the form is used for
    handleSubmit(label) {
      // If statement that checks which label that is used
      if (label === "Namn på kategori") {
        this.addCategory();
      } else if (label === "Namn på märke") {
        this.addBrand();
      }
    }
  },
  emits: ["categoryAddedNav", "categoryAddedList", "brandAddedNav", "brandAddedList"]
}
</script>
  

<template>
  <!-- Form that calls a method when submitted -->
  <form @submit.prevent="handleSubmit(label)">
    <div class="row align-items-end">
      <div class="col-12 col-md-8">
        <!-- Input element for category or brand name -->
        <BaseInput id="name" type="text" :label="label" v-model="name" />
      </div>
      <div class="col-12 col-md-4 mt-2">
        <!-- Button to submit form -->
        <SubmitButton class="col-12" :value=value />
      </div>
    </div>

    <!-- Printing of messages -->
    <div class="col-12 mt-2">
      <p v-if="error != ''" class="alert alert-danger " role="alert">{{ error }}</p>
      <p v-if="success != ''" class="alert alert-success" role="alert">{{ success }}</p>
    </div>
  </form>
</template>