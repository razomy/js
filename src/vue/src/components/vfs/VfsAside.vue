<template>
  <Grid variant="y" gap="sm">

    <!-- Поиск -->
    <v-toolbar density="compact" color="surface" class="border-b px-2">
      <v-text-field
        v-model="searchQuery"
        prepend-inner-icon="mdi-magnify"
        placeholder="Search files..."
        density="compact"
        variant="solo-filled"
        flat
        hide-details
        clearable
        @update:model-value="onSearch"
      />
    </v-toolbar>

    <!-- Список / Дерево -->
    <v-list density="compact" class="py-0 flex-grow-1 overflow-y-auto">
      <VfsNode
        v-for="item in items"
        :key="item.id"
        :item="item"
        :controller="controller"
        :depth="0"
        :selected-id="selectedItem?.id"
        @select="selectedItem = $event"
      />

      <!-- Пагинация корня -->
      <v-list-item v-if="hasMore" @click="loadMore" class="text-center">
        <v-btn variant="text" size="small" color="primary" :loading="loading"> Load More </v-btn>
      </v-list-item>

      <!-- Пустое состояние -->
      <v-list-item v-if="!loading && items.length === 0">
        <v-list-item-title class="text-grey text-center py-4"> No items found </v-list-item-title>
      </v-list-item>
    </v-list>
    <!--  </v-col>-->
  </Grid>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import type { IVfsController, VfsItem } from './types.ts';
import { useVfsList } from './useVfsList';
import VfsNode from './VfsNode.vue';
import { Grid } from '@razomy/vue';

const props = defineProps<{
  controller: IVfsController;
}>();

const selectedItem = defineModel<VfsItem | null>('selectedItem', { default: null });

const { items, loading, hasMore, searchQuery, fetchItems, loadMore, onSearch } = useVfsList(props.controller, null, 15);

onMounted(() => fetchItems());
</script>
