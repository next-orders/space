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

    <UiFormField v-slot="{ componentField }" name="type">
      <UiFormItem>
        <div>
          <UiFormLabel>{{ $t('center.data.type') }}</UiFormLabel>
          <UiFormMessage />
        </div>
        <UiSelect v-bind="componentField">
          <UiFormControl>
            <UiSelectTrigger>
              <UiSelectValue :placeholder="$t('common.select')" />
            </UiSelectTrigger>
          </UiFormControl>

          <UiSelectContent>
            <UiSelectGroup>
              <UiSelectItem v-for="type in getLocalizedPaymentMethodTypesForSelect()" :key="type.value" :value="type.value">
                {{ type.label }}
              </UiSelectItem>
            </UiSelectGroup>
          </UiSelectContent>
        </UiSelect>
      </UiFormItem>
    </UiFormField>

    <UiButton type="submit" variant="secondary">
      {{ $t('center.create.title') }}
    </UiButton>
  </form>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { channelPaymentMethodCreateSchema } from '~~/server/core/services/channel'
import { useForm } from 'vee-validate'
import { useToast } from '~/components/ui/toast'

const { isOpened } = defineProps<{
  isOpened: boolean
}>()

const emit = defineEmits(['success'])

const { toast } = useToast()
const { refresh: refreshChannelData } = await useChannel()

const formSchema = toTypedSchema(channelPaymentMethodCreateSchema)

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
    'create-payment-method',
    () => $fetch('/api/channel/payment-method', {
      method: 'POST',
      body: values,
    }),
  )

  if (error.value) {
    console.error(error.value)
    toast({ title: 'Ошибка', description: '...' })
  }

  if (data.value) {
    await refreshChannelData()
    emit('success')
    toast({ title: 'Метод оплаты создан!', description: 'Сейчас обновим данные.' })
    resetForm()
  }
})
</script>
