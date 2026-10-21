<template>
  <Any :path="[...path, schema.shape?.['name']
  || schema.shape?.['operator']
  || schema.shape?.['value']
  || schema.value?.['value'] || 'default'
  ]" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Any from './Any.vue';
import { useFormInject } from '../../stores/useForm';
import * as abstractions from '@razomy/abstractions';
import type { FunctionProps } from '../../stores/types';

const props = defineProps<FunctionProps>();

const form = useFormInject();
const schema = computed(() => form.getSchema<abstractions.hir.BindingHirn>(props.path));
</script>
