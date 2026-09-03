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
      <template v-if="types.length > 0">
        <div
          v-for="(_, index) in types"
          :key="index"
          class="mb-4 bg-surface rounded"
        >
          <Any :path="[...(path || []), String(index)]"/>
        </div>
      </template>
      <div v-else class="text-caption text-medium-emphasis italic mb-4">
        Empty tuple definition.
      </div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import {computed} from 'vue';
import Any from './Any.vue';
import { useFormInject } from '../useForm';
import * as abstracts from '@razomy/abstracts';
import type {FormNode} from "../constants";

const props = defineProps<FormNode<any[]>>();

const form = useFormInject();
const schema = computed(() => form.getSchema<abstracts.translators.ArrayShape>(props.path));
const types = computed(() => schema.value?.shapes || []);

</script>
