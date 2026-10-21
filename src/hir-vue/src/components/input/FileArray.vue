<template>
  <v-file-input
    v-model="internalValue"
    :label="meta.name || 'Files'"
    :hint="meta.description"
    persistent-hint
    variant="outlined"
    class="mb-4"
    show-size
    multiple
    :readonly="meta.isReadonly"
    :disabled="meta.isDisabled"
    chips
  ></v-file-input>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import type { FileArrayProps } from '../../stores/types';

const props = defineProps<FileArrayProps>();
const emit = defineEmits(['update:modelValue']);
const internalValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});
</script>
