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
        <v-tab v-for="group in groupedFormats"
               :key="group.key"
               :active="group.key === groupSlug"
               :to="localePath(`/${group.key}`)"
               :value="group.key"
               align-tabs="center"
               class="w-full justify-center px-0 py-8"
               color="secondary"
               stacked>
          <v-icon :icon="group.iconName" size="18"></v-icon>
          {{ t(group.labelText) }}
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
    <v-btn v-for="group in groupedFormats"
           :key="group.key"
           :active="group.key === groupSlug"
           :to="localePath(`/${group.key}`)"
           :value="group.key"
           align-tabs="center"
           color="secondary"
           stacked>
      <v-icon :icon="group.iconName" size="18"></v-icon>
      {{ t(group.labelText) }}
    </v-btn>
  </v-bottom-navigation>
</template>

<script lang="ts" setup>
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