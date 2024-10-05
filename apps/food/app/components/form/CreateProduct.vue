<template>
  <form class="space-y-3" @submit="onSubmit">
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
          <UiTextarea v-bind="componentField" />
        </UiFormControl>
      </UiFormItem>
    </UiFormField>

    <UiButton type="submit" variant="secondary">
      {{ $t('center.create.title') }}
    </UiButton>
  </form>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { productCreateSchema } from '~~/server/core/services/product'
import { useForm } from 'vee-validate'
import { useToast } from '~/components/ui/toast'

const { isOpened, categoryId } = defineProps<{
  isOpened: boolean
  categoryId: string
}>()

const emit = defineEmits(['success'])

const { toast } = useToast()
const { refresh: refreshChannelData } = await useChannel()

const formSchema = toTypedSchema(productCreateSchema)

const { handleSubmit, handleReset, setFieldValue } = useForm({
  validationSchema: formSchema,
})

watch(
  () => isOpened,
  () => {
    handleReset()
    setFieldValue('categoryId', categoryId)
  },
)

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
    emit('success')
    toast({ title: 'Продукт создан!', description: 'Сейчас обновим данные.' })
  }
})
</script>
