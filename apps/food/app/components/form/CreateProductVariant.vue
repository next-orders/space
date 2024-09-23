<template>
  <form class="space-y-3" @submit="onSubmit">
    <UiFormField :key="productId" :value="productId" hidden name="productId" />

    <UiFormField v-slot="{ componentField }" name="weightUnit">
      <UiFormItem>
        <div>
          <UiFormLabel>weightUnit</UiFormLabel>
          <UiFormMessage />
        </div>
        <UiFormControl>
          <UiInput v-bind="componentField" />
        </UiFormControl>
      </UiFormItem>
    </UiFormField>

    <UiFormField v-slot="{ componentField }" name="weightValue">
      <UiFormItem>
        <div>
          <UiFormLabel>weightValue</UiFormLabel>
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
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { productVariantCreateSchema } from '~~/server/core/services/product'
import { useForm } from 'vee-validate'
import { useToast } from '~/components/ui/toast'

const { isOpened, productId } = defineProps<{
  isOpened: boolean
  productId: string
}>()

const emit = defineEmits(['success'])

const { toast } = useToast()
const { refresh: refreshChannelData } = await useChannel()

const formSchema = toTypedSchema(productVariantCreateSchema)

const { handleSubmit, handleReset } = useForm({
  validationSchema: formSchema,
})

watch(
  () => isOpened,
  () => {
    handleReset()
  },
)

const onSubmit = handleSubmit(async (values, { resetForm }) => {
  const { data, error } = await useAsyncData(
    'create-product-variant',
    () => $fetch('/api/product/variant', {
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
    toast({ title: 'Вариация создана!', description: 'Сейчас обновим данные.' })
  }
})
</script>
