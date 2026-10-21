<script setup lang="ts">
import { Form, type FormSyncProps, useForm, useFormModelValueAdapter } from '@razomy/hir-vue';

const props: FormSyncProps =   {
    isLoading: false,
    isReadonly: false,
    modelValue: null,
    schema: null,
  };
const emit = defineEmits(['update:modelValue', 'submit']);
const form = useForm();
useFormModelValueAdapter(props, emit, form);
</script>

<template>
  <Form :form="form" />
  {{form.getValue()}}
</template>
