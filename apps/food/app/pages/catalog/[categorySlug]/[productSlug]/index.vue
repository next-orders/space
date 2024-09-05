<template>
  {{ slug }}
  {{ product }}

  <div v-for="variant in product?.variants" :key="variant.id">
    <button @click="addToCheckout(variant.id)">
      Добавить в корзину
    </button>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = route.params.productSlug

const { addToCheckout } = await useCheckout()
const { data: product } = await useFetch(`/api/product/slug/${slug}`)
</script>
