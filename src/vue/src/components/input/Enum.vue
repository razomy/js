<template>
  <v-select
    v-model="internalValue"
    :items="meta.options.items"
    item-title="title"
    item-value="value"
    :label="meta.name || 'Select'"
    :hint="meta.description"
    persistent-hint
    :readonly="meta.isReadonly"
    :clearable="true"
    variant="outlined"
    :disabled="meta.isDisabled"
    density="comfortable"
    hide-details="auto"
    class="mb-4"
  ></v-select>
</template>
<script setup lang="ts">
import {computed} from 'vue';
import type {EnumProps} from "./input";

const props = defineProps<EnumProps>();
const emit = defineEmits(['update:modelValue']);
const internalValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});

</script>
