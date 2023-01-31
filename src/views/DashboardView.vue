<script>
import { RouterLink, RouterView } from "vue-router";
import Header from "../components/Header.vue";

export default {
    components: { Header, RouterLink, RouterView },
    methods: {
        // Method to call methods in a child component
        callMethod() {
            this.$refs.navigation.getCategories();
            this.$refs.navigation.getBrands();
        }
    },
}
</script>

<template>
    <!-- Header komponent with logotype and navigation -->
    <Header ref="navigation" />
    <!-- RouterView component that will render the main element, calls a method when emits are received -->
    <RouterView :key="$route.path" @categoryAdded="callMethod()" @categoryUpdated="callMethod()"
        @deletedCategoryNav="callMethod()" @brandAdded="callMethod()" @brandUpdated="callMethod()"
        @deletedBrandNav="callMethod()" />
</template>