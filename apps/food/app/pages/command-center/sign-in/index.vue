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

      <form action="" class="max-w-sm">
        <div class="w-full mb-6">
          <div class="mb-4">
            <input
              name="login"
              placeholder="Логин"
              required
              value=""
              class="peer block w-full rounded-2xl border border-zinc-200 py-3 px-4 text-base outline-2 outline-offset-1 outline-zinc-500 placeholder:text-zinc-400"
            >
          </div>

          <div class="mb-4">
            <input
              name="password"
              type="password"
              placeholder="Пароль"
              required
              value=""
              class="peer block w-full rounded-2xl border border-zinc-200 py-3 px-4 text-base outline-2 outline-offset-1 outline-zinc-500 placeholder:text-zinc-400"
            >
          </div>
        </div>

        <div class="flex flex-row gap-4 justify-center">
          <button
            type="submit"
            :disabled="false"
            class="px-5 py-3 flex flex-row gap-2 justify-center items-center text-base font-medium cursor-pointer bg-zinc-100 hover:bg-zinc-200 hover:scale-95 duration-200 rounded-2xl disabled:animate-pulse"
          >
            Войти <Icon :name="icons.arrowRight" size="22" />
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'sign-in',
})

const { icons } = useAppConfig()
</script>
