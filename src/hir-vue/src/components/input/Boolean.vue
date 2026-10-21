<template>
  <v-switch
    v-model="internalValue"
    :label="meta.name || internalValue ? 'True' : 'False'"
    :hint="meta.description"
    persistent-hint
    :readonly="meta.isReadonly"
    :disabled="meta.isDisabled"
    color="primary"
    class="mb-4"
    inset
  ></v-switch>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import type { BoolProps } from '../../stores/types';

const props = defineProps<BoolProps>();
const emit = defineEmits(['update:modelValue']);
const internalValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});
</script>
