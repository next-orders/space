<template>
  <h1 class="mb-2 text-3xl font-medium">
    {{ channelData?.channel?.name }}
  </h1>
  <div class="mb-6">
    {{ channelData?.channel?.description }}
  </div>

  <CategoryBlock v-for="category in channelData?.categories" :key="category.id" :category-id="category.id" />
</template>

<script setup lang="ts">
useHead({
  title: 'Онлайн-заказ еды',
  meta: [
    {
      name: 'description',
      content: 'Клиенты будут рады заказать вкусную еду максимально быстрым и удобным способом!',
    },
  ],
})

const channelData = await useChannel()
</script>
