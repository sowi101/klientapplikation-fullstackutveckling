<script>
export default {
  name: "BaseTextarea",
  props: {
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
    }
  }
}
</script>

<template>
  <!-- Label element with two props -->
  <label :for="id" class="form-label fw-bold">{{ label }}</label>
  <!-- Input element with three props and an emit -->
  <textarea :id="id" :value="modelValue" class="form-control"
    @input="$emit('update:modelValue', $event.target.value)"></textarea>
</template>