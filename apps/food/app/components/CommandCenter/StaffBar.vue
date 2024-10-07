<template>
  <div class="relative max-w-7xl">
    <div class="bg-white dark:bg-neutral-600 p-4 flex justify-between items-center rounded-2xl">
      <p class="grow text-lg">
        {{ $t('common.hello') }}, {{ user?.name ?? $t('common.colleague') }}!
      </p>

      <NuxtLink to="/command-center">
        <UiButton>
          {{ $t('common.continue-working') }}
        </UiButton>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const { user } = useUserSession()
</script>
