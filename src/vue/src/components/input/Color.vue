<template>
  <v-text-field
    v-model="internalValue"
    type="color"
    :label="meta.name || 'Color'"
    :hint="meta.description"
    persistent-hint
    variant="outlined"
    class="mb-4"
    :readonly="meta.isReadonly"
    :disabled="meta.isDisabled"
  ></v-text-field>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import type { ColorProps } from './input';

const props = defineProps<ColorProps>();
const emit = defineEmits(['update:modelValue']);
const internalValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});
</script>
