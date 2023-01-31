<script>
import SmallTable from '../components/SmallTable.vue';
import SmallForm from '../components/SmallForm.vue';

export default {
    data() {
        return {
            categories: [],
            method: "",
            label: "",
            value: "",
            message: String,
        };
    },
    methods: {
        // Method to get all categories from database
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
        // Method to call another method and send emit to parent component
        handleEmits() {
            this.getCategories();
            this.$emit("deletedCategoryNav");
        }
    },
    mounted() {
        // Call of method
        this.getCategories();
    },
    components: { SmallTable, SmallForm },
    emits: ["deletedCategoryNav", "categoryAdded"],
    computed: {
        categoriesMessage() {
            // If statement that checks if the array with categories is empty and saves a message to variable
            if (this.categories.length < 1) {
                let message = "Det finns tyvärr inga kategorier lagrade.";
                return message;
            }
        }
    }
}
</script>

<template>
    <!-- Main content -->
    <main class="d-block mx-auto py-3">
        <h1 class="text-center">Garnkategorier</h1>
        <section class="container-fluid col-12 col-md-10 col-lg-8 py-3">
            <h2 class="">Lägg till ny kategori</h2>
            <!-- Form to add a new category, calls a method to rerender list and send an emit to parent component -->
            <SmallForm label="Namn på kategori" value="Spara kategori" use="addCategory"
                @categoryAddedNav="$emit('categoryAdded')" @categoryAddedList="getCategories()" />
        </section>

        <section class="container-fluid col-12 col-md-10 col-lg-8 py-3">
            <h2>Lista på kategorier</h2>
            <p>{{ categoriesMessage }}</p>
            <!-- Table that prints all categories and calls a method -->
            <SmallTable v-if="categories.length > 0" :contents="categories" method="category"
                @categoryDeleted="handleEmits()" />
        </section>
    </main>
</template>

