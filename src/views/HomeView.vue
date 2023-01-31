<script>
import ProductCard from '../components/ProductCard.vue';
import BaseButton from '../components/BaseButton.vue';

export default {
    components: { ProductCard, BaseButton },
    data() {
        return {
            products: [],
            addproduct: "lägg till produkt",
            addcategory: "kategorier",
            addbrand: "märken"
        }
    },
    methods: {
        // Method to get all products from database
        async getProducts() {
            // Get token from local storage and save to a variable
            let token = localStorage.getItem('token');

            // Fetch to get all products from database
            const resp = await fetch("https://garnbollen.herokuapp.com/api/products", {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + token
                }
            });

            // Save reponse from API to a new variable
            const data = await resp.json();

            // Save the last six objects to an array
            this.products = data.slice(-6);

            // Reverse the array to get the last product first
            this.products = this.products.reverse();
        }
    },
    mounted() {
        // Call of method
        this.getProducts();
    },
    computed: {
        productsMessage() {
            // If statement that checks if the array with products is empty and saves a message to variable
            if (this.products.length < 1) {
                let message = "Det finns tyvärr inga produkter lagrade.";
                return message;
            }
        }
    }
}
</script>

<template>
    <!-- Main content -->
    <main class="d-block mx-auto py-3">
        <h1 class="text-center">Administration för Garnbollen</h1>

        <!-- Link buttons to pages to add product, category and brand-->
        <div class="container-fluid col-12 col-md-10 col-lg-8 py-3">
            <h2>Snabbåtkomst</h2>
            <div class="row g-3 py-2">
                <RouterLink :to="{ name: addproduct }" class="col-12 col-md-6 col-lg-4">
                    <BaseButton class="btn-lg col-12" text="Lägg till produkt" />
                </RouterLink>
                <RouterLink :to="{ name: addcategory }" class="col-12 col-md-6 col-lg-4">
                    <BaseButton class="btn-lg col-12" text="Lägg till kategori" />
                </RouterLink>
                <RouterLink :to="{ name: addbrand }" class="col-12 col-md-6 col-lg-4">
                    <BaseButton class="btn-lg col-12" text="Lägg till märke" />
                </RouterLink>
            </div>
        </div>

        <!-- Product cards with the last added products -->
        <section class="container-fluid col-12 col-md-10 col-lg-8 py-3">
            <h2>Senast tillagda produkter</h2>
            <p>{{ productsMessage }}</p>
            <div class="row g-3">
                <RouterLink v-for="product in products" class="col-12 col-md-6 col-lg-4 text-decoration-none"
                    :to="{ name: 'enskild produkt', params: {id:product.id}}" :key=product.id>
                    <ProductCard use="product-list" :product=" product" class="col" />
                </RouterLink>
            </div>
        </section>

    </main>
</template>