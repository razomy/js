<script setup lang="ts">
import  { Badge, type BadgeRole, type BadgeVariant } from '@razomy/vue';

withDefaults(
  defineProps<{
    label?: string | number;
    color?: string;
    role?: BadgeRole;
    entityType?: string;
    variant?: BadgeVariant;
    active?: boolean;
    clickable?: boolean;
    dot?: boolean;
  }>(),
  {
    role: 'primary',
    variant: 'tonal',
    active: false,
    clickable: false,
    dot: false,
  }
);

defineEmits<{
  (e: 'click', ev: MouseEvent): void;
}>();
</script>

<template>
  <Badge
    :label="label"
    :role="role"
    :entity-type="entityType || (typeof label === 'string' ? label : undefined)"
    :variant="variant"
    :active="active"
    :clickable="clickable"
    :dot="dot"
    @click="$emit('click', $event)"
  >
    <slot>{{ label }}</slot>
  </Badge>
</template>
