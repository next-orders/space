<template>
  <Breadcrumbs :links="breadcrumbs" />

  <h1 class="text-3xl font-medium">
    {{ category?.name }}
  </h1>
  <div>Здесь представлены все товары из этой категории</div>

  <div class="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-2">
    <ProductCard v-for="product in category?.products" :key="product.id" :product-id="product.id" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  validate: async ({ params }) => {
    const { error } = await useFetch(`/api/category/slug/${params.categorySlug}`)
    return error.value === undefined
  },
})

const { t } = useI18n()
const { params } = useRoute()
const slug = params.categorySlug

const { data: category } = await useFetch(`/api/category/slug/${slug}`)

useHead({
  title: category.value?.name,
})

const breadcrumbs = [
  { title: t('common.home'), href: '/' },
  {
    title: category.value?.name ?? '',
    href: '#',
  },
]
</script>
