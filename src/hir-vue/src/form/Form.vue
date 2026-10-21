<template>
  <Any :path="[]"/>
</template>

<script setup lang="ts">
import {provide} from 'vue';
import Any from './adapter/Any.vue';
import {defaultFormKey} from "./constants";
import type {Form} from "./useForm";

const props = defineProps<{
  form: Form;
}>();

provide(defaultFormKey, props.form);
</script>
