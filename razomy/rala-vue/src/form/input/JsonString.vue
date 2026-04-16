<template>
  <v-textarea
    v-model="internalValue"
    :label="meta.name || 'JSON'"
    :hint="meta.description"
    persistent-hint
    variant="outlined"
    class="mb-4 text-mono"
    rows="4"
    auto-grow
    :readonly="meta.isReadonly"
    :disabled="meta.isDisabled"
    :error-messages="meta.errorMessage || errorMessage"
    @blur="validateJson"
  ></v-textarea>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import type {FormNode} from "../constants";

const props = defineProps<FormNode<string>>();
const emit = defineEmits(['update:modelValue']);

const errorMessage = ref('');

const formatValue = (val: any) => {
  if (val === undefined || val === null) return '';
  if (typeof val === 'string') {
     try {
       const parsed = JSON.parse(val);
       return JSON.stringify(parsed, null, 2);
     } catch(e) {
       return val;
     }
  }
  return JSON.stringify(val, null, 2);
};

const internalValue = ref(formatValue(props.modelValue));

watch(() => props.modelValue, (newVal) => {
  if (typeof newVal !== 'string' || newVal !== internalValue.value) {
    internalValue.value = formatValue(newVal);
  }
});

const validateJson = () => {
  if (!internalValue.value) {
    errorMessage.value = '';
    emit('update:modelValue', null);
    return;
  }
  try {
    const parsed = JSON.parse(internalValue.value);
    errorMessage.value = '';
    emit('update:modelValue', parsed);
  } catch (e) {
    errorMessage.value = 'Invalid JSON';
  }
};
</script>
<style scoped>
.text-mono :deep(textarea) {
  font-family: monospace;
}
</style>
