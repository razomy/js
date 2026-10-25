import { ref, computed } from 'vue';
import type { IVfsController, VfsItem } from './types.ts';

export function useVfsList(
  controller: IVfsController,
  parentId: string | null = null,
  limit = 15
) {
  const items = ref<VfsItem[]>([]);
  const loading = ref(false);
  const page = ref(1);
  const total = ref(0);
  const searchQuery = ref('');

  const hasMore = computed(() => items.value.length < total.value);

  const fetchItems = async (reset = false) => {
    if (reset) {
      page.value = 1;
      items.value = [];
    }
    loading.value = true;
    try {
      const res = await controller.fetchItems({
        parentId,
        search: searchQuery.value || undefined,
        page: page.value,
        limit,
      });
      items.value.push(...res.items);
      total.value = res.total;
    } finally {
      loading.value = false;
    }
  };

  const loadMore = () => {
    page.value++;
    fetchItems(false);
  };

  // Debounce для поиска
  let timeout: ReturnType<typeof setTimeout>;
  const onSearch = () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fetchItems(true), 300);
  };

  return {
    items,
    loading,
    total,
    hasMore,
    searchQuery,
    fetchItems,
    loadMore,
    onSearch,
  };
}
