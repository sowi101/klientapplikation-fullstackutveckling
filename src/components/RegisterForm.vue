<script>
import BaseInput from "./BaseInput.vue";
import SubmitButton from "./SubmitButton.vue";

export default {
  name: "RegisterForm",
  components: { BaseInput, SubmitButton },
  data() {
    return {
      user: [],
      error: "",
      success: ""
    };
  },
  methods: {
    // Method to add user
    async addUser() {
      // Empty messages 
      this.error = "";
      this.success = "";

      // Save data from form to a variable
      let userBody = {
        name: this.user.name,
        email: this.user.email,
        password: this.user.password,

      };

      // Fetch to post data to database
      const resp = await fetch("https://garnbollen.herokuapp.com/api/register", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(userBody)
      });

      // Save response from API to variable
      const data = await resp.json();

      // If statement that checks if there are errors and then save messages to a variable.
      if (resp.status === 401) {
        this.error = "<strong>Formuläret är inte korrekt ifyllt.</strong>"
        if (data.error.name != null) {
          this.error += "<li>Du har inte fyllt i något användarnamn.</li>"
        }
        if (data.error.email != null) {
          this.error += "<li>Du har inte fyllt i någon e-postadress/epost-adressen är redan registrerad.</li>"
        }
        if (data.error.password != null) {
          this.error += "<li>Du har inte fyllt i något lösenord.</li>"
        }
      } else if (resp.status === 201) {
        // If statements that checks if there is a successful response from the API and saves a success message to a variable
        this.success = "Registrering slutförd, användare lagrad."

        // Empty form
        this.user.name = "",
        this.user.email = "",
        this.user.password = ""
      }
    }
  }
}
</script>

<template>
  <!-- Form that calls method when submitted -->
  <form @submit.prevent="addUser()">
    <div class="row">
      <div class="mx-auto col-12 col-md-8 col-lg-6">
        <BaseInput id="name" type="text" label="Användarnamn" v-model="user.name" />
      </div>
    </div>

    <div class="row">
      <div class="mx-auto col-12 col-md-8 col-lg-6">
        <!-- Input element for email -->
        <BaseInput id="email" type="email" label="Emailadress" v-model="user.email" />
      </div>
    </div>

    <div class="row">
      <div class="mx-auto col-12 col-md-8 col-lg-6">
        <!-- Input element for password -->
        <BaseInput id="password" type="password" label="Lösenord" v-model="user.password" />
      </div>
    </div>
    <br />
    <div class="row">
      <div class="mx-auto col-12 col-md-8 col-lg-6">
        <!-- Button to submit form -->
        <SubmitButton value="Registrera" class="col-12" />
      </div>
    </div>

    <!-- Printing of message -->
    <div class="mx-auto col-12 col-md-8 col-lg-6 mt-2">
      <p v-if="error != ''" class="alert alert-danger" role="alert">
        <ul v-html="error"></ul>
      </p>
      <p v-if="success != ''" class="alert alert-success" role="alert">{{ success }}</p>
    </div>

    <!-- Link to login page -->
    <p class="mx-auto col-12 col-md-8 col-lg-6 text-center">
      <RouterLink class="text-dark" to="/">Tillbaka till inloggning</RouterLink>
    </p>

  </form>
</template>