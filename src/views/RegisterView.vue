<script>
import RegisterForm from '../components/RegisterForm.vue';

export default {
    components: { RegisterForm },
}
</script>

<template>
    <!-- Main content -->
    <main class="d-block mx-auto py-3">
        <!-- Logotype -->
        <img src="../assets/square_logotype.svg" alt="Garnbollens logotype, ett garnnystan"
            class="mx-auto col-8 col-md-6 col-lg-3 d-block" />
        <h1 class="text-center">Registrera ny användare</h1>
        <section class="container-fluid col-12 col-md-10 col-lg-8 py-3">
            <!-- Form to register new user -->
            <RegisterForm />
        </section>
    </main>
</template>