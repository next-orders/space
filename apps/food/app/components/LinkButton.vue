<template>
  <NuxtLink
    :to="link"
    class="text-base font-normal flex flex-row items-center gap-4 w-full h-12 px-3 rounded-2xl data-[active=true]:bg-zinc-200 data-[active=true]:font-medium active:scale-95 lg:hover:bg-zinc-100 lg:hover:scale-95 lg:active:scale-90 duration-200 group"
    :data-active="route.path === link"
  >
    <img
      :src="iconUrl"
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

const route = useRoute()
const iconUrl = '/food-icon/BURGER.png'
</script>
