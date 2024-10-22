<template>
  <UiBreadcrumb :links="breadcrumbs" :is-dark-background="true" />

  <div class="mb-6 flex flex-col md:flex-row justify-between md:items-center gap-4">
    <div>
      <h1 class="mb-1 text-2xl md:text-3xl font-semibold">
        {{ product?.name }}
      </h1>
      <p class="text-neutral-500 break-words">
        /{{ product?.category.slug }}/{{ product?.slug }}
      </p>
    </div>

    <div class="flex flex-col md:flex-row gap-4">
      <FormUpdateProductAvailability :product-id="product?.id ?? ''" :is-available-for-purchase="product?.isAvailableForPurchase ?? false" />

      <UiButton class="min-w-48" @click="isUpdateProductOpened = true">
        {{ $t('center.edit.title') }}
      </UiButton>
    </div>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl">
    <div class="relative w-full aspect-square">
      <ProductImage :id="product?.mediaId" :lazy="false" size="md" />

      <UiButton variant="secondary" class="absolute flex justify-center items-center w-18 top-2 left-2 bg-neutral-200 dark:bg-neutral-600" @click="isUploadProductImageOpened = true">
        <Icon :name="icons.editImage" class="w-6 h-6" />
      </UiButton>
    </div>

    <div class="md:col-span-2">
      <p v-if="product?.description">
        {{ product?.description }}
      </p>
      <p v-else class="text-neutral-500">
        [{{ $t('center.product.no-description-label') }}]
      </p>
    </div>
  </div>

  <div class="mt-8">
    <h2 class="mb-4 text-xl md:text-2xl font-semibold">
      {{ $t('center.product.variants-title') }}
    </h2>

    <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      <UiActiveCard v-for="variant in product?.variants" :key="variant.id" class="space-y-2 flex flex-col justify-between" @click="() => { productVariant = variant; productVariantId = variant.id; isUpdateProductVariantOpened = true }">
        <div class="text-lg font-medium md:leading-tight text-center">
          {{ variant.name }}
        </div>

        <div class="flex flex-row flex-nowrap gap-6 items-center justify-center">
          <div class="text-neutral-500">
            {{ getLocalizedPrice(variant.gross) }} {{ getCurrencySign(channel?.currencyCode) }}
          </div>
          <div class="text-neutral-500">
            {{ variant.weightValue }}{{ getWeightLocalizedUnit(variant.weightUnit) }}
          </div>
        </div>

        <div v-if="variant.calories" class="flex flex-row gap-3 justify-center text-neutral-500 text-sm">
          <div v-if="variant.calories">
            {{ variant.calories }}{{ $t('common.abbreviation.kcal') }}
          </div>
          <div v-if="variant.protein">
            {{ variant.protein }}{{ $t('common.abbreviation.g') }}
          </div>
          <div v-if="variant.fat">
            {{ variant.fat }}{{ $t('common.abbreviation.g') }}
          </div>
          <div v-if="variant.carbohydrate">
            {{ variant.carbohydrate }}{{ $t('common.abbreviation.g') }}
          </div>
        </div>
      </UiActiveCard>

      <UiActiveCard @click="isCreateProductVariantOpened = true">
        <div class="h-full flex flex-row gap-3 justify-center items-center">
          <img
            src="~/assets/img/green-notebook.png"
            width="64"
            height="64"
            alt=""
            class="w-10 h-10"
          >

          <div class="text-lg leading-tight">
            {{ $t('center.create.title') }}
          </div>
        </div>
      </UiActiveCard>
    </div>
  </div>

  <UiModal :title="$t('center.update.product-photo')" :is-opened="isUploadProductImageOpened" @close="isUploadProductImageOpened = false">
    <FormUploadProductImage :product-id="product?.id ?? ''" :is-opened="isUploadProductImageOpened" @success="isUploadProductImageOpened = false" />
  </UiModal>

  <UiModal :title="$t('center.update.product')" :is-opened="isUpdateProductOpened" @close="isUpdateProductOpened = false">
    <FormUpdateProduct :product-id="product?.id ?? ''" :is-opened="isUpdateProductOpened" @submitted="isUpdateProductOpened = false" @success="isUpdateProductOpened = false" />
    <FormDeleteProduct :product-id="product?.id ?? ''" :redirect-to="menuPageUrl" :is-opened="isUpdateProductOpened" @success="isUpdateProductOpened = false" />
  </UiModal>

  <UiModal :title="$t('center.create.product-variant')" :is-opened="isCreateProductVariantOpened" @close="isCreateProductVariantOpened = false">
    <FormCreateProductVariant :product-id="product?.id ?? ''" :is-opened="isCreateProductVariantOpened" @success="isCreateProductVariantOpened = false" />
  </UiModal>

  <UiModal :title="$t('center.update.product-variant')" :is-opened="isUpdateProductVariantOpened" @close="isUpdateProductVariantOpened = false">
    <FormUpdateProductVariant :product-variant-id="productVariantId ?? ''" :product-variant="productVariant" :is-opened="isUpdateProductVariantOpened" @submitted="isUpdateProductVariantOpened = false" @success="isUpdateProductVariantOpened = false" />
    <FormDeleteProductVariant :product-variant-id="productVariantId ?? ''" :is-opened="isUpdateProductVariantOpened" @success="isUpdateProductVariantOpened = false" />
  </UiModal>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'command-center',
  middleware: ['staff'],
  validate: async ({ params }) => {
    const { error } = await useFetch(`/api/product/${params.id}`)
    return error.value === undefined
  },
})

const isUploadProductImageOpened = ref(false)
const isUpdateProductOpened = ref(false)
const isCreateProductVariantOpened = ref(false)
const isUpdateProductVariantOpened = ref(false)

const { icons } = useAppConfig()
const { params } = useRoute()
const { t } = useI18n()

const { channel } = await useChannel()
const { products } = await useProduct()
const product = computed(() => products.value?.find((p) => p.id === params.id))
const menuPageUrl = `/command-center/menu/${product.value?.category.menuId}`

const breadcrumbs = computed(() => [
  { title: t('common.website'), href: '/' },
  {
    title: t('center.menu.menu-page'),
    href: menuPageUrl,
  },
  {
    title: t('center.menu.product-page'),
    href: '#',
  },
])

const productVariantId = ref('')
const productVariant = ref()
</script>
