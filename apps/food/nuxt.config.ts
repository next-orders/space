import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  vite: {
    optimizeDeps: {
      exclude: ['vee-validate'],
    },
    build: {
      rollupOptions: {
        external: ['sharp'],
      },
    },
  },
  devtools: {
    enabled: true,
    componentInspector: false,
  },
  devServer: {
    host: '0.0.0.0',
    port: 4200,
  },
  shadcn: {
    prefix: 'Ui',
    componentDir: './app/components/ui',
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
  icon: {
    clientBundle: {
      scan: {
        globInclude: ['app/**/*.{vue,ts}'],
        globExclude: ['node_modules', 'dist', 'build', 'coverage', 'test', 'tests', '.*'],
      },
    },
  },
  css: ['~/assets/css/styles.css'],
  runtimeConfig: {
    channelId: 'burger',
    storageProductsDirectory: 'products',
    public: {
      projectUrl: 'https://github.com/next-orders/food',
      locale: 'en',
    },
  },
  i18n: {
    locales: [
      { code: 'ru', name: 'Русский', file: 'ru-RU.json' },
      { code: 'en', name: 'English', file: 'en-EN.json' },
      { code: 'ka', name: 'ქართული', file: 'ka-GE.json' },
    ],
    strategy: 'no_prefix',
    langDir: 'locales',
    detectBrowserLanguage: false,
  },
  zodI18n: {
    localeCodesMapping: {
      'en-GB': 'en',
      'ru-RU': 'ru',
      'ka-GE': 'ka',
    },
  },
  routeRules: {
    '/': { swr: true },
    '/catalog/**': { swr: true },
    '/api/file/**': { prerender: false },
  },
  nitro: {
    storage: {
      fileSystem: {
        driver: 'fs',
        base: './../../.storage',
      },
    },
  },
  modules: [
    '@vueuse/nuxt',
    '@nuxtjs/device',
    'nuxt-zod-i18n',
    '@nuxtjs/i18n',
    '@nuxt/fonts',
    'nuxt-auth-utils',
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@nuxt/icon',
  ],
  compatibilityDate: '2024-08-18',
})
