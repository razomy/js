import type {NuxtConfig} from 'nuxt/config';
import {locales} from './locales';

export interface RazomyVueNuxtConfig {
  url: string,
  i18n: {
    en: {
      ['vue-nuxt']: {
        product: {
          name: string,
          description: string
        }
      }
    }
  },
  cookie: {
    session: {
      locale: string
    }
  }
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export const defaultNuxtConfig = (c: RazomyVueNuxtConfig): NuxtConfig => ({
  compatibilityDate: '2025-07-15',
  devtools: {enabled: true},
  typescript: {
    strict: true,
    typeCheck: true,
  },
  devServer: {
    port: 3000,
    host: '0.0.0.0'
  },
  vuetify: {
    moduleOptions: {
      /* module specific options */
    },
    vuetifyOptions: {
      // 1. GLOBAL DEFAULTS: This removes the "Material" feel
      defaults: {
        global: {
          elevation: 0,  // Removes shadows globally
        },
        VBtn: {
          variant: 'flat', // No shadow, just color
          class: 'text-none', // Normal capitalization
        },
        VCard: {
          variant: 'flat', // No shadow
          border: true,    // Adds a subtle border instead of shadow
          rounded: 'lg',   // Soft, large rounded corners
          color: 'surface',
        },
        VTextField: {
          variant: 'outlined',
          density: 'comfortable', // Adds more whitespace than 'compact'
          color: 'primary',
          hideDetails: 'auto',
        },
        VMenu: {
          // Автоматически применяем наш CSS класс к контейнеру меню
          contentClass: 'global-soft-menu',
          offset: 4, // Небольшой отступ от кнопки (эффект полета)
          transition: 'scale-transition', // Или 'slide-y-transition' для мягкости
        },
        VAppBar: {
          flat: true,
          color: 'background', // Blends with the page background
          border: true,        // Subtle separation line
        },
        VNavigationDrawer: {
          border: 'none',
          color: 'surface',
          elevation: 0,
        },
      },

      // 2. THEME COLORS: Soft, airy palette
      theme: {
        defaultTheme: 'system',
        themes: {
          light: {
            dark: false,
            colors: {
              // Your Brand Colors (slightly softened)
              primary: '#FCB60D',
              secondary: '#5243C2',

              // THE "SOFT" UI BASE
              // background: '#F5F5F7', // The "Apple Store" light gray background
              surface: '#FFFFFF',    // Pure white for cards/elements
              'surface-light': '#FFFFFF',    // Pure white for cards/elements
              // 'surface-light': '#F5F5F7',    // Pure white for cards/elements

              // Text colors for better contrast without harsh black
              'on-background': '#1D1D1F', // Dark grey (Apple style) instead of #000
              'on-surface': '#1D1D1F',
            },
          },
          dark: {
            dark: true,
            colors: {
              primary: '#FCB60D',
              secondary: '#5243C2',
              background: '#121212', // Standard dark
              surface: '#1E1E1E',
            },
          },
        },
      },
      /* vuetify options */
    }
  },
  i18n: {
    locales,
    detectBrowserLanguage: {
      useCookie: true,
      alwaysRedirect: true,
      cookieKey: c.cookie.session.locale,
    },
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    baseUrl: c.url,
  },
  sitemap: {
    xsl: false,
    xslTips: false,
    // TODO: not working with google search
    sitemaps: false,
    sources: [
      '/api/__sitemap__/urls',
    ]
  },
  site: {
    url: c.url,
    name: c.i18n.en['vue-nuxt'].product.name,
    description: c.i18n.en['vue-nuxt'].product.description,
    defaultLocale: 'en',
  },
  nitro: {
    //TODO: performance issue
    // prerender: {
    //   routes: c.routes
    // },
  },
  modules: [
    ['nuxt-gtag', {id: process.env.NUXT_PUBLIC_GTAG_ID}],
    '@nuxtjs/sitemap',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    'vuetify-nuxt-module',
    '@nuxtjs/robots',
    '@razomy/nuxt',
    'nuxt-zod-i18n',
  ],
} as any as NuxtConfig)