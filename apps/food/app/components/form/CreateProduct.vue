<template>
  <CommandCenterModal :title="$t('center.create.product')" :on-close="handleReset">
    <form class="space-y-3" @submit="onSubmit">
      <slot />

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
        {{ $t('center.create.title') }}
      </UiButton>
    </form>
  </CommandCenterModal>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { productCreateSchema } from '~~/server/core/services/product'
import { useForm } from 'vee-validate'
import { useToast } from '~/components/ui/toast'

const { toast } = useToast()
const { refresh: refreshChannelData } = await useChannel()
const { isModalOpened } = useCommandCenter()

const formSchema = toTypedSchema(productCreateSchema)

const { handleSubmit, handleReset } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit(async (values, { resetForm }) => {
  const { data, error } = await useAsyncData(
    'create-product',
    () => $fetch('/api/product', {
      method: 'POST',
      body: values,
    }),
  )

  if (error.value) {
    console.error(error.value)
    toast({ title: 'Ошибка', description: '...' })
  }

  if (data.value) {
    resetForm()
    await refreshChannelData()
    isModalOpened.value = false
    toast({ title: 'Продукт создан!', description: 'Сейчас обновим данные.' })
  }
})
</script>
