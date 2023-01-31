<script>
export default {
  name: "BaseSelect",
  props: {
    content: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    modelValue: {
      type: [String, Number],
      default: "",
    },
    options: Object,
  }
}
</script>

<template>
  <!-- Label element with two props -->
  <label :for="id" class="form-label fw-bold">{{ label }}</label>
  <!-- Select element with two props -->
  <select :id="id" :value="modelValue" class="form-select" @input="$emit('update:modelValue', $event.target.value)">
    <!-- Disabeld option element with one prop-->
    <option disabled value="">Välj {{ content }}</option>
    <!-- For each loop on option element with two props -->
    <option v-for="option in options" :value="option.id">{{ option.name }}</option>
  </select>
</template>