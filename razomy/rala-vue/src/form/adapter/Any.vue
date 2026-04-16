<template>
  <component
    :is="resolvedComponent"
    :meta="meta"
    :schema="schema"
    :path="path"
    v-model="internalValue"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import {computed} from 'vue';
import {useFormInject} from "../useForm";
import type {WithPath} from "../constants";

const form = useFormInject()
const props = defineProps<WithPath>();
const meta = computed(() => form.getMeta(props.path))
const schema = computed(() => form.getSchema(props.path))
const resolvedComponent = computed(() => form.getComponent(props.path));

const internalValue = computed({
  get: () => form.getValue(props.path),
  set: (val) => form.setValue(val, props.path),
});
</script>
