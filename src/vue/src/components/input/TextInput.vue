<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue: string | number;
    placeholder?: string;
    label?: string;
    icon?: string;
    clearable?: boolean;
    mono?: boolean;
  }>(),
  {
    placeholder: '',
    clearable: false,
    mono: false,
  }
);

defineEmits<{
  (e: 'update:modelValue', val: string): void;
  (e: 'clear'): void;
  (e: 'enter'): void;
}>();
</script>

<template>
  <v-text-field
    :model-value="modelValue"
    :placeholder="placeholder"
    :label="label"
    :prepend-inner-icon="icon"
    :clearable="clearable"
    variant="outlined"
    density="compact"
    color="primary"
    hide-details
    :class="{ 'ds-input--mono': mono }"
    @update:model-value="$emit('update:modelValue', String($event ?? ''))"
    @click:clear="$emit('clear')"
    @keyup.enter="$emit('enter')"
  />
</template>

<style scoped>
.ds-input--mono :deep(input) {
  font-family: var(--ds-font-mono);
  font-size: 0.78rem;
}
</style>