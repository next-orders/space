<template>
  <ClientOnly>
    <NuxtLink to="/" class="flex items-center gap-2 leading-tight hover:opacity-80 duration-200">
      <img alt="Logo" src="~/assets/img/logo-full.png" class="h-12 w-auto" :class="{ hidden: isDark }">
      <img alt="Logo Dark" src="~/assets/img/logo-full-dark.png" class="h-12 w-auto" :class="{ hidden: !isDark }">
    </NuxtLink>
  </ClientOnly>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')
</script>
