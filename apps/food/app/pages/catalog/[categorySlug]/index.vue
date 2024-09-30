<template>
  <UiBreadcrumb :links="breadcrumbs" :is-dark-background="true" />

  <h1 class="text-3xl font-medium">
    {{ category?.name }}
  </h1>
  <div>Здесь представлены все товары из этой категории</div>

  <div class="mt-4 max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-2">
    <ProductCard v-for="product in category?.products" :key="product.id" :product-id="product.id" />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { params } = useRoute()

const { data: category, error } = await useFetch(`/api/category/slug/${params.categorySlug}`)
if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Category not found',
  })
}

useHead({
  title: category.value?.name,
})

const breadcrumbs = computed(() => [
  { title: t('common.home'), href: '/' },
  {
    title: category.value?.name ?? '',
    href: '#',
  },
])
</script>
