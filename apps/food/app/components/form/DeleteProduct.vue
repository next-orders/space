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

const { isOpened, productId, redirectTo } = defineProps<{
  isOpened: boolean
  productId: string
  redirectTo: string
}>()

const emit = defineEmits(['success'])

const router = useRouter()
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
    toast({ title: 'Ошибка', description: '...' })
  }

  if (data.value) {
    await refreshChannelData()
    await refreshProducts()
    emit('success')
    toast({ title: 'Продукт удален!', description: 'Сейчас обновим данные.' })
    resetForm()
    router.push(redirectTo)
  }
})
</script>
