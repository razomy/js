<template>
  <v-card variant="outlined" class="d-flex flex-column" height="500">
    <v-row no-gutters class="flex-grow-1 overflow-hidden">

      <!-- Левая панель -->
      <VfsAside
        :controller="controller"
        v-model:selectedItem="selectedItem"
      />

      <!-- Правая панель -->
      <VfsPreview :selectedItem="selectedItem">
        <!-- Пробрасываем слот из VfsExplorer в VfsPreview -->
        <template #preview="{ item }">
          <slot name="preview" :item="item" />
        </template>
      </VfsPreview>

    </v-row>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { IVfsController, VfsItem } from './types.ts';
import VfsAside from './VfsAside.vue';
import VfsPreview from './VfsPreview.vue';

defineProps<{
  controller: IVfsController;
}>();

const selectedItem = ref<VfsItem | null>(null);
</script>
