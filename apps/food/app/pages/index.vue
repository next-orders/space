<template>
  <h1 class="mb-2 text-3xl font-medium">
    {{ channel?.name }}
  </h1>
  <div class="mb-6">
    {{ channel?.description }}
  </div>

  <CategoryBlock v-for="category in categories" :key="category.id" :category-id="category.id" />
</template>

<script setup lang="ts">
const { channel, categories } = await useChannel()

useHead({
  title: channel.value?.name,
  meta: [
    {
      name: 'description',
      content: 'Клиенты будут рады заказать вкусную еду максимально быстрым и удобным способом!',
    },
  ],
})
</script>
