<script setup lang="ts">
import { computed } from 'vue';

export type BadgeRole = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
export type BadgeVariant = 'tonal' | 'flat' | 'outlined';

const props = withDefaults(
  defineProps<{
    label?: string | number;
    role?: BadgeRole;
    entityType?: string;
    variant?: BadgeVariant;
    dot?: boolean;
    clickable?: boolean;
    active?: boolean;
  }>(),
  {
    role: 'primary',
    variant: 'tonal',
    dot: false,
    clickable: false,
    active: false,
  }
);

defineEmits<{
  (e: 'click', ev: MouseEvent): void;
}>();

const resolvedRole = computed<BadgeRole>(() => {
  if (props.entityType) {
    const map: Record<string, BadgeRole> = {
      Person: 'primary',
      Organization: 'secondary',
      Product: 'warning',
      Event: 'error',
      Document: 'info',
      Concept: 'success',
    };
    return map[props.entityType] || props.role;
  }
  return props.role;
});

const vuetifyColor = computed(() => {
  if (resolvedRole.value === 'neutral') return undefined;
  return resolvedRole.value;
});
</script>

<template>
  <v-chip
    size="x-small"
    :color="vuetifyColor"
    :variant="active ? 'flat' : variant"
    :link="clickable"
    label
    class="ds-badge"
    @click="clickable && $emit('click', $event as any)"
  >
    <template v-if="dot" #prepend>
      <v-icon icon="mdi-circle" size="7" class="ds-badge__dot" />
    </template>
    <slot>{{ label }}</slot>
  </v-chip>
</template>

<style scoped>
.ds-badge {
  font-family: var(--ds-font-mono);
  font-weight: 600;
  letter-spacing: 0.02em;
}
.ds-badge__dot {
  margin-inline-end: 4px;
}
</style>
