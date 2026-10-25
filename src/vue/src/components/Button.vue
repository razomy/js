<script setup lang="ts">
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';
export type ButtonVariant = 'flat' | 'tonal' | 'outlined' | 'text';
export type ButtonColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'default';

const props = withDefaults(
  defineProps<{
    size?: ButtonSize;
    variant?: ButtonVariant;
    color?: ButtonColor;
    icon?: string;
    prependIcon?: string;
    appendIcon?: string;
    disabled?: boolean;
    loading?: boolean;
    active?: boolean;
    block?: boolean;
    to?: string;
    title?: string;
  }>(),
  {
    size: 'sm',
    variant: 'tonal',
    color: 'primary',
    disabled: false,
    loading: false,
    active: false,
    block: false,
  }
);

defineEmits<{
  (e: 'click', ev: MouseEvent): void;
}>();

const vuetifySizeMap: Record<ButtonSize, string> = {
  xs: 'x-small',
  sm: 'small',
  md: 'default',
  lg: 'large',
};
</script>

<template>
  <v-btn
    :size="vuetifySizeMap[size]"
    :variant="active ? 'flat' : variant"
    :color="color === 'default' ? undefined : color"
    :icon="icon"
    :prepend-icon="prependIcon"
    :append-icon="appendIcon"
    :disabled="disabled"
    :loading="loading"
    :block="block"
    :to="to"
    :title="title"
    class="ds-btn"
    @click="$emit('click', $event)"
  >
    <slot />
  </v-btn>
</template>

<style scoped>
.ds-btn {
  text-transform: none;
  letter-spacing: 0.01em;
  font-weight: 500;
}
</style>