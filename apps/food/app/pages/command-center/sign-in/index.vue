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

        <form onsubmit="sighIn()" class="space-y-4">
          <div v-if="error" class="text-red-500 text-center">
            {{ $t('error.invalid-credentials') }}
          </div>

          <div class="w-full space-y-2">
            <UiInput
              v-model="state.login"
              :placeholder="$t('common.login')"
              required
            />

            <UiInput
              v-model="state.password"
              type="password"
              :placeholder="$t('common.password')"
              required
            />
          </div>

          <UiButton
            v-if="state.login && state.password"
            :disabled="status === 'pending'"
            class="flex flex-row justify-center items-center gap-2 disabled:animate-pulse"
            @click="sighIn()"
          >
            {{ $t('common.sign-in') }} <Icon :name="icons.arrowRight" size="22" />
          </UiButton>
        </form>
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
if (user.value?.id && user.value?.isStaff) {
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
