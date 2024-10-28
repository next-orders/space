<template>
  <form class="flex flex-row items-center gap-3">
    <UiSwitch :id="`${method}-switch`" :default-checked="isActive" @update:checked="onSubmit()" />
    <UiLabel :for="`${method}-switch`" class="text-base font-medium min-w-28 leading-tight">
      {{ method === 'DELIVERY' ? $t('app.cart.delivery') : $t('app.cart.pickup') }}
    </UiLabel>
  </form>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { useToast } from '~/components/ui/toast'

const { isActive, method } = defineProps<{
  isActive: boolean
  method: 'DELIVERY' | 'PICKUP'
}>()

const emit = defineEmits(['success'])

const { t } = useI18n()
const { toast } = useToast()
const { refresh: refreshChannelData } = await useChannel()

const { handleSubmit, handleReset, setFieldValue } = useForm()

watch(
  () => isActive,
  () => {
    handleReset()
    setFieldValue('isActive', isActive)
  },
)

const onSubmit = handleSubmit(async (_, { resetForm }) => {
  const { data, error } = await useAsyncData(
    'update-channel-receiving-method',
    () => $fetch('/api/channel/receiving-method', {
      method: 'POST',
      body: { method },
    }),
  )

  if (error.value) {
    console.error(error.value)
    toast({ title: t('error.title'), description: '...' })
  }

  if (data.value) {
    await refreshChannelData()
    emit('success')
    toast({ title: t('toast.receiving-method-updated'), description: t('toast.updating-data') })
    resetForm()
  }
})
</script>
