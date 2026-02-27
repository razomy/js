import type { NuxtConfig } from 'nuxt/config';
import { locales } from './locales';
import { type RzmNuxtConfig } from './interfaces';

// https://nuxt.com/docs/api/configuration/nuxt-config
export const defaultNuxtConfig = (c: RzmNuxtConfig) =>
  ({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    typescript: {
      strict: true,
      typeCheck: true,
    },
    devServer: {
      port: 3000,
      host: '0.0.0.0',
    },
    vuetify: {
      moduleOptions: {
        ssrClientHints: {
          reloadOnFirstRequest: false,
          prefersColorScheme: true,
          prefersColorSchemeOptions: {
            useBrowserThemeOnly: true,
          },
          viewportSize: true,
        },
        /* module specific options */
      },
      vuetifyOptions: {
        // 1. GLOBAL DEFAULTS: This removes the "Material" feel
        defaults: {
          global: {
            elevation: 0, // Removes shadows globally
          },
          VBtn: {
            variant: 'flat', // No shadow, just color
            class: 'text-none', // Normal capitalization
          },
          VCard: {
            variant: 'flat', // No shadow
            border: true, // Adds a subtle border instead of shadow
            rounded: 'lg', // Soft, large rounded corners
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
            border: true, // Subtle separation line
          },
          VNavigationDrawer: {
            border: 'none',
            color: 'surface',
            elevation: 0,
          },
        },
        theme: {
          defaultTheme: 'light',
          themes: {
            light: {
              dark: false,
              colors: {
                primary: '#5aa55a',
                secondary: '#004EC2',
                accent: '#F5AD49',
                background: '#F9F9F9',
                surface: '#FFFFFF',
              },
            },
            dark: {
              dark: true,
              colors: {
                primary: '#5aa55a',
                secondary: '#005CE6',
                accent: '#F5AD49',
                background: '#121212',
                surface: '#1E1E1E',
              },
            },
          },
        },
        /* vuetify options */
      },
    },
    i18n: {
      locales,
      detectBrowserLanguage: {
        useCookie: true,
        cookieKey: c.cookie.session.locale,
      },
      defaultLocale: 'en',
      strategy: 'prefix_except_default',
      baseUrl: c.url,
    },
    sitemap: {
      // xsl: false,
      xslTips: false,
      sources: ['/api/__sitemap__/urls'],
    },
    site: {
      url: c.url,
      name: c.i18n.en.nuxt.product.name,
      description: c.i18n.en.nuxt.product.description,
      defaultLocale: 'en',
    },
    nitro: {
      //TODO: performance issue
      // prerender: {
      //   routes: c.routes
      // },
    },
    pwa: {
      registerType: 'autoUpdate',
      manifest: {
        name: c.i18n.en.nuxt.product.name,
        short_name: c.i18n.en.nuxt.product.name,
        theme_color: '#1E1E1E',
      },
    },
    modules: [['nuxt-gtag', { id: process.env.NUXT_PUBLIC_GTAG_ID }], '@nuxtjs/sitemap', '@nuxtjs/i18n', '@vueuse/nuxt', 'vuetify-nuxt-module', '@nuxtjs/robots', '@razomy/nuxt', '@vite-pwa/nuxt'],
  } as const satisfies NuxtConfig & any);
