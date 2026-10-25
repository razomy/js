<script setup lang="ts">
import Grid, { type GridGap, type GridPadding } from './Grid.vue';

withDefaults(
  defineProps<{
    as?: string;
    gap?: GridGap;
    padding?: GridPadding;
  }>(),
  {
    as: 'section',
    gap: 'md',
    padding: 'md',
  }
);
</script>

<template>
  <Grid :as="as" variant="container" :gap="gap" :padding="padding">
    <slot />
  </Grid>
</template>