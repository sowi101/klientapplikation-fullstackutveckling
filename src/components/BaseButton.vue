<script>
export default {
  name: "BaseButton",
  props: {
    text: String,
  }
}
</script>
  
<template>
  <!-- Button element with one prop -->
  <button class="btn btn-color fw-bold">
    {{ text }}
  </button>
</template>

<style scoped>
/* Default colors for BaseButton */
.btn-color {
  background-color: #96BBAE;
  color: #000000;
}

.btn-color:hover {
  background-color: #addaca;
  color: #000000;
}
</style>
  