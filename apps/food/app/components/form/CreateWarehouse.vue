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

    <UiFormField v-slot="{ componentField }" name="address">
      <UiFormItem>
        <div>
          <UiFormLabel>{{ $t('app.checkout.address.title') }}</UiFormLabel>
          <UiFormMessage />
        </div>
        <UiFormControl>
          <UiInput v-bind="componentField" />
        </UiFormControl>
      </UiFormItem>
    </UiFormField>

    <UiButton type="submit" variant="secondary">
      {{ $t('center.create.title') }}
    </UiButton>
  </form>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { warehouseCreateSchema } from '~~/server/core/services/warehouse'
import { useForm } from 'vee-validate'
import { useToast } from '~/components/ui/toast'

const { isOpened } = defineProps<{
  isOpened: boolean
}>()

const emit = defineEmits(['success'])

const { t } = useI18n()
const { toast } = useToast()
const { refresh: refreshChannelData } = await useChannel()

const formSchema = toTypedSchema(warehouseCreateSchema)

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
    'create-warehouse',
    () => $fetch('/api/warehouse', {
      method: 'POST',
      body: values,
    }),
  )

  if (error.value) {
    console.error(error.value)
    toast({ title: t('error.title'), description: '...' })
  }

  if (data.value) {
    await refreshChannelData()
    emit('success')
    toast({ title: t('toast.warehouse-created'), description: t('toast.updating-data') })
    resetForm()
  }
})
</script>
