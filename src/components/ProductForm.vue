<script>
import BaseInput from "./BaseInput.vue";
import SubmitButton from "./SubmitButton.vue";
import BaseSelect from "./BaseSelect.vue";
import BaseTextarea from "./BaseTextarea.vue";

export default {
    components: { BaseInput, SubmitButton, BaseSelect, BaseTextarea },
    data() {
        return {
            product: [],
            brands: [],
            categories: [],
            error: "",
            success: "",
            data: []
        }
    },
    props: {
        value: String
    },
    methods: {
        // Method to get all brands from database
        async getBrands() {
            // Get token from local storage and save to a variable
            let token = localStorage.getItem('token');

            // Fetch to get all brands from database
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
        // Method to add product to database
        async addProduct() {
            // Empty error and success messages
            this.error = "";
            this.success = "";

            // Get token from local storage and save to a variable
            let token = localStorage.getItem('token');

            // Save data from form to a variable
            let productBody = {
                name: this.product.name,
                article: this.product.article,
                price: this.product.price,
                description: this.product.description,
                category_id: this.product.category_id,
                brand_id: this.product.brand_id,
                amount: this.product.amount
            }

            // Fetch to post data to database
            const resp = await fetch("https://garnbollen.herokuapp.com/api/products", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify(productBody)
            });

            // Save response from API to variable
            const data = await resp.json();

            // If statement that checks if the response from the API has a certain error and saves message to a variable
            if (resp.status === 422) {
                this.error = "<strong>Formuläret är felaktigt ifyllt.</strong>"
                // If statement that checks which errors that has been sent in the response and adds messages to a variable
                if (data.errors.name != null) {
                    this.error += "<li>Du har inte fyllt i något namn på produkten.</li>"
                }
                if (data.errors.article != null) {
                    this.error += "<li>Du har inte fyllt i något artikelnummer på produkten.</li>"
                }
                if (data.errors.price != null) {
                    this.error += "<li>Du har inte fyllt i något pris på produkten.</li>"
                }
                if (data.errors.amount != null) {
                    this.error += "<li>Du har inte fyllt i antalet av produkten.</li>"
                }
                if (data.errors.category_id != null) {
                    this.error += "<li>Du har inte valt någon kategori av produkten.</li>"
                }
                if (data.errors.brand_id != null) {
                    this.error += "<li>Du har inte valt något märke på produkten.</li>"
                }
                if (data.errors.description != null) {
                    this.error += "<li>Du har inte fyllt i någon beskrivning på produkten.</li>"
                }
            } else {
                // Saves success message to variable
                this.success = "Produkten är lagrad i databasen."

                // Empty form
                this.product.name = "",
                this.product.article = "",
                this.product.description = "",
                this.product.category_id = "",
                this.product.brand_id = "",
                this.product.amount = "",
                this.product.price = ""
            }
        }
    },
    mounted() {
        // Call of methods
        this.getBrands();
        this.getCategories();
    }
}
</script>

<template>
    <!-- Form that calls method when submitted -->
    <form @submit.prevent="addProduct()">
        <div class="row">
            <div class="col-12 col-md-6">
                <!-- Input element for product name -->
                <BaseInput label="Namn" type="text" v-model="product.name" />
            </div>
            <div class="col-12 col-md-6">
                <!-- Input element for product article no -->
                <BaseInput label="Artikelnummer" type="number" v-model="product.article" />
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-md-6">
                <!-- Input element for product price -->
                <BaseInput label="Pris" type="number" v-model="product.price" />
            </div>
            <div class="col-12 col-md-6">
                <!-- Input element for product amount -->
                <BaseInput label="Antal" type="number" v-model="product.amount" />
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-md-6">
                <!-- Select element for product category -->
                <BaseSelect :options="categories" label="Kategori" v-model="product.category_id"
                    content="en kategori" />
            </div>
            <div class="col-12 col-md-6">
                <!-- Select element for product brand -->
                <BaseSelect :options="brands" label="Märke" v-model="product.brand_id" content="ett märke" />
            </div>

        </div>
        <div class="row">
            <div class="col-12">
                <!-- Textarea element for product description -->
                <BaseTextarea label="Beskrivning" v-model="product.description" />
            </div>
        </div>
        <br />
        <div class="col-12 col-md-4">
            <!-- Submit button -->
            <SubmitButton class="col-12" value="Spara produkt" />
        </div>
        <br />
        <br />

        <!-- Printing of messages -->
        <p v-if="error != ''" class="alert alert-danger" role="alert">
            <ul v-html="error"></ul>
        </p>
        <p v-if="success != ''" class="alert alert-success" role="alert">{{ success }}</p>
    </form>

</template>