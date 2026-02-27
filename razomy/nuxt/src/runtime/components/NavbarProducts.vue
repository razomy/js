<template>
  <v-menu location="bottom center" transition="slide-y-transition">
    <template v-slot:activator="{ props }">
      <v-btn :class="isVertical ? '' : 'text-center w-100'" variant="plain" density="compact" stacked v-bind="props">
        <img :alt="t(currentNavigationNode.meta.nameTk)" :src="currentNavigationNode.meta.iconName" class="d-flex mx-auto v-icon" />
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
import { c } from '~~/content/context';
import { useI18n } from '#imports';

const { isVertical = false } = defineProps<{
  isVertical?: boolean;
}>();

const { t } = useI18n();

const navigationNodes = c.externalNavigationRoot.children;
const currentNavigationNode = navigationNodes.find((i) => i.id === c.externalNavigationRoot.id)!;
</script>
