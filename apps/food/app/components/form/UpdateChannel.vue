<template>
  <form class="space-y-3" @submit="onSubmit">
    <UiFormField v-slot="{ componentField }" name="name">
      <UiFormItem>
        <div>
          <UiFormLabel>Название</UiFormLabel>
          <UiFormMessage />
        </div>
        <UiFormControl>
          <UiInput v-bind="componentField" />
        </UiFormControl>
      </UiFormItem>
    </UiFormField>

    <UiFormField v-slot="{ componentField }" name="description">
      <UiFormItem>
        <div>
          <UiFormLabel>Описание</UiFormLabel>
          <UiFormMessage />
        </div>
        <UiFormControl>
          <UiTextarea v-bind="componentField" />
        </UiFormControl>
      </UiFormItem>
    </UiFormField>

    <UiFormField v-slot="{ componentField }" name="phone">
      <UiFormItem>
        <div>
          <UiFormLabel>Телефон</UiFormLabel>
          <UiFormMessage />
        </div>
        <UiFormControl>
          <UiInput v-bind="componentField" />
        </UiFormControl>
      </UiFormItem>
    </UiFormField>

    <UiFormField v-slot="{ componentField }" name="currencyCode">
      <UiFormItem>
        <div>
          <UiFormLabel>Валюта</UiFormLabel>
          <UiFormMessage />
        </div>
        <UiFormControl>
          <UiInput v-bind="componentField" />
        </UiFormControl>
      </UiFormItem>
    </UiFormField>

    <UiFormField v-slot="{ componentField }" name="countryCode">
      <UiFormItem>
        <div>
          <UiFormLabel>Страна</UiFormLabel>
          <UiFormMessage />
        </div>
        <UiFormControl>
          <UiInput v-bind="componentField" />
        </UiFormControl>
      </UiFormItem>
    </UiFormField>

    <UiFormField v-slot="{ componentField }" name="timeZone">
      <UiFormItem>
        <div>
          <UiFormLabel>Часовой пояс</UiFormLabel>
          <UiFormMessage />
        </div>
        <UiFormControl>
          <UiInput v-bind="componentField" />
        </UiFormControl>
      </UiFormItem>
    </UiFormField>

    <UiFormField v-slot="{ componentField }" name="minAmountForDelivery">
      <UiFormItem>
        <div>
          <UiFormLabel>Минимальная сумма доставки</UiFormLabel>
          <UiFormMessage />
        </div>
        <UiFormControl>
          <UiInput v-bind="componentField" type="number" />
        </UiFormControl>
      </UiFormItem>
    </UiFormField>

    <UiFormField v-slot="{ componentField }" name="conditions">
      <UiFormItem>
        <div>
          <UiFormLabel>Условия доставки</UiFormLabel>
          <UiFormMessage />
        </div>
        <UiFormControl>
          <UiTextarea v-bind="componentField" rows="10" />
        </UiFormControl>
      </UiFormItem>
    </UiFormField>

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

const { toast } = useToast()
const { channel, refresh: refreshChannelData } = await useChannel()

const formSchema = toTypedSchema(channelUpdateSchema)

const { handleSubmit, handleReset, setValues } = useForm({
  validationSchema: formSchema,
})

watch(
  () => isOpened,
  () => {
    handleReset()
    setValues({
      name: channel.value?.name,
      description: channel.value?.description,
      phone: channel.value?.phone,
      currencyCode: channel.value?.currencyCode,
      countryCode: channel.value?.countryCode,
      timeZone: channel.value?.timeZone,
      minAmountForDelivery: channel.value?.minAmountForDelivery,
      conditions: channel.value?.conditions,
    })
  },
)

const onSubmit = handleSubmit(async (values, { resetForm }) => {
  emit('submitted')

  const { data, error } = await useAsyncData(
    'update-channel',
    () => $fetch('/api/channel', {
      method: 'PATCH',
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
    toast({ title: 'Веб-сайт обновлен!', description: 'Сейчас обновим данные.' })
    resetForm()
  }
})
</script>
