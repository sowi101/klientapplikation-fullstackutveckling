<script>
export default {
    name: "NavbarDropdown",
    props: {
        contents: Object,
        text: String,
        routename: String,
        listcontent: String,
        listname: String,
    }
};
</script>

<template>
    <!-- List with nested list for dropdown navigation -->
    <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">{{ text }}</a>
        <ul class="dropdown-menu">
            <!-- For each loop on list element with one props -->
            <li v-for="content in contents" :content="content" :key="content.id">
                <!-- Link to page which shows all product in a certain category/brand with three props -->
                <RouterLink :to="{ name: routename, params: { id: content.id } }" class="dropdown-item">{{ content.name }}
                </RouterLink>
            </li>
            <li>
                <hr class="dropdown-divider">
            </li>
            <li>
                <!-- Link to page with a form to add category or brand and list of categories or brands -->
                <RouterLink :to="{ name: listname }" class="dropdown-item">{{ listcontent }}</RouterLink>
            </li>
        </ul>
    </li>
</template>