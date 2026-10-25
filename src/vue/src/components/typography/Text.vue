<script setup lang="ts">
import { computed } from 'vue';
import { cm } from '@razomy/vue';

export type TextColor =
  | 'default'
  | 'muted'
  | 'light'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';

const props = withDefaults(
  defineProps<{
    as?: string;
    variantClass?: string;
    color?: TextColor;
    truncate?: boolean;
    uppercase?: boolean;
    mono?: boolean;
  }>(),
  {
    as: 'span',
    variantClass: '',
    color: 'default',
    truncate: false,
    uppercase: false,
    mono: false,
  }
);

const computedClass = computed(() =>
  cm(
    'ds-text',
    props.variantClass,
    `ds-text--color-${props.color}`,
    {
      'ds-text--truncate': props.truncate,
      'ds-text--uppercase': props.uppercase,
      'ds-text--mono': props.mono,
    }
  )
);
</script>

<template>
  <component :is="as" :class="computedClass">
    <slot />
  </component>
</template>

<style scoped>
.ds-text {
  margin: 0;
  padding: 0;
}

/* Role-based Adaptive Colors */
.ds-text--color-default {
  color: rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity, 0.9));
}
.ds-text--color-muted {
  color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity, 0.65));
}
.ds-text--color-light {
  color: rgba(var(--v-theme-on-surface), 0.45);
}
.ds-text--color-primary {
  color: rgb(var(--v-theme-primary));
}
.ds-text--color-secondary {
  color: rgb(var(--v-theme-secondary));
}
.ds-text--color-success {
  color: rgb(var(--v-theme-success));
}
.ds-text--color-warning {
  color: rgb(var(--v-theme-warning));
}
.ds-text--color-danger {
  color: rgb(var(--v-theme-error));
}
.ds-text--color-info {
  color: rgb(var(--v-theme-info));
}

.ds-text--truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
}
.ds-text--uppercase {
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.ds-text--mono {
  font-family: var(--ds-font-mono);
}
</style>
