<script>
import LoginForm from "../components/LoginForm.vue";

export default {
    components: { LoginForm }
}
</script>

<template>
    <!-- Main content -->
    <main class="d-block mx-auto py-3">
        <!-- Logotype -->
        <img src="../assets/square_logotype.svg" class="mx-auto col-8 col-md-6 col-lg-3 d-block"
            alt="Garnbollens logotype, ett garnnystan" />
        <h1 class="text-center">Inloggning för administration</h1>
        <section class="container-fluid col-12 col-md-10 col-lg-8 py-3">
            <!-- Form to login user -->
            <LoginForm />
        </section>
    </main>
</template>