<script setup lang="ts">
defineProps<{
  vertical?: boolean;
}>();
</script>

<template>
  <v-divider :vertical="vertical" />
</template>