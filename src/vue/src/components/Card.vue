<script setup lang="ts">
import { Grid, type GridGap, type GridPadding } from '@razomy/vue';

withDefaults(
  defineProps<{
    padding?: GridPadding;
    gap?: GridGap;
    interactive?: boolean;
    selected?: boolean;
    elevated?: boolean;
    fullHeight?: boolean;
  }>(),
  {
    padding: 'md',
    gap: 'sm',
    interactive: false,
    selected: false,
    elevated: false,
    fullHeight: false,
  },
);

defineEmits<{
  (e: 'click', ev: MouseEvent): void;
}>();
</script>

<template>
  <Grid
    variant="y"
    :padding="padding"
    :gap="gap"
    :surface="elevated ? 'elevated' : 'default'"
    border="all"
    rounded
    :interactive="interactive"
    :selected="selected"
    :full-height="fullHeight"
    @click="$emit('click', $event)"
  >
    <slot />
  </Grid>
</template>
