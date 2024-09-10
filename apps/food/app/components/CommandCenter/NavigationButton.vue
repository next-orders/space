<template>
  <NuxtLink
    :to="link"
    class="text-base font-normal flex flex-row items-center gap-3 w-full h-12 px-3 rounded-2xl data-[active=true]:bg-gray-200 dark:data-[active=true]:bg-gray-600 data-[active=true]:font-medium hover:bg-gray-100 dark:hover:bg-gray-600 hover:scale-95 duration-200"
    :data-active="$route.path === link"
  >
    <Icon :name="icon" class="w-6 h-6 opacity-40" />
    {{ label }}
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  link: string
  label: string
  icon: string
}>()
</script>
