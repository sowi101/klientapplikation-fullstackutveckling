<script>
export default {
  name: "ProductCard",
  props: {
    product: Object,
    use: ""
  }
}
</script>

<template>
  <!-- Div element styled as card -->
  <div class="card text-dark text-decoration-none">
    <div class="card-body">
      <!-- Card title -->
      <h2 class="card-title">{{ product.name }}</h2>
      <!-- Card subtitle -->
      <h3 class="card-subtitle mb-2 text-muted">Artikelnummer {{ product.article }}</h3>
      <!-- List group -->
      <ul class="list-group list-group-hover list-group-flush">
        <!-- If statements on list elements that check if the product card is used on page with all products or the latest products -->
        <li v-if="use === 'product-list'" class="list-group-item border-0 px-0">{{ product.category_name }}</li>
        <li v-if="use === 'product-list'" class="list-group-item border-0 px-0">{{ product.brand_name }}</li>
        <li class="list-group-item border-0 px-0">{{ product.price }} kr</li>
        <li class="list-group-item border-0 px-0">{{ product.amount }} st i lager</li>
      </ul>
    </div>
    <div class="card-footer">
      <!-- Card footer with a shorter date -->
      <small class="text-muted">Tillagd {{ product.created_at.slice(0, 10) }}</small>
    </div>
  </div>
</template>

<style scoped>
.card:hover {
  box-shadow: 5px 5px 10px #96BBAE;
}

h2 {
  font-size: 20px;
}

h3 {
  font-size: 18px;
}
</style>