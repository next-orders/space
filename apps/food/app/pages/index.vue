<template>
  <CommandCenterStaffBar v-if="user?.isStaff" class="mb-4" />
  <MaintenanceMessage v-if="channel?.isActive === false || !activeMenu || (!channel?.isPickupAvailable && !channel?.isDeliveryAvailable)" />

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

// Need to init channel
if (!channel.value?.id || !channel.value?.masterAccountExists) {
  navigateTo('/welcome')
}

useHead({
  title: channel.value?.name,
  meta: [
    {
      name: 'description',
      content: channel.value?.description,
    },
  ],
})
</script>
