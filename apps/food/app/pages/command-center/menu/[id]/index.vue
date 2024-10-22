<template>
  <UiBreadcrumb :links="breadcrumbs" :is-dark-background="true" />

  <div class="mb-4 flex flex-col md:flex-row justify-between md:items-center gap-2">
    <h1 class="text-2xl md:text-3xl font-semibold">
      {{ menu?.name }}
    </h1>

    <div class="flex flex-col md:flex-row gap-4">
      <FormUpdateMenuActivity :menu-id="menu?.id ?? ''" :is-active="menu?.isActive ?? false" />

      <UiButton class="w-full md:w-fit" @click="isCreateMenuCategoryOpened = true">
        {{ t('center.add.menu-category') }}
      </UiButton>
    </div>
  </div>

  <div v-for="category in menu?.categories" :key="category.id" class="mb-8">
    <div class="mb-4 pb-2 border-b border-neutral-200 dark:border-neutral-600 flex flex-row gap-3 items-center">
      <h2 class="text-2xl lg:text-xl">
        {{ category.name }}
      </h2>
      <Icon :name="icons.edit" class="w-5 h-5 text-neutral-500 cursor-pointer" @click="() => { categoryId = category.id; isUpdateMenuCategoryOpened = true }" />
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7 gap-4">
      <CommandCenterProductCard v-for="product in category.products" :key="product.id" :product-id="product.id" />
      <CommandCenterProductCreateCard @click="() => { categoryId = category.id; isCreateProductOpened = true }" />
    </div>
  </div>

  <div class="mt-32 text-center max-w-xl mx-auto">
    <img
      src="~/assets/img/recipe-book.png"
      width="64"
      height="64"
      alt=""
      class="mx-auto mb-4 w-16 h-16"
    >
    <h2 class="mb-4 text-lg font-semibold">
      Здесь происходит работа с конкретным меню
    </h2>
    <p class="text-center">
      Можно добавлять новые категории и продукты.
    </p>
  </div>

  <UiModal :title="$t('center.create.product')" :is-opened="isCreateProductOpened" @close="isCreateProductOpened = false">
    <FormCreateProduct :category-id="categoryId" :is-opened="isCreateProductOpened" @success="isCreateProductOpened = false" />
  </UiModal>

  <UiModal :title="$t('center.create.menu-category')" :is-opened="isCreateMenuCategoryOpened" @close="isCreateMenuCategoryOpened = false">
    <FormCreateMenuCategory :menu-id="menu?.id ?? ''" :is-opened="isCreateMenuCategoryOpened" @success="isCreateMenuCategoryOpened = false" />
  </UiModal>

  <UiModal :title="$t('center.update.menu-category')" :is-opened="isUpdateMenuCategoryOpened" @close="isUpdateMenuCategoryOpened = false">
    <FormUpdateMenuCategory :menu-id="menu?.id ?? ''" :category-id="categoryId" :is-opened="isUpdateMenuCategoryOpened" @success="isUpdateMenuCategoryOpened = false" />
  </UiModal>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'command-center',
  middleware: ['staff'],
})

const isCreateProductOpened = ref(false)
const isCreateMenuCategoryOpened = ref(false)
const isUpdateMenuCategoryOpened = ref(false)

const { params } = useRoute()
const { t } = useI18n()
const { icons } = useAppConfig()

const breadcrumbs = computed(() => [
  { title: t('common.website'), href: '/' },
  {
    title: t('center.menu.title'),
    href: '/command-center/menu',
  },
  {
    title: t('center.menu.menu-page'),
    href: '#',
  },
])

const { menus } = await useChannel()
const menu = computed(() => menus.value?.find((menu) => menu.id === params.id))

const categoryId = ref('')
</script>
