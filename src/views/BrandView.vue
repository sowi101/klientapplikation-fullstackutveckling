<script>
import ProductCard from '../components/ProductCard.vue';

export default {
    data() {
        return {
            products: [],
            brand: []
        };
    },
    methods: {
        // Method to get products for a certain brand
        async getProductsByBrand() {
            // Get token from local storage and save to a variable
            let token = localStorage.getItem('token');

            // Fetch to get data for a certain row in database
            const resp = await fetch("https://garnbollen.herokuapp.com/api/brands/products/" + this.$route.params.id, {
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
            this.products = data;
        },
        // Method to get data for a certain brand
        async getBrandById() {
            // Get token from local storage and save to a variable
            let token = localStorage.getItem('token');

            // Fetch to get data for a certain row in database
            const resp = await fetch("https://garnbollen.herokuapp.com/api/brands/" + this.$route.params.id, {
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
            this.brand = data;
        }
    },
    mounted() {
        // Call of methods
        this.getProductsByBrand();
        this.getBrandById();
    },
    components: { ProductCard }
}
</script>

<template>
    <!-- Main content -->
    <main class="d-block mx-auto py-3">
        <section class="container-fluid col-12 col-md-10 col-lg-8 py-3">
            <h1 class="text-center">{{ brand.name }}</h1>
            <div class="row g-3 py-2">
                <!-- For each loop that print a linked card for every product -->
                <RouterLink v-for="product in products" class="col-12 col-md-6 col-lg-4 text-decoration-none"
                    :to="{ name: 'enskild produkt', params: { id: product.id } }" :key=product.id>
                    <ProductCard use="brand-list" :product="product" class="col" />
                </RouterLink>
            </div>
        </section>
    </main>
</template>