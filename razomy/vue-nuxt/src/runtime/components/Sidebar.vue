<template>
  <rzm-group-sidebar></rzm-group-sidebar>
  <rzm-search-sidebar v-model="model"></rzm-search-sidebar>
</template>

<script setup lang="ts">
const props = defineProps<{ modelValue: boolean }>();
const emit = defineEmits(['update:modelValue']);
const model = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});
</script>

<style scoped>
</style>