<template>
  <div class="d-flex align-center flex-wrap justify-start gap-1">
    <slot></slot>

    <v-btn
        :to="localePath('/')"
        density="compact"
        icon="mdi-home"
        variant="text"
    />

    <!-- 2. DYNAMIC BREADCRUMB LEVELS -->
    <template v-for="(level, index) in breadcrumbLevels" :key="index">

      <!-- Separator -->
      <v-icon class="mx-1" icon="mdi-chevron-right" opacity="50" size="small"/>

      <!-- MENU 1: SWITCH CURRENT (Route Exists) -->
      <v-menu v-if="level.selectedNavigationNode"
              location="bottom center"
              max-height="350"
              transition="slide-y-transition">
        <template v-slot:activator="{ props }">
          <v-btn
              append-icon="mdi-chevron-down"
              class="text-none px-2"
              density="compact"
              v-bind="props"
              variant="text"
          >
            {{ t(level.selectedNavigationNode.meta.labelText) }}
          </v-btn>
        </template>

        <!-- Dropdown List to Switch to a Sibling NavigationNode -->
        <v-list class="rounded-lg elevation-4 min-w-150" density="compact" nav>
          <v-list-item
              v-for="navigationNode in level.navigationNodes"
              :key="navigationNode.meta.key"
              :active="level.selectedNavigationNode.meta.key === navigationNode.meta.key"
              :prepend-icon="navigationNode.meta.iconName"
              :title="t(navigationNode.meta.labelText)"
              :to="localePath(navigationNode.meta.url)"
              color="primary"
          />
        </v-list>
      </v-menu>

      <!-- MENU 2: ADD CHILD (Route Not Exists / PLUS Button) -->
      <v-menu v-else location="bottom center" max-height="350" transition="slide-y-transition">
        <template v-slot:activator="{ props }">
          <v-btn
              class="mx-1"
              color="primary"
              density="comfortable"
              icon="mdi-plus"
              size="small"
              v-bind="props"
              variant="text"
          />
        </template>

        <!-- Dropdown List of Child Categories to Add Sub-Route -->
        <v-list class="rounded-lg elevation-4 min-w-150" density="compact" nav>
          <v-list-item
              v-for="navigationNode in level.navigationNodes"
              :key="navigationNode.meta.key"
              :prepend-icon="navigationNode.meta.iconName"
              :title="t(navigationNode.meta.labelText)"
              :to="localePath(navigationNode.meta.url)"
              color="primary"
          />
        </v-list>
      </v-menu>

    </template>
  </div>
</template>

<script lang="ts" setup>
import {computed} from 'vue';
import {useI18n, useLocalePath, useRoute} from '#imports';
import type {NavigationNode} from '@razomy/nuxt/runtime/functions';

const {navigationRoot} = defineProps<{
  navigationRoot: NavigationNode
}>();

const route = useRoute();
const localePath = useLocalePath();
const {t} = useI18n();

/**
 * Normalizes paths by removing trailing slashes to ensure accurate comparisons
 */
const normalizePath = (path: string) => path.replace(/\/$/, '');


/**
 * Dynamically traverses the tree and calculates breadcrumb levels
 */
const breadcrumbLevels = computed(() => {
  const levels: {
    navigationNodes: NavigationNode[],
    selectedNavigationNode: NavigationNode | null
  }[] = [];

  let currentNavigationNodes = [navigationRoot];
  const currentPath = normalizePath(route.path);

// debugger;
  // Traverse down as long as there are child navigationNodes available
  while (currentNavigationNodes.length > 0) {
    // 1. Try to find a matched route in Categories
    let matchedItem = currentNavigationNodes.find(opt => {
      const optPath = normalizePath(localePath(opt.meta.url));
      return currentPath === optPath || currentPath.startsWith(optPath + '/');
    });

    // 2. Push the level state to the UI array
    levels.push({
      navigationNodes: currentNavigationNodes,
      selectedNavigationNode: matchedItem || null
    });

    // 3. If we found a match, dig deeper into its children for the next iteration
    if (matchedItem) {
      currentNavigationNodes = matchedItem.children;
    } else {
      // Reached the end of the matched URL.
      // The currently pushed level has `selectedNavigationNode: null` so it will render the PLUS button (MENU 2).
      break;
    }
  }

  return levels;
});
</script>

<style scoped>
.gap-1 {
  gap: 4px;
}

.min-w-150 {
  min-width: 150px;
}
</style>
