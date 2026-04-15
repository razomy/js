<template>
  <v-menu location="bottom center" transition="slide-y-transition">
    <template v-slot:activator="{ props }">
      <v-btn :class="isVertical ? '' : 'text-center w-100'" density="compact" stacked v-bind="props" variant="plain">
        <img
          :alt="t(currentNavigationNode.meta.nameTk)"
          :src="currentNavigationNode.meta.iconName"
          class="d-flex mx-auto v-icon"
        />
        <div>{{ t(currentNavigationNode.meta.nameTk) }}</div>
      </v-btn>
    </template>

    <v-list class="rounded-lg" nav>
      <!--      <v-list-subheader class="text-uppercase font-weight-bold text-caption">-->
      <!--        {{ $t('nuxt.breadcrumb.select_category') }}-->
      <!--      </v-list-subheader>-->

      <!-- Loop through the computed navigationNodes -->
      <v-list-item
        v-for="navigationNode in navigationNodes"
        :key="navigationNode.id"
        :active="navigationNode === currentNavigationNode"
        :href="navigationNode.meta.url"
        :value="navigationNode.id"
        color="primary"
      >
        <img :alt="t(navigationNode.meta.nameTk)" :src="navigationNode.meta.iconName" class="v-icon" />
        {{ t(navigationNode.meta.nameTk) }}
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script lang="ts" setup>
import { useRzmRuntimeConfigState, useI18n } from '#imports';

const { c } = useRzmRuntimeConfigState();
const { isVertical = false } = defineProps<{
  isVertical?: boolean;
}>();

const { t } = useI18n();

const navigationNodes = c.value.externalNavigationRoot.children;
const currentNavigationNode = navigationNodes.find((i) => i.id === c.value.externalNavigationRoot.id)!;
</script>
