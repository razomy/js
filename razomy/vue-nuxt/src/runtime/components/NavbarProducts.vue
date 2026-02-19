<template>
  <v-menu location="bottom center" transition="slide-y-transition">
    <template v-slot:activator="{ props }">
      <v-list density="compact" v-bind="props" class="pa-0">
        <v-list-item density="compact" class="flex flex-col text-center">
          <img class="d-flex mx-auto v-icon" :src="currentCategory.iconUrl" :alt="t(currentCategory.labelKey)"/>
          <div>{{ t(currentCategory.labelKey) }}</div>
          <!--          <rzm-icon class="d-flex mx-auto"></rzm-icon>-->
          <!--            <v-icon name="mdi-chevron-down"></v-icon>-->

          <!--          {{ currentCategoryLabel }}-->
        </v-list-item>
      </v-list>
    </template>

    <v-list nav class="rounded-lg">
      <!--      <v-list-subheader class="text-uppercase font-weight-bold text-caption">-->
      <!--        {{ $t('breadcrumb.select_category') }}-->
      <!--      </v-list-subheader>-->

      <!-- Loop through the computed menuList -->
      <v-list-item
          v-for="item in menuList"
          :key="item.key"
          :href="item.url"
          :active="item === currentCategory"
          color="primary"
          :value="item.key"
      >
        <img :src="item.iconUrl" :alt="item.name" class="v-icon"/>
        {{ t(item.labelKey) }}
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script setup lang="ts">
import {c} from '~~/content/context';
import {computed} from 'vue';

const {t} = useI18n();

interface CategoryItem {
  key: string; // The translation key (e.g., 'nav.dashboard')
  labelKey: string; // The translation key (e.g., 'nav.dashboard')
  iconUrl: string;     // The MDI icon class
  url: string;      // The destination path
}

const currentCategory = c.products.find(i => i.key === 'io');
const menuList = computed(() => {
  return c.products;
});

</script>
