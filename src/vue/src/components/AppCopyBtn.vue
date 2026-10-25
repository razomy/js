<script setup lang="ts">
import { ref } from 'vue';
import {Button} from '@razomy/vue';

const props = withDefaults(
  defineProps<{
    text: string;
    label?: string;
  }>(),
  {}
);

const copied = ref(false);

function copy() {
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    navigator.clipboard.writeText(props.text);
  }
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 1500);
}
</script>

<template>
  <Button
    size="xs"
    variant="tonal"
    :color="copied ? 'success' : 'primary'"
    :prepend-icon="copied ? 'mdi-check' : 'mdi-content-copy'"
    @click.stop="copy"
  >
    {{ copied ? 'Copied' : (label || 'Copy') }}
  </Button>
</template>
