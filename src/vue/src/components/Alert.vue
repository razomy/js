<script setup lang="ts">
withDefaults(
  defineProps<{
    type?: 'info' | 'warning' | 'success' | 'error';
    title?: string;
  }>(),
  {
    type: 'info',
  }
);
</script>

<template>
  <v-alert :type="type" :title="title" variant="tonal" density="compact">
    <slot />
  </v-alert>
</template>