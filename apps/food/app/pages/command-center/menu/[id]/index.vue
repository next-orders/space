<template>
  <UiBreadcrumb :links="breadcrumbs" />

  <h1 class="text-2xl font-semibold mb-4">
    {{ menu?.name }}
  </h1>

  <div v-for="category in menu?.categories" :key="category.id" class="mb-8">
    <h2 class="text-xl pb-2 mb-4 border-b border-neutral-100">
      {{ category.name }}
    </h2>

    <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-2">
      <CommandCenterProductCard v-for="product in category.products" :key="product.id" :product-id="product.id" />

      <CommandCenterProductCreateCard @click="() => { isModalOpened = true; categoryId = category.id }" />
    </div>
  </div>

  <CommandCenterModal :title="$t('center.create.product')" :on-close="handleReset">
    <form class="space-y-3" @submit="onSubmit">
      <UiFormField v-model="categoryId" hidden name="categoryId" />

      <UiFormField v-slot="{ componentField }" name="name">
        <UiFormItem>
          <div>
            <UiFormLabel>Название</UiFormLabel>
            <UiFormMessage />
          </div>
          <UiFormControl>
            <UiInput v-bind="componentField" />
          </UiFormControl>
        </UiFormItem>
      </UiFormField>

      <UiFormField v-slot="{ componentField }" name="description">
        <UiFormItem>
          <div>
            <UiFormLabel>Описание</UiFormLabel>
            <UiFormMessage />
          </div>
          <UiFormControl>
            <UiInput v-bind="componentField" />
          </UiFormControl>
        </UiFormItem>
      </UiFormField>

      <UiButton type="submit" variant="secondary" class="mt-4">
        Добавить
      </UiButton>
    </form>
  </CommandCenterModal>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { productCreateSchema } from '~~/server/core/services/product'
import { useForm } from 'vee-validate'

definePageMeta({
  layout: 'command-center',
  middleware: ['staff'],
})

const { isModalOpened } = useCommandCenter()
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

const dataChannel = await useChannel()
const menu = computed(() => dataChannel.value?.menus?.find((menu) => menu.id === params.id))

const categoryId = ref()

const formSchema = toTypedSchema(productCreateSchema)

const { handleSubmit, handleReset } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit(async (values, { resetForm }) => {
  const { data, error } = await useFetch('/api/product', {
    method: 'POST',
    body: values,
  })

  if (error.value) {
    console.error(error.value)
  }

  if (data.value) {
    isModalOpened.value = false
    resetForm()
  }
})
</script>
