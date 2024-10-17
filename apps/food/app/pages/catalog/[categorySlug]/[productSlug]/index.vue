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
          {{ weightValue }}{{ weightUnit }}
        </div>

        <div v-if="!withSingleVariant" class="mt-4 mb-6 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-2">
          <UiButton v-for="variant in product?.variants" :key="variant.id" variant="secondary" class="w-full min-h-14 flex flex-row flex-wrap gap-2 justify-start items-center" @click="variantId = variant.id">
            <UiCheckBadge v-if="variant.id === selectedVariant?.id" />
            <Icon :name="variant.id === selectedVariant?.id ? icons.bookmarkCheck : icons.bookmark" class="w-6 h-6 text-neutral-300" :class="{ '!text-emerald-500': variant.id === selectedVariant?.id }" />
            <p class="font-medium leading-tight break-all">
              {{ variant.name }}
            </p>
          </UiButton>
        </div>

        <div class="mt-4 flex flex-row gap-6 items-center">
          <div class="text-2xl font-medium tracking-tight">
            {{ price }} <span class="text-xl">{{ getCurrencySign(channel?.currencyCode) }}</span>
          </div>

          <CartLineCounter v-if="inCart" :line-id="inCart.id" />
          <UiButton v-else class="w-fit flex flex-row gap-2 items-center" @click="addProduct(variantId ?? '')">
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
        <div class="mt-2 px-4 py-4 w-fit flex flex-row gap-4 bg-neutral-100 dark:bg-neutral-500 rounded-2xl">
          <div>
            <div class="font-medium">
              {{ selectedVariant?.calories }}
            </div>
            <div class="lowercase">
              {{ $t('common.nutrition.kcal') }}
            </div>
          </div>
          <div>
            <div class="font-medium">
              {{ selectedVariant?.protein }}{{ $t('common.abbreviation.g') }}
            </div>
            <div class="lowercase">
              {{ $t('common.nutrition.protein') }}
            </div>
          </div>
          <div>
            <div class="font-medium">
              {{ selectedVariant?.fat }}{{ $t('common.abbreviation.g') }}
            </div>
            <div class="lowercase">
              {{ $t('common.nutrition.fat') }}
            </div>
          </div>
          <div>
            <div class="font-medium">
              {{ selectedVariant?.carbohydrate }}{{ $t('common.abbreviation.g') }}
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

const variantId = ref(product.value?.variants[0]?.id)
const withSingleVariant = computed(() => product.value?.variants.length === 1)
const selectedVariant = computed(() => product.value?.variants.find(({ id }) => id === variantId.value))

const price = computed(() => getLocalizedPrice(selectedVariant.value?.gross))
const weightValue = computed(() => selectedVariant.value?.weightValue)
const weightUnit = computed(() => getWeightLocalizedUnit(selectedVariant.value?.weightUnit))

const isNutritionShown = computed(() => selectedVariant.value?.calories && selectedVariant.value?.protein && selectedVariant.value?.fat && selectedVariant.value?.carbohydrate)

const inCart = computed(() => {
  return checkout.value?.lines?.find((l) => l.variant.id === selectedVariant.value?.id)
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
