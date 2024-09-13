<template>
  <div class="invisible group-hover:visible group-focus:visible group-active:visible group-focus-within:visible group-focus-visible:visible fixed top-16 left-0 w-72 bg-white px-4 py-4 rounded-b-2xl shadow-lg duration-200">
    <div v-if="searchQuery" class="flex flex-col gap-2">
      <div v-if="showResults?.length" class="flex flex-col gap-2">
        <NuxtLink
          v-for="product in showResults"
          :key="product.id"
          :to="`/catalog/${product.category.slug}/${product.slug}`"
          class="px-4 py-4 rounded-xl bg-neutral-50 hover:bg-neutral-100 text-base cursor-pointer"
        >
          {{ product.name }}
        </NuxtLink>
      </div>
      <div v-else class="text-neutral-500">
        {{ $t('app.search.nothing-found') }}
      </div>
    </div>
    <div v-else class="flex flex-col gap-2">
      <div class="font-medium">
        {{ $t('app.search.most-often') }}:
      </div>

      <div v-if="topResults?.length" class="flex flex-col gap-2">
        <NuxtLink
          v-for="product in topResults"
          :key="product.id"
          :to="`/catalog/${product.category.slug}/${product.slug}`"
          class="px-4 py-4 rounded-xl bg-neutral-50 hover:bg-neutral-100 text-base cursor-pointer"
        >
          {{ product.name }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { searchQuery } = useApp()
const channelData = await useChannel()

const topResults = computed(() => {
  return channelData.value?.products.slice(0, 5)
})

const showResults = computed(() => {
  const products = findProductsByQuery(searchQuery.value)
  return products?.slice(0, 5)
})

function findProductsByQuery(query: string) {
  return channelData.value?.products.filter((product) => product.name.toLowerCase().includes(query.toLowerCase()))
}
</script>
