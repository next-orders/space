<template>
  <div class="flex flex-row justify-between items-center gap-2">
    <h2 class="text-2xl md:text-3xl font-medium">
      {{ category?.name }}
    </h2>

    <NuxtLink :to="`/catalog/${category?.slug}`">
      <UiButton variant="secondary" class="bg-neutral-200">
        <div class="flex flex-row gap-2 items-center">
          {{ $t('app.open-category') }} <Icon :name="icons.arrowRight" />
        </div>
      </UiButton>
    </NuxtLink>
  </div>
  <div
    class="mt-4 mb-12 max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-2"
  >
    <ProductCard v-for="product in categoryProducts" :key="product.id" :product-id="product.id" />
  </div>
</template>

<script setup lang="ts">
const { categoryId } = defineProps<{
  categoryId: string
}>()

const { icons } = useAppConfig()
const { categories } = await useChannel()
const category = computed(() => categories.value.find(({ id }) => id === categoryId))
const categoryProducts = computed(() => category.value?.products.filter((p) => p.variants.length > 0).splice(0, 6))
</script>
