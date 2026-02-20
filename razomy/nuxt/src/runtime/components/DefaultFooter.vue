<template>
  <v-container class='my-12'>
    <v-footer class='rounded-xl py-6'>
      <v-row justify='center' no-gutters>
        <template v-for='link in c.footerLinks'>
          <v-btn
              v-if="link.url.startsWith('https://')"
              :href='link.url'
              class='mx-2'
              rounded='xl'
              variant='text'
          >
            {{ t(link.text) }}
            <v-icon icon="mdi-open-in-new" size="16"></v-icon>
          </v-btn>
          <v-btn
              v-else
              :to='localePath(link.url)'
              class='mx-2'
              rounded='xl'
              variant='text'
          >
            {{ t(link.text) }}
          </v-btn>
        </template>
        <rzm-language-selector></rzm-language-selector>
        <v-btn append-icon="mdi-heart-outline"
               class='mx-2'
               color="pink"
               href="https://donate.stripe.com/28o9CS6Px6QwaQMbIN"
               rounded="xl"
               variant="outlined">
          {{ t('vue-nuxt.footer.donate') }}
        </v-btn>

        <v-col class='text-center' cols='12'>
          2023-{{ new Date().getFullYear() }} — <span>{{ t('vue-nuxt.footer.company-name') }}</span>
        </v-col>
      </v-row>
    </v-footer>
  </v-container>
</template>
<script lang='ts' setup>
import {c} from '~~/content/context';

const localePath = useLocalePath();
const {t} = useI18n();

</script>
