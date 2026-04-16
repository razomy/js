<template>
  <v-card class="pa-4 mb-4" :class="{ 'opacity-80': props.meta.isReadonly }">
    <div class="text-body-large mb-1 font-weight-medium d-flex align-center">
      <v-icon start color="accent" size="small" icon="mdi-code-braces"></v-icon>
      {{ meta.name || '' }}
    </div>
    <div class="text-caption mb-4 text-medium-emphasis" v-if="meta.description">
      {{ meta.description }}
    </div>

    <div v-if="hasProperties" class="pl-2 border-s-sm border-primary">
      <v-row>
        <v-col
          v-for="subParam in properties"
          :key="subParam.shapeIdentifier?.name"
          cols="12"
        >
          <Any :path="[...(path || []), subParam.shapeIdentifier?.name]"/>
        </v-col>
      </v-row>
    </div>
    <div v-else class="text-caption text-medium-emphasis italic">
      No properties defined for this object.
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Any from './Any.vue';
import { useFormInject } from '../useForm';
import * as abstracts from "@razomy/abstracts";
import type {FormNode} from "../constants";

const props = defineProps<FormNode<Record<string, any>>>();

const form = useFormInject();
const schema = computed(() => form.getSchema<abstracts.translators.ObjectShape>(props.path));
const properties = computed(() => schema.value?.properties || []);
const hasProperties = computed(() => properties.value.length > 0);
</script>
