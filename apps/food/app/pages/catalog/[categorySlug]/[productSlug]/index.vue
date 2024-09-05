<template>
  <Breadcrumbs :breadcrumbs="breadcrumbs" />
  {{ slug }}
  {{ product }}

  <div v-for="variant in product?.variants" :key="variant.id">
    <button @click="addProduct(variant.id)">
      Добавить в корзину
    </button>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = route.params.productSlug

const { addProduct } = await useCheckout()
const { data: product } = await useFetch(`/api/product/slug/${slug}`)

const breadcrumbs = [
  { title: 'Главная', href: '/' },
  {
    title: product.value?.category?.name ?? '',
    href: `/catalog/${product.value?.category?.slug}`,
  },
  { title: product.value?.name ?? '', href: '#' },
]
</script>
