<template>
  <div class="flex flex-row gap-1 justify-center items-center">
    Создано с <Icon :name="icons.heart" class="text-red-500" /> на движке NextOrders
  </div>

  <div class="mt-4">
    <NuxtLink
      to="https://github.com/next-orders/space"
      target="_blank"
      aria-label="Open GitHub repository of this project"
      class="text-gray-800 inline-block rounded-full active:scale-95 lg:hover:scale-95 lg:active:scale-90 duration-200"
    >
      <Icon :name="icons.github" size="32" />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const { icons } = useAppConfig()
</script>
