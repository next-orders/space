<template>
  <div class="w-full h-screen mx-auto grid grid-cols-1 lg:grid-cols-2">
    <div class="hidden lg:block bg-white" />

    <div class="flex flex-col justify-center items-center bg-neutral-100">
      <div class="w-full max-w-xs">
        <img
          src="~/assets/img/eggs-192.png"
          width="64"
          height="64"
          alt=""
          class="mx-auto mb-2 w-20 h-20"
        >

        <h1 class="mb-10 text-2xl text-center">
          {{ $t('center.welcome-message') }}
        </h1>

        <div>
          <div v-if="error" class="mb-4 text-red-500 text-center">
            {{ $t('error.invalid-credentials') }}
          </div>

          <div class="w-full mb-6">
            <div class="mb-4">
              <input
                v-model="state.login"
                :placeholder="$t('common.login')"
                required
                class="peer block w-full rounded-2xl border border-neutral-200 py-3 px-4 text-base outline-2 outline-offset-1 outline-neutral-500 placeholder:text-neutral-400"
              >
            </div>

            <div class="mb-4">
              <input
                v-model="state.password"
                type="password"
                :placeholder="$t('common.password')"
                required
                class="peer block w-full rounded-2xl border border-neutral-200 py-3 px-4 text-base outline-2 outline-offset-1 outline-neutral-500 placeholder:text-neutral-400"
              >
            </div>
          </div>

          <div v-if="state.login && state.password" class="flex flex-row gap-4 justify-center">
            <button
              :disabled="status === 'pending'"
              class="px-5 py-3 flex flex-row gap-2 justify-center items-center text-base font-medium cursor-pointer bg-neutral-200 hover:bg-neutral-300 hover:scale-95 duration-200 rounded-2xl disabled:animate-pulse"
              @click="sighIn"
            >
              {{ $t('common.sign-in') }} <Icon :name="icons.arrowRight" size="22" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'sign-in',
})

const { icons } = useAppConfig()
const { user, fetch: refreshSession } = useUserSession()
if (user.value?.isStaff) {
  await navigateTo('/command-center')
}

const state = reactive({
  login: '',
  password: '',
})

const { error, status, execute: sighIn } = await useFetch('/api/auth/sign-in', {
  method: 'POST',
  body: state,
  immediate: false,
  watch: false,
  onResponse: async ({ response }) => {
    if (response.ok) {
      await refreshSession()
      await navigateTo('/command-center')
    }
  },
})
</script>
