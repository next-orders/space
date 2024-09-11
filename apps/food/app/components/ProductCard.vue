<template>
  <NuxtLink
    :to="productUrl"
    class="bg-white dark:bg-gray-600 rounded-2xl h-auto w-auto max-w-[22rem] p-3 cursor-pointer active:scale-95 lg:active:scale-90 lg:hover:scale-95 duration-200"
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
          {{ price }}<span class="pl-1 text-lg">₽</span>
        </div>
        <p class="font-normal leading-tight line-clamp-2">
          {{ product?.name }}
        </p>
        <div class="mt-2 font-light text-gray-500 dark:text-white">
          {{ weightValue }}{{ weightUnitLocalized }}
        </div>
      </div>

      <div class="flex flex-row gap-2 items-center justify-center mt-2 w-full h-12 bg-gray-100 dark:bg-gray-700 rounded-xl">
        <Icon :name="icons.plus" class="w-5 h-5" />
        <div class="text-center text-base font-normal">
          {{ $t('app.cart.add') }}
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
const channelData = await useChannel()
const product = channelData.value?.products.find(({ id }) => id === productId)

const weightValue = product?.variants[0]?.weightValue
const weightUnitLocalized = getWeightLocalizedUnit(product?.variants[0]?.weightUnit as WeightUnit)

const price = getLocalizedPrice(650)
const productImageUrl = '/burger-1.jpg'

const categorySlug = channelData.value?.categories.find(({ id }) => id === product?.categoryId)?.slug
const productUrl = `/catalog/${categorySlug}/${product?.slug}`
</script>
