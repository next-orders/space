<template>
  <form class="space-y-3" @submit="onSubmit">
    <UiButton type="submit" variant="destructive" class="mt-4">
      {{ $t('center.delete.title') }}
    </UiButton>
  </form>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { useToast } from '~/components/ui/toast'

const { isOpened, productVariantId } = defineProps<{
  isOpened: boolean
  productVariantId: string
}>()

const emit = defineEmits(['success'])

const { toast } = useToast()
const { refresh: refreshChannelData } = await useChannel()
const { refresh: refreshProducts } = await useProduct()

const { handleSubmit, handleReset } = useForm()

watch(
  () => isOpened,
  () => {
    handleReset()
  },
)

const onSubmit = handleSubmit(async (values, { resetForm }) => {
  const { data, error } = await useAsyncData(
    'delete-product-variant',
    () => $fetch(`/api/product/variant/${productVariantId}`, {
      method: 'DELETE',
      body: values,
    }),
  )

  if (error.value) {
    console.error(error.value)
    toast({ title: 'Ошибка', description: '...' })
  }

  if (data.value) {
    await refreshChannelData()
    await refreshProducts()
    emit('success')
    toast({ title: 'Вариация удалена!', description: 'Сейчас обновим данные.' })
    resetForm()
  }
})
</script>
