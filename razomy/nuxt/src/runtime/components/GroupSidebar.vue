<template>
  <v-navigation-drawer
      v-if="!isMobile"
      :width="90"
      app
      border="1"
      class="bg-surface-light sidebar"
      permanent
  >
    <template v-slot:prepend>
      <rzm-navbar-products/>
      <v-divider></v-divider>
      <rzm-language-dropdown-icon></rzm-language-dropdown-icon>
    </template>
    <template v-slot:default>
      <v-tabs direction="vertical">
        <v-tab v-for="category in categories0Formats"
               :key="category.key"
               :active="category.key === categorySlug"
               :to="localePath(`/${category.key}`)"
               :value="category.key"
               align-tabs="center"
               class="w-full justify-center px-0 py-8"
               color="secondary"
               stacked>
          <v-icon :icon="category.iconName" size="18"></v-icon>
          {{ t(category.labelText) }}
        </v-tab>
      </v-tabs>
    </template>
  </v-navigation-drawer>
  <v-bottom-navigation
      v-if="isMobile"
      class="overflow-x-auto"
      color="secondary"
      horizontal
  >
    <v-btn v-for="category in categories0Formats"
           :key="category.key"
           :active="category.key === categorySlug"
           :to="localePath(`/${category.key}`)"
           :value="category.key"
           align-tabs="center"
           color="secondary"
           stacked>
      <v-icon :icon="category.iconName" size="18"></v-icon>
      {{ t(category.labelText) }}
    </v-btn>
  </v-bottom-navigation>
</template>

<script lang="ts" setup>
import { useDisplay, useI18n, computed, ref, useLocalePath } from '#imports';
import {c} from '~~/content/context';

const {xs: isMobile} = useDisplay();

const {t} = useI18n();
const localePath = useLocalePath();

const categorySlug = ref<string>('');

const categories0Formats = computed(() => {
  return c.categories;
});

</script>
<style scoped>

</style>