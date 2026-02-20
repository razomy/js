<template>
  <v-navigation-drawer
      v-if="!isMobile"
      app
      permanent
      border="1"
      :width="90"
      class="bg-surface-light sidebar"
  >
    <template v-slot:prepend>
      <rzm-navbar-products/>
      <v-divider></v-divider>
      <rzm-language-dropdown-icon></rzm-language-dropdown-icon>
    </template>
    <template v-slot:default>
      <v-tabs direction="vertical">
        <v-tab v-for="group in groupedFormats"
               :key="group.key"
               stacked
               class="w-full justify-center px-0 py-8"
               align-tabs="center"
               :value="group.key"
               :to="localePath(`/${group.key}`)"
               :active="group.key === groupSlug"
               color="secondary">
          <v-icon size="18" :icon="group.iconName"></v-icon>
          {{ t(group.labelText) }}
        </v-tab>
      </v-tabs>
    </template>
  </v-navigation-drawer>
  <v-bottom-navigation
      v-if="isMobile"
      color="secondary"
      horizontal
      class="overflow-x-auto"
  >
    <v-btn v-for="group in groupedFormats"
           :key="group.key"
           stacked
           align-tabs="center"
           :value="group.key"
           :to="localePath(`/${group.key}`)"
           :active="group.key === groupSlug"
           color="secondary">
      <v-icon size="18" :icon="group.iconName"></v-icon>
      {{ t(group.labelText) }}
    </v-btn>
  </v-bottom-navigation>
</template>

<script setup lang="ts">
import {c} from '~~/content/context';
const {xs: isMobile} = useDisplay();

const {t} = useI18n();
const localePath = useLocalePath();

const groupSlug = ref<string>('');

const groupedFormats = computed(() => {
  return c.groups;
});

</script>
<style scoped>

</style>