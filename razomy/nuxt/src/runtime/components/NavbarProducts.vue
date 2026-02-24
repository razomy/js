<template>
  <v-menu
      location="bottom center"
      transition="slide-y-transition">
    <template v-slot:activator="{ props }">
      <v-btn :class="isVertical?'':'text-center w-100'"
             density="compact"
             stacked
             v-bind="props">
        <img :alt="t(currentNavigationNode.meta.labelText)" :src="currentNavigationNode.meta.iconName"
             class="d-flex mx-auto v-icon"/>
        <div>{{ t(currentNavigationNode.meta.labelText) }}</div>
      </v-btn>
    </template>

    <v-list class="rounded-lg" nav>
      <!--      <v-list-subheader class="text-uppercase font-weight-bold text-caption">-->
      <!--        {{ $t('nuxt.breadcrumb.select_category') }}-->
      <!--      </v-list-subheader>-->

      <!-- Loop through the computed navigationNodes -->
      <v-list-item
          v-for="navigationNode in navigationNodes"
          :key="navigationNode.meta.key"
          :active="navigationNode === currentNavigationNode"
          :href="navigationNode.meta.url"
          :value="navigationNode.meta.key"
          color="primary"
      >
        <img :alt="navigationNode.meta.labelText" :src="navigationNode.meta.iconName" class="v-icon"/>
        {{ t(navigationNode.meta.labelText) }}
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script lang="ts" setup>
import {c} from '~~/content/context';
import {useI18n} from '#imports';

const {isVertical = false} = defineProps<{
  isVertical?: boolean
}>();

const {t} = useI18n();

const navigationNodes = c.externalNavigationRoot.children;
const currentNavigationNode = navigationNodes.find(i => i.meta.key === c.externalNavigationRoot.meta.key)!;

</script>
