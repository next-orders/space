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

const { isOpened, productId, redirectTo } = defineProps<{
  isOpened: boolean
  productId: string
  redirectTo: string
}>()

const emit = defineEmits(['success'])

const router = useRouter()
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
    'delete-product',
    () => $fetch(`/api/product/${productId}`, { method: 'DELETE' }),
  )

  if (error.value) {
    console.error(error.value)
    toast({ title: t('error.title'), description: '...' })
  }

  if (data.value) {
    await refreshChannelData()
    await refreshProducts()
    emit('success')
    toast({ title: t('toast.product-deleted'), description: t('toast.updating-data') })
    resetForm()
    router.push(redirectTo)
  }
})
</script>
