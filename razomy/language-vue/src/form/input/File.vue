<template>
  <v-file-input
    v-model="internalValue"
    :label="meta.name || 'File'"
    :hint="meta.description"
    persistent-hint
    variant="outlined"
    class="mb-4"
    show-size
    :readonly="meta.isReadonly"
    :disabled="meta.isDisabled"
  ></v-file-input>
</template>
<script setup lang="ts">
import {computed} from 'vue';
import type {FormNode} from "../constants";

const props = defineProps<FormNode<File>>();
const emit = defineEmits(['update:modelValue']);
const internalValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});
</script>
