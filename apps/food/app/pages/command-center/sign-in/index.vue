<template>
  <div class="w-full h-screen mx-auto flex flex-row justify-center items-center">
    <div>
      <img
        src="~/assets/img/eggs-192.png"
        width="48"
        height="48"
        alt=""
        class="mx-auto mb-2 w-16 h-16"
      >

      <h1 class="mb-10 text-2xl text-center">
        Мы вас заждались!
      </h1>

      <div class="max-w-sm">
        <div v-if="error" class="mb-4 text-red-500 text-center">
          Неверный логин или пароль
        </div>

        <div class="w-full mb-6">
          <div class="mb-4">
            <input
              v-model="state.login"
              name="login"
              placeholder="Логин"
              required
              class="peer block w-full rounded-2xl border border-gray-200 py-3 px-4 text-base outline-2 outline-offset-1 outline-gray-500 placeholder:text-gray-400"
            >
          </div>

          <div class="mb-4">
            <input
              v-model="state.password"
              name="password"
              type="password"
              placeholder="Пароль"
              required
              class="peer block w-full rounded-2xl border border-gray-200 py-3 px-4 text-base outline-2 outline-offset-1 outline-gray-500 placeholder:text-gray-400"
            >
          </div>
        </div>

        <div class="flex flex-row gap-4 justify-center">
          <button
            type="submit"
            :disabled="status === 'pending'"
            class="px-5 py-3 flex flex-row gap-2 justify-center items-center text-base font-medium cursor-pointer bg-gray-100 hover:bg-gray-200 hover:scale-95 duration-200 rounded-2xl disabled:animate-pulse"
            @click="sighIn"
          >
            Войти <Icon :name="icons.arrowRight" size="22" />
          </button>
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
