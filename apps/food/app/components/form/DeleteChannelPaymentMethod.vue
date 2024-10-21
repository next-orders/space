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

const { isOpened, paymentMethodId } = defineProps<{
  isOpened: boolean
  paymentMethodId: string
}>()

const emit = defineEmits(['success'])

const { toast } = useToast()
const { refresh: refreshChannelData } = await useChannel()

const { handleSubmit, handleReset } = useForm()

watch(
  () => isOpened,
  () => {
    handleReset()
  },
)

const onSubmit = handleSubmit(async (_, { resetForm }) => {
  const { data, error } = await useAsyncData(
    'delete-payment-method',
    () => $fetch(`/api/channel/payment-method/${paymentMethodId}`, { method: 'DELETE' }),
  )

  if (error.value) {
    console.error(error.value)
    toast({ title: 'Ошибка', description: '...' })
  }

  if (data.value) {
    await refreshChannelData()
    emit('success')
    toast({ title: 'Метод оплаты удален!', description: 'Сейчас обновим данные.' })
    resetForm()
  }
})
</script>
