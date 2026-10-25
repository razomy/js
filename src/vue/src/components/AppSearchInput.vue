<script setup lang="ts">
import {TextInput} from '@razomy/vue';

defineProps<{
  modelValue: string;
  placeholder?: string;
}>();

defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'clear'): void;
}>();
</script>

<template>
  <TextInput
    :model-value="modelValue"
    :placeholder="placeholder || 'Search...'"
    icon="mdi-magnify"
    clearable
    @update:model-value="$emit('update:modelValue', $event)"
    @clear="$emit('clear')"
  />
</template>
