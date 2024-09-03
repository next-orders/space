<template>
  <div class="flex flex-row gap-1 justify-center items-center">
    Создано с <Icon :name="icons.heart" class="text-red-500" />
    <NuxtLink
      to="https://github.com/next-orders/space"
      target="_blank"
      class="hover:opacity-80 duration-200"
    >
      на платформе NextOrders
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const { icons } = useAppConfig()
</script>
