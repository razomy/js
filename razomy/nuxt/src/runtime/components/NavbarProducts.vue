<template>
  <v-menu location="bottom center" transition="slide-y-transition">
    <template v-slot:activator="{ props }">
      <v-list class="pa-0" density="compact" v-bind="props">
        <v-list-item class="flex flex-col text-center" density="compact">
          <img :alt="t(currentCategory.labelText)" :src="currentCategory.iconUrl" class="d-flex mx-auto v-icon"/>
          <div>{{ t(currentCategory.labelText) }}</div>
          <!--          <rzm-icon class="d-flex mx-auto"></rzm-icon>-->
          <!--            <v-icon name="mdi-chevron-down"></v-icon>-->

          <!--          {{ currentCategoryLabel }}-->
        </v-list-item>
      </v-list>
    </template>

    <v-list class="rounded-lg" nav>
      <!--      <v-list-subheader class="text-uppercase font-weight-bold text-caption">-->
      <!--        {{ $t('vue-nuxt.breadcrumb.select_category') }}-->
      <!--      </v-list-subheader>-->

      <!-- Loop through the computed menuList -->
      <v-list-item
          v-for="item in menuList"
          :key="item.key"
          :active="item === currentCategory"
          :href="item.url"
          :value="item.key"
          color="primary"
      >
        <img :alt="item.labelText" :src="item.iconUrl" class="v-icon"/>
        {{ t(item.labelText) }}
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script lang="ts" setup>
import {c} from '~~/content/context';
import {computed} from 'vue';

const {t} = useI18n();

interface CategoryItem {
  key: string; // The translation key (e.g., 'nav.dashboard')
  labelText: string; // The translation key (e.g., 'nav.dashboard')
  iconUrl: string;     // The MDI icon class
  url: string;      // The destination path
}

const currentCategory = c.products.find(i => i.key === 'io')!;
const menuList = computed(() => {
  return c.products;
});

</script>
