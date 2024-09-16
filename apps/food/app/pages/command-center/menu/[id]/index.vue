<template>
  <Breadcrumbs :links="breadcrumbs" />

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

  <CommandCenterModal :title="$t('center.create.product')">
    <form @submit="onSubmit">
      <UiFormField v-slot="{ componentField }" name="name">
        <UiFormItem>
          <UiFormLabel>Название</UiFormLabel>
          <UiFormControl>
            <UiInput v-bind="componentField" />
          </UiFormControl>
          <UiFormDescription>
            Укажите название для нового продукта.
          </UiFormDescription>
          <UiFormMessage />
        </UiFormItem>
      </UiFormField>

      <UiFormField v-slot="{ componentField }" name="description">
        <UiFormItem>
          <UiFormLabel>Описание</UiFormLabel>
          <UiFormControl>
            <UiInput v-bind="componentField" />
          </UiFormControl>
          <UiFormDescription>
            Укажите продающее описание.
          </UiFormDescription>
          <UiFormMessage />
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
import { useForm } from 'vee-validate'
import * as z from 'zod'

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

const formSchema = toTypedSchema(z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(0).max(250),
}))

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit((_values) => {
  //
})
</script>
