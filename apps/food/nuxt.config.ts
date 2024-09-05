import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
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
    preference: 'light',
    fallback: 'light',
  },
  fonts: {
    provider: 'google',
    families: [
      {
        name: 'Noto Sans',
        provider: 'google',
        weights: [300, 400, 500, 600, 700, 800, 900],
      },
    ],
  },
  css: ['~/assets/css/styles.css'],
  runtimeConfig: {
    channelId: '', // NUXT_CHANNEL_ID
    public: {
      checkoutCookieName: 'nextorders-checkout-id', // NUXT_PUBLIC_CHECKOUT_COOKIE_NAME
    },
  },
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
    '@nuxtjs/device',
    '@nuxtjs/i18n',
    '@nuxt/ui',
    '@nuxt/fonts',
    'nuxt-auth-utils',
  ],
  compatibilityDate: '2024-08-18',
})
