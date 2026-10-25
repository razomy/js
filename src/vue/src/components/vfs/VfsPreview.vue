<template>
  <v-col cols="7" class="h-100 overflow-y-auto bg-grey-lighten-5">
    <div v-if="selectedItem" class="pa-4 h-100">
      <!-- Слот для кастомного шаблона снаружи -->
      <slot name="preview" :item="selectedItem">
        <!-- Дефолтное превью, если слот не передали -->
        <div class="text-center mt-10 text-grey">
          <v-icon size="64">mdi-file-eye-outline</v-icon>
          <h3 class="mt-2">{{ selectedItem.name }}</h3>
          <p class="text-caption">ID: {{ selectedItem.id }}</p>
        </div>
      </slot>
    </div>

    <div v-else class="d-flex align-center justify-center h-100 text-grey">
      Select an item to preview
    </div>
  </v-col>
</template>

<script setup lang="ts">
import type { VfsItem } from './types.ts';

defineProps<{
  selectedItem: VfsItem | null;
}>();
</script>
