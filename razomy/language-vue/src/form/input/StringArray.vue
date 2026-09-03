<template>
  <v-combobox
    v-model="internalValue"
    :label="meta.name || 'Strings'"
    :hint="meta.description"
    persistent-hint
    variant="outlined"
    multiple
    chips
    class="mb-4"
    :readonly="meta.isReadonly"
    :disabled="meta.isDisabled"
    :closable-chips="meta.isDisabled"
    @update:model-value="formatArrayValues"
  >
    <template v-slot:chip="{ props, item }">
      <v-chip v-bind="props" label>
        <template v-slot:append>
          <Copy :value="item"></Copy>
        </template>
      </v-chip>
    </template>
  </v-combobox>
</template>
<script setup lang="ts">
import {computed} from 'vue';
import Copy from '../../components/Copy.vue';
import {type FormNode} from "../constants";

const props = defineProps<FormNode<string[]>>();

const emit = defineEmits(['update:modelValue']);

const internalValue = computed({
  get: () => Array.isArray(props.modelValue) ? props.modelValue : [],
  set: (val) => {
    let newVal = Array.isArray(val) ? val : [val];
    newVal = newVal.map(v => String(v));
    emit('update:modelValue', newVal);
  },
});

const formatArrayValues = (val: any) => {
  let newVal = Array.isArray(val) ? val : [val];
  newVal = newVal.map(v => String(v));

  if (JSON.stringify(newVal) !== JSON.stringify(props.modelValue)) {
    emit('update:modelValue', newVal);
  }
};
</script>
