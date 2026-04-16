<template>
  <v-card class="pa-4 mb-4" :class="{ 'opacity-80': props.meta.isReadonly }">
    <div class="text-body-large mb-1 font-weight-medium d-flex align-center">
      <v-icon start color="accent" size="small" icon="mdi-code-brackets"></v-icon>
      {{ meta.name || '' }}
    </div>
    <div class="text-caption mb-4 text-medium-emphasis" v-if="meta.description">
      {{ meta.description }}
    </div>

    <div class="pl-2 border-s-sm border-secondary">
      <template v-if="internalArray.length > 0">
        <div
          v-for="(_, index) in internalArray"
          :key="index"
          class="d-flex align-start mb-4 bg-surface rounded"
        >
          <div class="flex-grow-1 pr-2">
            <Any :path="[...(path || []), String(index)]" />
          </div>
          <v-btn
            icon="mdi-delete-outline"
            variant="text"
            color="error"
            size="small"
            class="mt-1"
            @click="removeItem(index)"
            v-if="!props.meta.isReadonly"
            title="Remove item"
          ></v-btn>
        </div>
      </template>
      <div v-else class="text-caption text-medium-emphasis italic mb-4">
        Empty array.
      </div>

      <v-btn
        v-if="!props.meta.isReadonly"
        prepend-icon="mdi-plus"
        variant="tonal"
        size="small"
        color="secondary"
        @click="addItem"
      >
        Add Item
      </v-btn>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import {computed} from 'vue';
import Any from './Any.vue';
import { useFormInject } from '../useForm';
import type {FormNode} from "../constants";

const props = defineProps<FormNode<any[]>>();

const form = useFormInject();
const internalArray = computed(() => {
  const val = form.getValue(props.path);
  return Array.isArray(val) ? val : [];
});

function removeItem(index: number) {
  const newArr = [...internalArray.value];
  newArr.splice(index, 1);
  form.setValue(newArr, props.path);
}

function addItem() {
  const newArr = [...internalArray.value];
  newArr.push(undefined);
  form.setValue(newArr, props.path);
}
</script>
