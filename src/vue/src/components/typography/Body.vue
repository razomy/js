<script setup lang="ts">
import Text, { type TextColor } from './Text.vue';

export type BodyVariant =
  | 'xlBold'
  | 'lgBold'
  | 'lgSemiBold'
  | 'lBold'
  | 'lSemiBold'
  | 'lRegular'
  | 'mBold'
  | 'mSemiBold'
  | 'mRegular'
  | 'mMedium'
  | 'sBold'
  | 'sSemiBold'
  | 'sRegular'
  | 'sMedium'
  | 'xsBold'
  | 'xsSemiBold'
  | 'xsRegular'
  | 'xsMono'
  | 'xxsMono';

withDefaults(
  defineProps<{
    as?: string;
    variant?: BodyVariant;
    color?: TextColor;
    truncate?: boolean;
    uppercase?: boolean;
    mono?: boolean;
  }>(),
  {
    as: 'span',
    variant: 'mRegular',
    color: 'default',
    truncate: false,
    uppercase: false,
    mono: false,
  }
);
</script>

<template>
  <Text
    :as="as"
    :variant-class="`ds-body--${variant}`"
    :color="color"
    :truncate="truncate"
    :uppercase="uppercase"
    :mono="mono || variant === 'xsMono' || variant === 'xxsMono'"
  >
    <slot />
  </Text>
</template>

<style scoped>
.ds-body--xlBold { font-family: var(--ds-font-display); font-size: 1.25rem; line-height: 1.6rem; font-weight: 700; }
.ds-body--lgBold { font-family: var(--ds-font-display); font-size: 1.05rem; line-height: 1.45rem; font-weight: 700; }
.ds-body--lgSemiBold { font-family: var(--ds-font-display); font-size: 1rem; line-height: 1.4rem; font-weight: 600; }
.ds-body--lBold { font-size: 0.925rem; line-height: 1.35rem; font-weight: 700; }
.ds-body--lSemiBold { font-size: 0.925rem; line-height: 1.35rem; font-weight: 600; }
.ds-body--lRegular { font-size: 0.925rem; line-height: 1.35rem; font-weight: 400; }
.ds-body--mBold { font-size: 0.825rem; line-height: 1.25rem; font-weight: 700; }
.ds-body--mSemiBold { font-size: 0.825rem; line-height: 1.25rem; font-weight: 600; }
.ds-body--mMedium { font-size: 0.825rem; line-height: 1.25rem; font-weight: 500; }
.ds-body--mRegular { font-size: 0.825rem; line-height: 1.25rem; font-weight: 400; }
.ds-body--sBold { font-size: 0.75rem; line-height: 1.1rem; font-weight: 700; }
.ds-body--sSemiBold { font-size: 0.75rem; line-height: 1.1rem; font-weight: 600; }
.ds-body--sMedium { font-size: 0.75rem; line-height: 1.1rem; font-weight: 500; }
.ds-body--sRegular { font-size: 0.75rem; line-height: 1.1rem; font-weight: 400; }
.ds-body--xsBold { font-size: 0.6875rem; line-height: 1rem; font-weight: 700; }
.ds-body--xsSemiBold { font-size: 0.6875rem; line-height: 1rem; font-weight: 600; }
.ds-body--xsRegular { font-size: 0.6875rem; line-height: 1rem; font-weight: 400; }
.ds-body--xsMono { font-family: var(--ds-font-mono); font-size: 0.72rem; line-height: 1.05rem; font-weight: 500; }
.ds-body--xxsMono { font-family: var(--ds-font-mono); font-size: 0.65rem; line-height: 0.95rem; font-weight: 500; }
</style>