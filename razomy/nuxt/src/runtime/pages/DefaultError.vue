<template>
  <div class="d-flex flex-column fill-height justify-center align-center text-white">
    <h1 v-if="error?.status === 404">{{ t('nuxt.error.404.title') }}</h1>
    <p v-else>
      {{ error }}
    </p>
    <v-btn @click="handleError" color="primary" variant="elevated">{{ t('nuxt.error.404.back_btn') }}</v-btn>
  </div>
  <!--  </v-parallax>-->
</template>
<script lang="ts" setup>
import { useI18n, useLocalePath, clearError } from '#imports';
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError,
})

const localePath = useLocalePath();
const { t } = useI18n();


const handleError = () => clearError({ redirect: localePath('/') })

</script>
