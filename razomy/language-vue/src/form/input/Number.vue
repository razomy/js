<template>
  <v-text-field
    v-model.number="internalValue"
    type="number"
    :label="meta.name || 'Number'"
    :hint="meta.description"
    :readonly="meta.isReadonly"
    :disabled="meta.isDisabled"
    persistent-hint
    variant="outlined"
    class="mb-4"
  ></v-text-field>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import {type FormNode} from "../constants";

const props = defineProps<FormNode<number>>();
const emit = defineEmits(['update:modelValue']);
const internalValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});
</script>
