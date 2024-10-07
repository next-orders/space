<template>
  <UiBreadcrumb :links="breadcrumbs" :is-dark-background="true" />

  <div class="bg-white dark:bg-neutral-600 px-5 py-5 rounded-2xl">
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-x-0 gap-y-4 sm:gap-4">
      <div class="col-span-1 relative w-full aspect-square">
        <ProductImage :id="product?.mediaId" :lazy="false" size="md" />
      </div>

      <div class="col-span-2">
        <h1 class="text-xl md:text-2xl lg:text-3xl font-medium">
          {{ product?.name }}
        </h1>
        <div class="mt-1 font-normal text-neutral-400">
          {{ productVariant?.weightValue }}{{ getWeightLocalizedUnit(productVariant?.weightUnit) }}
        </div>

        <div class="mt-4 flex flex-row gap-6 items-center">
          <div class="text-2xl font-medium tracking-tight">
            {{ getLocalizedPrice(productVariant?.gross) }} <span class="text-xl">{{ getCurrencySign(channel?.currencyCode) }}</span>
          </div>

          <CartLineCounter v-if="inCart" :line-id="inCart.id" />
          <UiButton v-else class="w-fit flex flex-row gap-2 items-center" @click="addProduct(productVariant?.id ?? '')">
            <Icon :name="icons.basket" size="24" /> {{ $t('app.cart.add-to-cart') }}
          </UiButton>
        </div>
      </div>
    </div>

    <div class="mt-6 flex flex-col xl:flex-row justify-between gap-4">
      <div v-if="product?.description">
        <div class="mb-1 font-medium text-neutral-400">
          {{ $t('common.description') }}
        </div>
        <div class="leading-snug">
          {{ product.description }}
        </div>
      </div>

      <div v-if="isNutritionShown">
        <div class="mb-1 font-medium text-neutral-400">
          {{ $t('common.nutrition.value-title') }}
        </div>
        <div class="mt-2 px-4 py-4 w-fit flex flex-row gap-4 bg-neutral-100 rounded-2xl">
          <div>
            <div class="font-medium">
              {{ productVariant?.calories }}
            </div>
            <div class="lowercase">
              {{ $t('common.nutrition.kcal') }}
            </div>
          </div>
          <div>
            <div class="font-medium">
              {{ productVariant?.protein }}{{ $t('common.abbreviation.g') }}
            </div>
            <div class="lowercase">
              {{ $t('common.nutrition.protein') }}
            </div>
          </div>
          <div>
            <div class="font-medium">
              {{ productVariant?.fat }}{{ $t('common.abbreviation.g') }}
            </div>
            <div class="lowercase">
              {{ $t('common.nutrition.fat') }}
            </div>
          </div>
          <div>
            <div class="font-medium">
              {{ productVariant?.carbohydrate }}{{ $t('common.abbreviation.g') }}
            </div>
            <div class="lowercase">
              {{ $t('common.nutrition.carbohydrate') }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { params } = useRoute()
const { icons } = useAppConfig()
const { channel } = await useChannel()
const { addProduct, checkout } = useCheckout()

const { data: product, error } = await useFetch(`/api/product/slug/${params.productSlug}`)
if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Product not found',
  })
}

useHead({
  title: product.value?.name,
})

const productVariant = computed(() => product.value?.variants[0])
const isNutritionShown = computed(() => productVariant.value?.calories && productVariant.value?.protein && productVariant.value?.fat && productVariant.value?.carbohydrate)

const inCart = computed(() => {
  return checkout.value?.lines?.find((l) => l.variant.id === productVariant.value?.id)
})

const breadcrumbs = computed(() => [
  { title: t('common.home'), href: '/' },
  {
    title: product.value?.category?.name ?? '',
    href: `/catalog/${product.value?.category?.slug}`,
  },
  { title: product.value?.name ?? '', href: '#' },
])
</script>
