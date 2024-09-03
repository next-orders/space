<template>
  <div class="flex flex-row justify-between items-center gap-2">
    <h2 class="text-2xl md:text-3xl font-medium">
      {{ category?.name }}
    </h2>

    <NuxtLink
      :to="`/catalog/${category?.slug}`"
      class="px-5 py-3 flex flex-row gap-2 items-center text-base font-normal cursor-pointer rounded-2xl bg-gray-200 active:scale-95 hover:bg-gray-300 lg:hover:scale-95 lg:active:scale-90 duration-200"
    >
      Открыть категорию <Icon :name="icons.arrowRight" />
    </NuxtLink>
  </div>
  <div
    class="mt-4 mb-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-2"
  >
    <ProductCard v-for="product in products" :key="product.id" :product-id="product.id" />
  </div>
</template>

<script setup lang="ts">
const { categoryId } = defineProps<{
  categoryId: string
}>()

const { icons } = useAppConfig()
const channelData = await useChannel()
const category = channelData.value?.categories.find(({ id }) => id === categoryId)
const products = category?.products.splice(0, 6)
</script>
