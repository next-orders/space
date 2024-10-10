<template>
  <NuxtLink
    :to="link"
    class="text-base font-normal flex flex-row items-center gap-4 w-full h-12 px-3 rounded-2xl data-[active=true]:bg-neutral-200 dark:data-[active=true]:bg-neutral-500 data-[active=true]:font-medium active:scale-95 lg:hover:bg-neutral-100 dark:lg:hover:bg-neutral-600 lg:hover:scale-95 lg:active:scale-90 duration-200 group"
    :data-active="$route.path === link"
  >
    {{ label }}
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  link: string
  label: string
}>()
</script>
