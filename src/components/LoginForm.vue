<script>
import BaseInput from "../components/BaseInput.vue";
import SubmitButton from "./SubmitButton.vue";

export default {
  components: { BaseInput, SubmitButton },
  name: "LoginForm",
  data() {
    return {
      user: [],
      data: Object,
      error: ""
    };
  },
  methods: {
    // Method to login user
    async loginUser() {
      // Save data from form to a variable
      let userBody = {
        email: this.user.email,
        password: this.user.password,

      };
      // Fetch to post data to database
      const resp = await fetch("https://garnbollen.herokuapp.com/api/login", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json"
        },
        body: JSON.stringify(userBody)
      });

      // Save response from API to variable
      const data = await resp.json();

      // If statement that checks if there are errors and then save messages to a variable.
      if (resp.status === 401) {
        if (data.message === "Valideringsfel") {
          this.error = "<strong>Formuläret är inte korrekt ifyllt.</strong>"
          if (data.error.email != null) {
            this.error += "<li>Du har inte fyllt i någon e-postadress.</li>"
          }
          if (data.error.password != null) {
            this.error += "<li>Du har inte fyllt i något lösenord.</li>"
          }
        } else if (data.message === "Inkorrekt email eller lösenord") {
          this.error = "Inkorrekt email eller lösenord."
        }

      }

      // If statements that checks if there is a successful response from the API
      if (resp.status === 200) {
        // Save token from API to local storage
        localStorage.setItem('token', data.token);

        // Redirection to Dashboard
        this.$router.push({ name: 'start' });
      }
    }
  }
}
</script>

<template>
  <!-- Form to login user that call a method when submitted -->
  <form @submit.prevent="loginUser()">
    <div class="row">
      <div class="mx-auto col-12 col-md-8 col-lg-6">
        <!-- Input element for email -->
        <BaseInput id="email" type="text" label="E-postadress" v-model="user.email" />
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
        <SubmitButton class="col-12" value="Logga in" />
      </div>
    </div>

    <!-- Printing of error message -->
    <div class="mx-auto col-12 col-md-8 col-lg-6 mt-2">
      <p v-if="error != ''" class="alert alert-danger" role="alert">
      <ul v-html="error"></ul>
      </p>
    </div>

    <!-- Link to registration page -->
    <p class="mx-auto col-12 col-md-8 col-lg-6 text-center">
      Ny användare?
      <RouterLink class="text-dark" to="/registrering">Registrera dig här!</RouterLink>
    </p>
  </form>
</template>