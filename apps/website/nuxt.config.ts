import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  app: {
    head: {
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: '/favicon.png',
        },
      ],
    },
  },
  devtools: { enabled: true },
  devServer: {
    host: '0.0.0.0',
    port: 4200,
  },
  components: [
    { path: '~/components/ui', prefix: 'U', pathPrefix: false },
    '~/components',
  ],
  colorMode: {
    classSuffix: '',
    preference: 'dark',
    fallback: 'light',
  },
  fonts: {
    provider: 'google',
    families: [
      {
        name: 'Noto Serif',
        provider: 'google',
        weights: [300, 400, 500, 600, 700, 800, 900],
      },
      {
        name: 'Noto Sans',
        provider: 'google',
        weights: [300, 400, 500, 600, 700, 800, 900],
      },
    ],
  },
  css: ['~/assets/css/styles.css'],
  i18n: {
    locales: [
      { code: 'ru', name: 'Русский', file: 'ru-RU.json' },
      { code: 'en', name: 'English', file: 'en-EN.json' },
    ],
    defaultLocale: 'ru',
    strategy: 'prefix_except_default',
    langDir: 'locales',
    detectBrowserLanguage: {
      useCookie: true,
      alwaysRedirect: true,
    },
  },
  modules: [
    '@vueuse/nuxt',
    'nuxt-auth-utils',
    '@nuxtjs/device',
    'nuxt-time',
    '@nuxtjs/i18n',
    '@nuxt/ui',
    '@nuxt/fonts',
  ],
  compatibilityDate: '2024-08-18',
})
