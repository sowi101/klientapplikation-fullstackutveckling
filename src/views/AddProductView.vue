<script>
import ProductForm from "../components/ProductForm.vue";

export default {
    components: { ProductForm }
}
</script>

<template>
    <!-- Main content -->
    <main class="d-block mx-auto py-3">
        <h1 class="text-center">Lägg till ny produkt</h1>
        <section class="container-fluid col-12 col-md-10 col-lg-8 py-3">
            <!-- Form to update product -->
            <ProductForm value="Lägg till" />
        </section>
    </main>
</template>