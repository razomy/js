import type {RzmNuxtStaticConfig} from '@razomy/nuxt/runtime/functions';
const subdomainName = 'io' as const;
const domain = `${subdomainName}.razomy.org` as const;
export const url = `https://${domain}` as const;
export const cookie = {
  session: {locale: `${subdomainName}.razomy.org-session-locale`,}
} as const;
import {en as vuetifyEn} from 'vuetify/locale';
import type {RzmNuxtRuntimeTranslate, RzmNuxtStaticTranslate} from '@razomy/nuxt/runtime/functions';

const nuxtTranslates = {
  footer: {
    donate: 'Donate',
    start_year: '2021',
    company_name: 'Razomy'
  },
  dropzone: {
    converting: 'Converting',
    scanning_folders: 'Scanning folders',
    drop_title: 'Drag & Drop file here',
    support_nested_folders: 'We support nested folders',
    select_files: 'Select File',
    select_folder: 'Select Folder',
    selected_files: 'Selected files',
    total_size: 'Total size',
    clear_all: 'Clear all',
    add_files: 'Add files',
    convert: 'Convert'
  },
  error: {
    404: {
      title: 'Page Not Found',
      back_btn: 'Back to Home Page'
    },
  },
  product: {
    name: 'Io',
    description: 'Input command',
  },
} as const satisfies RzmNuxtRuntimeTranslate['nuxt'] & RzmNuxtStaticTranslate['nuxt'];

export const i18n = {
  en: {
    $vuetify: vuetifyEn,
    nuxt: nuxtTranslates,
  }
} as const;

export const c = {
  url,
  cookie,
  i18n,
} as const satisfies RzmNuxtStaticConfig;

import {defineNuxtConfig} from 'nuxt/config'
import {defaultNuxtConfig} from '@razomy/nuxt/runtime/functions';
const config = defaultNuxtConfig(c) as any;
config.i18n.locales = [];
export default defineNuxtConfig(config)
