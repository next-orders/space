<template>
  <UiBreadcrumb :links="breadcrumbs" />

  <div class="mb-4 flex flex-col md:flex-row justify-between md:items-center gap-2">
    <h1 class="text-2xl md:text-3xl font-semibold">
      {{ menu?.name }}
    </h1>

    <UiButton class="w-full md:w-fit" @click="isCreateMenuCategoryOpened = true">
      Добавить категорию
    </UiButton>
  </div>

  <div v-for="category in menu?.categories" :key="category.id" class="mb-8">
    <h2 class="mb-4 text-2xl lg:text-xl pb-2 border-b border-neutral-100">
      {{ category.name }}
    </h2>

    <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-2">
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

  <CommandCenterModal :title="$t('center.create.product')" :is-opened="isCreateProductOpened" @close="() => isCreateProductOpened = false">
    <FormCreateProduct :category-id="categoryId" :is-opened="isCreateProductOpened" @success="() => isCreateProductOpened = false" />
  </CommandCenterModal>

  <CommandCenterModal :title="$t('center.create.menu-category')" :is-opened="isCreateMenuCategoryOpened" @close="() => isCreateMenuCategoryOpened = false">
    <FormCreateMenuCategory :menu-id="menu?.id ?? ''" :is-opened="isCreateMenuCategoryOpened" @success="() => isCreateMenuCategoryOpened = false" />
  </CommandCenterModal>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'command-center',
  middleware: ['staff'],
})

const isCreateProductOpened = ref(false)
const isCreateMenuCategoryOpened = ref(false)

const { params } = useRoute()
const { t } = useI18n()

const breadcrumbs = computed(() => [
  { title: t('common.website'), href: '/' },
  {
    title: t('center.menu.menu'),
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
