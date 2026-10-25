<script setup lang="ts">
import {Grid} from '@razomy/vue';
import {Body} from '@razomy/vue';
import type { TextColor } from '@razomy/vue';

withDefaults(
  defineProps<{
    label: string;
    value: string | number;
    color?: TextColor;
    icon?: string;
  }>(),
  {
    color: 'primary',
  }
);
</script>

<template>
  <Grid variant="x_1fr_auto" padding="sm" surface="panel" border="all" rounded gap="xs">
    <Grid variant="y" gap="xss">
      <Body variant="xxsMono" color="muted" uppercase>{{ label }}</Body>
      <Body variant="lgBold" :color="color">{{ value }}</Body>
    </Grid>
    <v-icon v-if="icon" :icon="icon" size="20" :color="color === 'default' ? 'primary' : color" />
  </Grid>
</template>
