<template>
  <v-textarea
    v-model="internalValue"
    :label="meta.name || 'String'"
    :hint="meta.description"
    :readonly="meta.isReadonly"
    :disabled="meta.isDisabled"
    persistent-hint
    variant="outlined"
    class="mb-4"
    rows="3"
    auto-grow
  ></v-textarea>
</template>
<script setup lang="ts">
import {computed} from 'vue';
import {type FormNode} from "../constants";

const props = defineProps<FormNode<string>>();

const emit = defineEmits(['update:modelValue']);
const internalValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});
</script>
