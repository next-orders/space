<template>
  <form class="space-y-4" @submit="onSubmit">
    <div v-for="day in channel?.workingDays" :key="day.id">
      <div class="grid grid-cols-2 gap-4">
        <UiFormField :name="`${day.day}.open`">
          <UiFormItem>
            <div>
              <UiFormLabel>{{ getLocalizedDayOfWeek(day.day) }}, {{ $t('common.time-from') }}</UiFormLabel>
              <UiFormMessage />
            </div>
            <UiFormControl>
              <UiInput v-model="workingDays[day.day as WorkingDay['day']].open" type="time" />
            </UiFormControl>
          </UiFormItem>
        </UiFormField>

        <UiFormField :name="`${day.day}.close`">
          <UiFormItem>
            <div>
              <UiFormLabel>{{ $t('common.time-to') }}</UiFormLabel>
              <UiFormMessage />
            </div>
            <UiFormControl>
              <UiInput v-model="workingDays[day.day as WorkingDay['day']].close" type="time" />
            </UiFormControl>
          </UiFormItem>
        </UiFormField>
      </div>
    </div>

    <UiButton type="submit" variant="secondary">
      {{ $t('center.update.title') }}
    </UiButton>
  </form>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { channelUpdateSchema } from '~~/server/core/services/channel'
import { useForm } from 'vee-validate'
import { useToast } from '~/components/ui/toast'

const { isOpened } = defineProps<{
  isOpened: boolean
}>()

const emit = defineEmits(['success', 'submitted'])

const { t } = useI18n()
const { toast } = useToast()
const { channel, refresh: refreshChannelData } = await useChannel()

const formSchema = toTypedSchema(channelUpdateSchema)

const { handleSubmit, handleReset } = useForm({
  validationSchema: formSchema,
})

const days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'] as const

const workingDays = reactive(prepareWorkingDays())

function prepareWorkingDays() {
  const preparedDays = {
    MONDAY: { open: '', close: '' },
    TUESDAY: { open: '', close: '' },
    WEDNESDAY: { open: '', close: '' },
    THURSDAY: { open: '', close: '' },
    FRIDAY: { open: '', close: '' },
    SATURDAY: { open: '', close: '' },
    SUNDAY: { open: '', close: '' },
  }

  for (const day of days) {
    preparedDays[day] = {
      open: `${channel.value?.workingDays.find((d) => d.day === day)?.openHours.toString().padStart(2, '0')}:${channel.value?.workingDays.find((d) => d.day === day)?.openMinutes.toString().padStart(2, '0')}`,
      close: `${channel.value?.workingDays.find((d) => d.day === day)?.closeHours.toString().padStart(2, '0')}:${channel.value?.workingDays.find((d) => d.day === day)?.closeMinutes.toString().padStart(2, '0')}`,
    }
  }

  return preparedDays
}

watch(
  () => isOpened,
  () => {
    handleReset()
  },
)

const onSubmit = handleSubmit(async (_, { resetForm }) => {
  emit('submitted')

  // add to all open and close ':00' at the end of workingDays object for future zod time() validation
  const workingDaysCopy = JSON.parse(JSON.stringify(workingDays)) as typeof workingDays

  Object.values(workingDaysCopy).forEach((day) => {
    day.open += ':00'
    day.close += ':00'
  })

  const { data, error } = await useAsyncData(
    'update-working-days',
    () => $fetch('/api/channel/working-day', {
      method: 'PATCH',
      body: workingDaysCopy,
    }),
  )

  if (error.value) {
    console.error(error.value)
    toast({ title: t('error.title'), description: '...' })
  }

  if (data.value) {
    await refreshChannelData()
    emit('success')
    toast({ title: t('toast.opening-hours-updated'), description: t('toast.updating-data') })
    resetForm()
  }
})
</script>
