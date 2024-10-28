<template>
  <form class="mt-3" @submit="onSubmit">
    <UiButton type="submit" variant="destructive">
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

const { t } = useI18n()
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

const onSubmit = handleSubmit(async (_, { resetForm }) => {
  const { data, error } = await useAsyncData(
    'delete-product-variant',
    () => $fetch(`/api/product/variant/${productVariantId}`, { method: 'DELETE' }),
  )

  if (error.value) {
    console.error(error.value)
    toast({ title: t('error.title'), description: '...' })
  }

  if (data.value) {
    await refreshChannelData()
    await refreshProducts()
    emit('success')
    toast({ title: t('toast.variant-deleted'), description: t('toast.updating-data') })
    resetForm()
  }
})
</script>
