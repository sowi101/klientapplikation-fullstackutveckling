<script>
import BaseButton from '../components/BaseButton.vue';
import SubmitButton from '../components/SubmitButton.vue';

export default {
    data() {
        return {
            product: [],
            error: "",
            success: ""
        };
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

            // Redirect to ProductListView
            this.$router.push({ name: 'produkter' });
        },
        // Method to update a product (mainly to update amount)
        async updateProduct() {
            // Empty error/success message
            this.error = "";
            this.success = "";

            // Get token from local storage and save to a variable
            let token = localStorage.getItem('token');

            // Save data from form and fetched information to a variable
            let productBody = {
                name: this.product.name,
                article: this.product.article,
                price: this.product.price,
                description: this.product.description,
                amount: this.product.amount,
                category_id: this.product.category_id,
                brand_id: this.product.brand_id
            };

            // Fetch to update a certain row in database
            const resp = await fetch("https://garnbollen.herokuapp.com/api/products/" + this.$route.params.id, {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify(productBody)
            });
            // Save response to a variable
            const data = await resp.json();

            // If statement that checks if there are any errors and saves error or success message to variable.
            if (resp.status === 422) {
                this.error = "Formuläret är felaktigt ifyllt."
                // If statement that checks if error comes from input field for amount
                if (data.errors.amount != null) {
                    this.error += " Du har inte fyllt i antalet av produkten.";
                }
            } else {
                this.success = "Saldot är uppdaterat.";

                // Call to update the printed product information
                this.getProduct();
            }
        }
    },
    mounted() {
        // Call of method
        this.getProduct();
    },
    components: { BaseButton, SubmitButton }
}
</script>

<template>
    <!-- Main content -->
    <main class="d-block mx-auto py-3">
        <h1 class="text-center">{{ product.name }}</h1>
        <section class="container-fluid col-12 col-md-10 col-lg-8 py-3">
            <div class="row gap-3 mx-3">
                <div class="card card-body col-12 col-lg-7 shadow">
                    <!-- Card with short information about the product -->
                    <h2>Information om produkt</h2>
                    <ul class="list-group list-group-flush border-top-0">
                        <li class="list-group-item">
                            <span class="fw-bold">Artikelnummer:</span> {{ product.article }}
                        </li>
                        <li class="list-group-item">
                            <span class="fw-bold">Kategori:</span> {{ product.category_name }}
                        </li>
                        <li class="list-group-item">
                            <span class="fw-bold">Märke:</span> {{ product.brand_name }}
                        </li>
                        <li class="list-group-item">
                            <span class="fw-bold">Pris:</span> {{ product.price }} kr
                        </li>
                        <li class="list-group-item">
                            <span class="fw-bold
                            ">Antal i lager:</span> {{ product.amount }} stycken
                        </li>
                    </ul>
                </div>

                <!-- Card with buttons to update amount, update all information about product and delete product -->
                <div class="card card-body col-12 col-lg-4 shadow">
                    <h2 class="text-center">Hantera produkt</h2>
                    <BaseButton class="mx-auto w-75" text="Ändra saldo" data-bs-toggle="collapse"
                        data-bs-target="#updateAmount" aria-expanded="false" aria-controls="updateAmount" />
                    <br />
                    <RouterLink :to="{ name: 'uppdatera produkt', params: { id: this.$route.params.id } }"
                        class="mx-auto w-75">
                        <BaseButton class="w-100" text="Ändra produkt" />
                    </RouterLink>
                    <br />
                    <BaseButton class="mx-auto btn-delete w-75" text="Radera produkt"
                        @click="deleteProduct(product.id)" />

                </div>
            </div>

            <!-- Collapse card with form to update amount -->
            <div class="collapse row mx-3 my-3" id="updateAmount">
                <div class="card card-body form-group">
                    <h3>Ändra produktsaldo</h3>
                    <!-- Form that calls method updateProduct when submitted -->
                    <form @submit.prevent="updateProduct()">
                        <div class="row align-items-end">
                            <label for="amount" class="col-12 col-form-label fw-bold">Antal i lager</label>
                            <div class="col-12 col-md-8">
                                <input id="amount" type="number" v-model="product.amount" class="form-control" />
                            </div>

                            <div class="col-12 col-md-4 mt-2">
                                <SubmitButton class="col-12" value="Uppdatera saldo" />
                            </div>

                            <br />

                            <!-- Printing of error or success message -->
                            <div class="col-12 mt-2">
                                <p v-if="error != ''" class="alert alert-danger" role="alert">{{ error }}</p>
                                <p v-if="success != ''" class="alert alert-success col-12" role="alert">{{ success }}
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div class="row gap-3 mx-3 my-3">
                <!-- Card with product description -->
                <div class="card card-body shadow col-12">
                    <h2>Beskrivning av produkt</h2>
                    <p>{{ product.description }}</p>
                </div>
            </div>
        </section>
    </main>
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

</style>