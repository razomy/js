<template>
  <v-container class="my-12">
    <v-footer class="content-0 py-6">
      <v-row justify="center" no-gutters>
        <template v-for="navigationNodes in c.footerNavigationNodes">
          <v-btn
            v-if="navigationNodes.meta.url.startsWith('https://')"
            :href="navigationNodes.meta.url"
            class="mx-2"
            rounded="xl"
            variant="text"
          >
            {{ t(navigationNodes.meta.nameTk) }}
            <v-icon icon="mdi-open-in-new" size="16"></v-icon>
          </v-btn>
          <v-btn v-else :to="localePath(navigationNodes.meta.url)" class="mx-2" rounded="xl" variant="text">
            {{ t(navigationNodes.meta.nameTk) }}
          </v-btn>
        </template>
        <rzm-language-selector></rzm-language-selector>
        <v-btn
          append-icon="mdi-heart-outline"
          class="mx-2"
          color="pink"
          href="https://donate.stripe.com/28o9CS6Px6QwaQMbIN"
          rounded="xl"
          variant="outlined"
        >
          {{ t('nuxt.footer.donate') }}
        </v-btn>

        <v-col class="text-center mt-2" cols="12">
          <span>{{ t('nuxt.footer.start_year') }}</span
          >-{{ new Date().getFullYear() }} —
          <span>{{ t('nuxt.footer.company_name') }}</span>
        </v-col>
      </v-row>
    </v-footer>
  </v-container>
</template>
<script lang="ts" setup>
import { useI18n, useLocalePath, useRzmRuntimeConfigState } from '#imports';

const {c} = useRzmRuntimeConfigState();
const localePath = useLocalePath();
const { t } = useI18n();
</script>
