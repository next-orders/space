<template>
  <NuxtLink
    :to="link"
    class="text-base font-normal flex flex-row items-center gap-4 w-full h-12 px-3 rounded-2xl data-[active=true]:bg-neutral-200 dark:data-[active=true]:bg-neutral-500 data-[active=true]:font-medium active:scale-95 lg:hover:bg-neutral-100 dark:lg:hover:bg-neutral-600 lg:hover:scale-95 lg:active:scale-90 duration-200 group"
    :data-active="$route.path === link"
  >
    <img
      :src="getIconUrl('BURGER')"
      alt=""
      width="32"
      height="32"
      class="w-8 h-8 group-hover:scale-125 duration-200"
    >
    {{ label }}
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  link: string
  label: string
}>()

function getIconUrl(icon: MenuCategoryIcon | null) {
  return icon ? `/food-icon/${icon}.png` : '/food-icon/DEFAULT.png'
}
</script>
