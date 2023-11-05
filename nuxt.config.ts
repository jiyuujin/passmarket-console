// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'app/',
  app: {
    buildAssetsDir: '/_nuxt/',
    baseURL: '/',
    head: {
      title: 'PassMarket Console',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
      htmlAttrs: {
        lang: 'ja',
      },
    },
  },
  css: ['~/assets/main.css', 'vue-toastification/dist/index.css'],
  modules: ['pinceau/nuxt', '@nuxtjs/supabase'],
  pinceau: {
    configFileName: 'tokens.config',
    debug: false,
    runtime: true,
  },
  supabase: {
    redirect: false,
  },
  build: {
    transpile: ['vue-toastification'],
  },
  typescript: {
    strict: true,
  },
  routeRules: {
    '/passmarket-console/': { prerender: true },
  },
  runtimeConfig: {
    public: {
      supabaseProjectUrl: process.env.SUPABASE_URL,
      supabaseApiKey: process.env.SUPABASE_KEY,
    },
  },
})
