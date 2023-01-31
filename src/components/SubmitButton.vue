<script>
export default {
  name: "SubmitButton",
  props: {
    value: {
      type: String,
      default: "",
    },
  }
}
</script>
  
<template>
  <!-- Button element with one prop -->
  <input type="submit" :value="value" class="btn btn-color text-dark fw-bold" />
</template>

<style scoped>
/* Default colors for SubmitButton */
.btn-color {
  background-color: #96BBAE;
  color: #000000;
}

.btn-color:hover {
  background-color: #addaca;
  color: #000000;
}
</style>
  