<template>
  <v-navigation-drawer v-if="!isMobile" :width="100" app border="0" color="" class="content-0 mx-2" permanent>
    <template v-slot:prepend>
      <rzm-navbar-products />
      <v-divider class="mx-2"></v-divider>
      <rzm-language-dropdown-icon></rzm-language-dropdown-icon>
    </template>
    <template v-slot:default>
      <v-tabs v-model="currentNavigationNode1Id" direction="vertical">
        <v-tab
          v-for="navigationNode in navigationNodes1"
          :key="navigationNode.id"
          :value="navigationNode.id"
          :to="localePath(navigationNode.meta.url)"
          align-tabs="center"
          class="w-full justify-center px-0 py-8"
          color="secondary"
          stacked
        >
          <v-icon :icon="navigationNode.meta.iconName" size="18"></v-icon>
          <span class="text-truncate" style="max-width: 80px">{{ t(navigationNode.meta.nameTk) }}</span>
        </v-tab>
      </v-tabs>
    </template>
  </v-navigation-drawer>
  <v-bottom-navigation v-if="isMobile" class="overflow-x-auto w-100" color="secondary" horizontal>
    <rzm-navbar-products :isVertical="true" />

    <v-divider class="my-2" vertical></v-divider>

    <rzm-language-dropdown-icon :isVertical="true"></rzm-language-dropdown-icon>

    <v-btn
      v-for="navigationNode in navigationNodes1"
      :key="navigationNode.id"
      :active="navigationNode.id === currentNavigationNode1Id"
      :to="localePath(navigationNode.meta.url)"
      :value="navigationNode.id"
      align-tabs="center"
      color="secondary"
      stacked
    >
      <v-icon :icon="navigationNode.meta.iconName" size="18"></v-icon>
      {{ t(navigationNode.meta.nameTk) }}
    </v-btn>
  </v-bottom-navigation>
</template>

<script lang="ts" setup>
import { computed, useDisplay, useI18n, useLocalePath, useRoute, watch } from '#imports';
import { c } from '~~/content/context';
import { ref } from 'vue';

const { xs } = useDisplay();
const isMobile = computed(() => xs.value);

const { t } = useI18n();
const localePath = useLocalePath();
const route = useRoute();
const currentNavigationNode1Id = ref<string>();
const navigationNodes1 = c.navigationRoot.children;

watch(
  route,
  (route) => {
    const ls = localePath(route.path);
    currentNavigationNode1Id.value = navigationNodes1.find((i) => {
      const rt = localePath(i.meta.url);
      return ls.startsWith(rt);
    })?.id;
  },
  { immediate: true },
);
</script>
<style scoped></style>
