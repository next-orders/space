<template>
  <NuxtLink
    to="{productUrl}"
    class="bg-white rounded-2xl h-auto w-auto max-w-[22rem] p-3 cursor-pointer active:scale-95 lg:active:scale-90 lg:hover:scale-95 duration-200"
  >
    <div class="flex flex-col justify-between h-full">
      <div>
        <div class="relative w-full aspect-square">
          <img
            :src="productImageUrl"
            alt=""
            fill
            sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
            class="rounded-xl object-cover object-center"
          >
        </div>

        <div class="mt-2 text-xl font-medium">
          <!-- <Price value="{gross}" /> -->
          0
          <span class="pl-1 text-lg">₽</span>
        </div>
        <p class="font-normal leading-tight line-clamp-2">
          {{ product?.name }}
        </p>
        <div class="mt-2 font-light text-zinc-500">
          {weightValue}
          {weightUnitLocalized}
        </div>
      </div>

      <div class="flex flex-row gap-2 items-center justify-center mt-2 w-full h-12 bg-zinc-100 rounded-xl">
        <Icon :name="icons.plus" class="w-5 h-5" />
        <div class="text-center text-base font-light">
          Добавить
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
const { productId } = defineProps<{
  productId: string
}>()

const { icons } = useAppConfig()
// const { data: products } = await useFetch('/api/channel/product', { key: 'all' })
const channelData = await useChannel()
const product = channelData.value?.products.find(({ id }) => id === productId)

const productImageUrl = ''
</script>
