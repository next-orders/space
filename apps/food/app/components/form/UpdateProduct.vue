<template>
  <form class="space-y-3" @submit="onSubmit">
    <UiFormField v-slot="{ componentField }" name="name">
      <UiFormItem>
        <div>
          <UiFormLabel>{{ $t('center.data.name') }}</UiFormLabel>
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
          <UiFormLabel>{{ $t('common.description') }}</UiFormLabel>
          <UiFormMessage />
        </div>
        <UiFormControl>
          <UiTextarea v-bind="componentField" rows="8" />
        </UiFormControl>
      </UiFormItem>
    </UiFormField>

    <UiFormField v-slot="{ componentField }" name="slug">
      <UiFormItem>
        <div>
          <UiFormLabel>{{ $t('common.slug') }}</UiFormLabel>
          <UiFormMessage />
        </div>
        <UiFormControl>
          <UiInput v-bind="componentField" />
        </UiFormControl>
      </UiFormItem>
    </UiFormField>

    <UiButton type="submit" variant="secondary">
      {{ $t('center.update.title') }}
    </UiButton>
  </form>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { productUpdateSchema } from '~~/server/core/services/product'
import { useForm } from 'vee-validate'
import { useToast } from '~/components/ui/toast'

const { isOpened, productId } = defineProps<{
  isOpened: boolean
  productId: string
}>()

const emit = defineEmits(['success', 'submitted'])

const { t } = useI18n()
const { toast } = useToast()
const { refresh: refreshChannelData } = await useChannel()
const { refresh: refreshProducts, products } = await useProduct()
const product = computed(() => products.value?.find((p) => p.id === productId))

const formSchema = toTypedSchema(productUpdateSchema)

const { handleSubmit, handleReset, setValues } = useForm({
  validationSchema: formSchema,
})

watch(
  () => isOpened,
  () => {
    handleReset()
    setValues({
      name: product.value?.name,
      description: product.value?.description,
      slug: product.value?.slug,
    })
  },
)

const onSubmit = handleSubmit(async (values, { resetForm }) => {
  emit('submitted')

  const { data, error } = await useAsyncData(
    'update-product',
    () => $fetch(`/api/product/${product.value?.id}`, {
      method: 'PATCH',
      body: values,
    }),
  )

  if (error.value) {
    console.error(error.value)
    toast({ title: t('error.title'), description: '...' })
  }

  if (data.value) {
    await refreshChannelData()
    await refreshProducts()
    emit('success')
    toast({ title: t('toast.product-updated'), description: t('toast.updating-data') })
    resetForm()
  }
})
</script>
