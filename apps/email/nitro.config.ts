// https://nitro.unjs.io/config
export default defineNitroConfig({
  srcDir: 'server',
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
