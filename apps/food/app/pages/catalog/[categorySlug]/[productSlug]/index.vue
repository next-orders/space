<template>
  {{ slug }}
  {{ product }}

  <div v-for="variant in product?.variants" :key="variant.id">
    <button @click="addToCart(variant.id)">
      Добавить в корзину
    </button>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = route.params.productSlug

const { data: product } = await useFetch(`/api/product/slug/${slug}`)

async function addToCart(productVariantId: string) {
  await $fetch(
    '/api/checkout',
    {
      method: 'POST',
      body: {
        productVariantId,
      },
    },
  )
}
</script>
