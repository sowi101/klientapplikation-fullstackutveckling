<script>
import SmallTable from '../components/SmallTable.vue';
import SmallForm from '../components/SmallForm.vue';

export default {
    data() {
        return {
            brands: [],
            method: "",
            label: "",
            value: "",
            message: String
        };
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
        // Method to call another method and send emit to parent component
        handleEmits() {
            this.getBrands();
            this.$emit("deletedBrandNav");
        }
    },
    mounted() {
        // Call of method
        this.getBrands();
    },
    components: { SmallTable, SmallForm },
    emits: ["deletedBrandNav", "brandAdded"],
    computed: {
        brandsMessage() {
            // If statement that checks if the array with brands is empty and saves a message to variable
            if (this.brands.length < 1) {
                let message = "Det finns tyvärr inga märken lagrade.";
                return message;
            }
        }
    }
}
</script>

<template>
    <!-- Main content -->
    <main class="d-block mx-auto py-3">
        <h1 class="text-center">Garnmärken</h1>
        <section class="container-fluid col-12 col-md-10 col-lg-8 py-3">
            <h2 class="">Lägg till märke</h2>
            <!-- Form to add a new brand, calls a method to rerender list and send an emit to parent component -->
            <SmallForm label="Namn på märke" value="Spara märke" use="AddBrand" @brandAddedNav="$emit('brandAdded')"
                @brandAddedList="getBrands()" />
        </section>
        <section class="container-fluid col-12 col-md-10 col-lg-8 py-3">
            <h2>Lista på märken</h2>
            <p>{{ brandsMessage }}</p>
            <!-- Table that prints all categories and calls a method -->
            <SmallTable v-if="brands.length > 0" :contents="brands" method="brand" @brandDeleted="handleEmits()" />
        </section>
    </main>
</template>