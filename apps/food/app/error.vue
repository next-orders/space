<template>
  <div class="flex flex-col max-w-sm mx-auto mt-32 text-center">
    <h1 class="text-5xl mb-8">
      Ошибка {{ error?.statusCode }}
    </h1>
    <button class="button-gradient px-5 py-3 text-center text-lg font-normal cursor-pointer rounded-2xl active:scale-95 lg:hover:scale-95 lg:active:scale-90 duration-200" @click="handleError">
      На главную
    </button>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps({
  error: Object as () => NuxtError,
})

const handleError = () => clearError({ redirect: '/' })
</script>
