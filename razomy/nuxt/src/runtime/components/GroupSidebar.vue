<template>
  <v-navigation-drawer
      v-if="!isMobile"
      :width="90"
      app
      border="1"
      class="bg-background sidebar"
      permanent
  >
    <template v-slot:prepend>
      <rzm-navbar-products/>
      <v-divider class="mx-2"></v-divider>
      <rzm-language-dropdown-icon></rzm-language-dropdown-icon>
    </template>
    <template v-slot:default>
      <v-tabs direction="vertical">
        <v-tab v-for="navigationNode in navigationNodes1Formats"
               :key="navigationNode.meta.key"
               :active="navigationNode.meta.key === routeNodeKey"
               :to="localePath(navigationNode.meta.url)"
               :value="navigationNode.meta.key"
               align-tabs="center"
               class="w-full justify-center px-0 py-8"
               color="secondary"
               stacked>
          <v-icon :icon="navigationNode.meta.iconName" size="18"></v-icon>
          {{ t(navigationNode.meta.labelText) }}
        </v-tab>
      </v-tabs>
    </template>
  </v-navigation-drawer>
  <v-bottom-navigation
      v-if="isMobile"
      class="overflow-x-auto w-100"
      color="secondary"
      horizontal
  >
    <rzm-navbar-products :isVertical="true"/>

    <v-divider vertical class="my-2"></v-divider>

    <rzm-language-dropdown-icon :isVertical="true"></rzm-language-dropdown-icon>

    <v-btn v-for="navigationNode in navigationNodes1Formats"
           :key="navigationNode.meta.key"
           :active="navigationNode.meta.key === routeNodeKey"
           :to="localePath(navigationNode.meta.url)"
           :value="navigationNode.meta.key"
           align-tabs="center"
           color="secondary"
           stacked>
      <v-icon :icon="navigationNode.meta.iconName" size="18"></v-icon>
      {{ t(navigationNode.meta.labelText) }}
    </v-btn>
  </v-bottom-navigation>
</template>

<script lang="ts" setup>
import {computed, ref, useDisplay, useI18n, useLocalePath} from '#imports';
import {c} from '~~/content/context';

const {xs} = useDisplay();
const isMobile = computed(() => xs.value);

const {t} = useI18n();
const localePath = useLocalePath();

const routeNodeKey = ref<string>('');

const navigationNodes1Formats = c.navigationRoot.children;

</script>
<style scoped>

</style>