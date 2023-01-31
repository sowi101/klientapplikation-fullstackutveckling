<script>
export default {
  name: "BaseInput",
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
      default: ""
    },
    type: {
      type: String,
      default: "text",
    },
  }
}
</script>

<template>
  <!-- Label element with two props -->
  <label :for="id" class="form-label fw-bold">{{ label }}</label>
  <!-- Input element with three props and an emit -->
  <input :id="id" :type="type" :value="modelValue" class="form-control"
    @input="$emit('update:modelValue', $event.target.value)" />
</template>