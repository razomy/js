<template>
  <div>
    <!-- Сама строка файла/папки -->
    <v-list-item
      :active="selectedId === item.id"
      :style="{ paddingLeft: `${depth * 16 + 8}px` }"
      density="compact"
      link
      @click="handleClick"
    >
      <template #prepend>
        <v-icon :color="item.isFolder ? 'amber' : 'blue-grey'" class="mr-2">
          {{ iconName }}
        </v-icon>
      </template>

      <v-list-item-title class="text-body-2">{{ item.name }}</v-list-item-title>

      <template #append v-if="loading">
        <v-progress-circular indeterminate size="16" width="2" />
      </template>
    </v-list-item>

    <!-- Дочерние элементы (Сворачиваемые) -->
    <v-expand-transition>
      <div v-if="isOpen && item.isFolder">
        <VfsNode
          v-for="child in items"
          :key="child.id"
          :item="child"
          :controller="controller"
          :depth="depth + 1"
          :selected-id="selectedId"
          @select="$emit('select', $event)"
        />

        <!-- Пагинация внутри папки -->
        <v-list-item
          v-if="hasMore"
          :style="{ paddingLeft: `${(depth + 1) * 16 + 8}px` }"
          density="compact"
          @click.stop="loadMore"
        >
          <v-list-item-title class="text-caption text-primary">
            Load more... ({{ items.length }} / {{ total }})
          </v-list-item-title>
        </v-list-item>
      </div>
    </v-expand-transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { VfsItem, IVfsController } from './types.ts';
import { useVfsList } from './useVfsList';

const props = defineProps<{
  item: VfsItem;
  controller: IVfsController;
  depth: number;
  selectedId?: string;
}>();

const emit = defineEmits<{ (e: 'select', item: VfsItem): void }>();

const isOpen = ref(false);

// Подключаем наш Composable для конкретной папки
const { items, loading, total, hasMore, fetchItems, loadMore } = useVfsList(
  props.controller,
  props.item.id,
  10
);

const iconName = computed(() => {
  if (!props.item.isFolder) return 'mdi-file-outline';
  return isOpen.value ? 'mdi-folder-open' : 'mdi-folder';
});

const handleClick = async () => {
  emit('select', props.item);
  if (props.item.isFolder) {
    isOpen.value = !isOpen.value;
    if (isOpen.value && items.value.length === 0) {
      await fetchItems();
    }
  }
};
</script>
