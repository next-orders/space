<template>
  <CommandCenterStaffBar v-if="user?.isStaff" class="mb-4" />
  <MaintenanceMessage v-if="channel?.isActive === false || !activeMenu" />

  <h1 class="mb-2 text-3xl font-medium">
    {{ channel?.name }}
  </h1>
  <div class="mb-6">
    {{ channel?.description }}
  </div>

  <CategoryBlock v-for="category in categoriesWithProducts" :key="category.id" :category-id="category.id" :is-first="categoriesWithProducts.indexOf(category) === 0" />
</template>

<script setup lang="ts">
const { user } = useUserSession()
const { channel, categoriesWithProducts, activeMenu } = await useChannel()

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
