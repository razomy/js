<script setup lang="ts">
import { computed } from 'vue';
import { cm } from '@razomy/vue';

export type GridVariant =
  | 'full'
  | 'y'
  | 'x'
  | 'x_between'
  | 'x_start'
  | 'x_end'
  | 'x_auto_1fr'
  | 'x_1fr_auto'
  | 'x_auto_1fr_auto'
  | 'x_two'
  | 'x_three'
  | 'x_four'
  | 'x_cards'
  | 'y_header_main'
  | 'y_header_main_footer'
  | 'y_auto_1fr'
  | 'y_1fr_auto'
  | 'container';

export type GridGap = 'none' | 'xss' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type GridPadding = 'none' | 'xs' | 'sm' | 'md' | 'lg';
export type GridSurface = 'none' | 'default' | 'panel' | 'elevated' | 'background';
export type GridBorder = 'none' | 'all' | 'b' | 't' | 'l' | 'r';
export type GridAlign = 'start' | 'center' | 'end' | 'stretch';

const props = withDefaults(
  defineProps<{
    as?: string;
    variant?: GridVariant;
    gap?: GridGap;
    padding?: GridPadding;
    surface?: GridSurface;
    border?: GridBorder;
    align?: GridAlign;
    fullHeight?: boolean;
    fullWidth?: boolean;
    scrollable?: boolean;
    clip?: boolean;
    rounded?: boolean;
    interactive?: boolean;
    selected?: boolean;
  }>(),
  {
    as: 'div',
    variant: 'y',
    gap: 'none',
    padding: 'none',
    surface: 'none',
    border: 'none',
    align: 'stretch',
    fullHeight: false,
    fullWidth: false,
    scrollable: false,
    clip: false,
    rounded: false,
    interactive: false,
    selected: false,
  }
);

const classes = computed(() =>
  cm(
    'ds-grid',
    `ds-grid--v-${props.variant}`,
    `ds-grid--gap-${props.gap}`,
    `ds-grid--pad-${props.padding}`,
    `ds-grid--surf-${props.surface}`,
    `ds-grid--bdr-${props.border}`,
    `ds-grid--align-${props.align}`,
    {
      'ds-grid--h-full': props.fullHeight,
      'ds-grid--w-full': props.fullWidth,
      'ds-grid--scroll': props.scrollable,
      'ds-grid--clip': props.clip,
      'ds-grid--rounded': props.rounded,
      'ds-grid--interactive': props.interactive,
      'ds-grid--selected': props.selected,
    }
  )
);
</script>

<template>
  <component :is="as" :class="classes">
    <slot />
  </component>
</template>

<style scoped>
.ds-grid {
  display: grid;
  min-width: 0;
}

/* Variants (Pure CSS Grid, zero flex) */
.ds-grid--v-full {
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: minmax(0, 1fr);
}
.ds-grid--v-y {
  grid-auto-flow: row;
  grid-auto-rows: max-content;
  grid-template-columns: minmax(0, 1fr);
}
.ds-grid--v-x {
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  align-items: center;
}
.ds-grid--v-x_between {
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  justify-content: space-between;
  align-items: center;
}
.ds-grid--v-x_start {
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  justify-content: start;
  align-items: center;
}
.ds-grid--v-x_end {
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  justify-content: end;
  align-items: center;
}
.ds-grid--v-x_auto_1fr {
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
}
.ds-grid--v-x_1fr_auto {
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
}
.ds-grid--v-x_auto_1fr_auto {
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
}
.ds-grid--v-x_two {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
.ds-grid--v-x_three {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}
.ds-grid--v-x_four {
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
}
.ds-grid--v-x_cards {
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
}
.ds-grid--v-y_header_main {
  grid-template-rows: auto minmax(0, 1fr);
  grid-template-columns: minmax(0, 1fr);
}
.ds-grid--v-y_header_main_footer {
  grid-template-rows: auto minmax(0, 1fr) auto;
  grid-template-columns: minmax(0, 1fr);
}
.ds-grid--v-y_auto_1fr {
  grid-template-rows: auto minmax(0, 1fr);
  grid-template-columns: minmax(0, 1fr);
}
.ds-grid--v-y_1fr_auto {
  grid-template-rows: minmax(0, 1fr) auto;
  grid-template-columns: minmax(0, 1fr);
}
.ds-grid--v-container {
  max-width: 1120px;
  width: 100%;
  margin-inline: auto;
  grid-template-columns: minmax(0, 1fr);
  grid-auto-rows: max-content;
}

/* Alignments */
.ds-grid--align-start { align-items: start; }
.ds-grid--align-center { align-items: center; }
.ds-grid--align-end { align-items: end; }
.ds-grid--align-stretch { align-items: stretch; }

/* Gaps */
.ds-grid--gap-none { gap: 0; }
.ds-grid--gap-xss { gap: 4px; }
.ds-grid--gap-xs { gap: 8px; }
.ds-grid--gap-sm { gap: 12px; }
.ds-grid--gap-md { gap: 16px; }
.ds-grid--gap-lg { gap: 24px; }
.ds-grid--gap-xl { gap: 32px; }

/* Paddings */
.ds-grid--pad-none { padding: 0; }
.ds-grid--pad-xs { padding: 6px 10px; }
.ds-grid--pad-sm { padding: 10px 14px; }
.ds-grid--pad-md { padding: 16px; }
.ds-grid--pad-lg { padding: 24px; }

/* Role-based Surfaces (Light & Dark adaptive) */
.ds-grid--surf-default {
  background-color: rgb(var(--v-theme-surface));
  color: rgb(var(--v-theme-on-surface));
}
.ds-grid--surf-panel {
  background-color: rgba(var(--v-theme-surface-variant), 0.25);
  color: rgb(var(--v-theme-on-surface));
}
.ds-grid--surf-elevated {
  background-color: rgb(var(--v-theme-surface-light, var(--v-theme-surface)));
  color: rgb(var(--v-theme-on-surface));
}
.ds-grid--surf-background {
  background-color: rgb(var(--v-theme-background));
  color: rgb(var(--v-theme-on-background));
}

/* Borders */
.ds-grid--bdr-all {
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}
.ds-grid--bdr-b {
  border-bottom: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}
.ds-grid--bdr-t {
  border-top: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}
.ds-grid--bdr-l {
  border-left: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}
.ds-grid--bdr-r {
  border-right: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}

/* Sizing & Scroll */
.ds-grid--h-full { height: 100%; min-height: 0; }
.ds-grid--w-full { width: 100%; }
.ds-grid--scroll { overflow-y: auto; overflow-x: hidden; min-height: 0; }
.ds-grid--clip { overflow: hidden; min-height: 0; }
.ds-grid--rounded { border-radius: 6px; }

/* Interactive states */
.ds-grid--interactive {
  cursor: pointer;
  transition: background-color 0.15s ease, border-color 0.15s ease;
}
.ds-grid--interactive:hover {
  background-color: rgba(var(--v-theme-primary), 0.08);
  border-color: rgba(var(--v-theme-primary), 0.4);
}
.ds-grid--selected {
  background-color: rgba(var(--v-theme-primary), 0.14) !important;
  border-color: rgb(var(--v-theme-primary)) !important;
}
</style>
