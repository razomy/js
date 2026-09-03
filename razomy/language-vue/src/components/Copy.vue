<template>
  <v-btn
    size="small"
    density="compact"
    variant="text"
    color="primary"
    icon="mdi-content-copy"
    @click="copyToClipboard"
    :title="t('io.web.text_to_text.copy_to_clipboard')"
    :disabled="props.disabled || !props.value"
  ></v-btn>
  <v-snackbar v-model="copied" color="success" location="bottom" timeout="2000">
    <v-icon start icon="mdi-check-circle"/>
    {{ t('io.web.text_to_text.copied_success') }}
  </v-snackbar>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import {useI18n} from 'vue-i18n';

const {t} = useI18n();

const copied = ref(false);

const props = defineProps<{
  value: string | number | object | null | string[] | number[] | undefined;
  disabled?: boolean;
}>();

const copyToClipboard = async () => {
  if (!props.value) return;

  let textToCopy = '';
  if (Array.isArray(props.value)) {
    textToCopy = props.value.join('\n');
  } else if (typeof props.value === 'object' && props.value !== null) {
    textToCopy = JSON.stringify(props.value, null, 2);
  } else {
    textToCopy = String(props.value);
  }

  try {
    if (import.meta['client']) {
      await navigator.clipboard.writeText(textToCopy);
    }
    copied.value = true;
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
};
</script>
