<template>
  <div class="flex flex-col max-w-sm mx-auto mt-32 text-center">
    <h1 class="text-4xl mb-4">
      {{ $t('error.title') }} {{ error?.statusCode }}
    </h1>
    <p>{{ error?.statusMessage }}</p>

    <UiButton class="mt-12" @click="handleError">
      {{ $t('common.to-home') }}
    </UiButton>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps({
  error: Object as () => NuxtError,
})

const handleError = () => clearError({ redirect: '/' })
</script>
