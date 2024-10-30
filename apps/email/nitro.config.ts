import vue from '@vitejs/plugin-vue'

export default defineNitroConfig({
  srcDir: 'server',
  rollupConfig: {
    plugins: [vue()],
  },
  runtimeConfig: {
    nitro: {
      envPrefix: 'EMAIL_',
    },
    token: '',
    host: '',
    port: 0,
    user: '',
    pass: '',
    from: '',
  },
})
