<script>
import ProductCard from '../components/ProductCard.vue';

export default {
    data() {
        return {
            products: [],
            message: String
        };
    },
    methods: {
        // Method to get all products from database
        async getProducts() {
            // Get token from local storage and save to a variable
            let token = localStorage.getItem('token');

            // Fetch to get all products from database and save to a variable
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
            
            // Save all objects to an array
            this.products = data;
        }
    },
    mounted() {
        // Call of method
        this.getProducts();
    },
    components: { ProductCard },
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
        <h1 class="text-center">Produkter</h1>
        <section class="container-fluid col-12 col-md-10 col-lg-8 py-3">
            <p class="text-center">{{ productsMessage }}</p>
            <div class="row g-3 py-2">
                <!-- For each loop that print a linked card for every product -->
                <RouterLink v-for="product in products" class="col-12 col-md-6 col-lg-4 text-decoration-none"
                    :to="{ name: 'enskild produkt', params: { id: product.id } }" :key=product.id>
                    <ProductCard use="product-list" :product="product" />
                </RouterLink>
            </div>
        </section>
    </main>
</template>
