<template>
  <form class="flex flex-row items-center gap-3">
    <UiSwitch :id="`${day}-day`" :default-checked="isActive" @update:checked="onSubmit()" />
    <UiLabel :for="`${day}-day`" class="text-base font-medium min-w-28 leading-tight">
      {{ getLocalizedDayOfWeek(day) }}
    </UiLabel>
  </form>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { useToast } from '~/components/ui/toast'

const { isActive, day } = defineProps<{
  isActive: boolean
  day: WorkingDay['day']
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
    'update-working-day-activity',
    () => $fetch('/api/channel/working-day/activity', {
      method: 'POST',
      body: { day },
    }),
  )

  if (error.value) {
    console.error(error.value)
    toast({ title: t('error.title'), description: '...' })
  }

  if (data.value) {
    await refreshChannelData()
    emit('success')
    toast({ title: t('toast.working-day-updated'), description: t('toast.updating-data') })
    resetForm()
  }
})
</script>
