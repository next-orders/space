<template>
  <div class="mb-4 flex flex-row gap-4 justify-start items-center">
    <img
      src="~/assets/img/recipe-list.png"
      width="64"
      height="64"
      alt=""
      class="w-16 h-16"
    >

    <p class="text-lg leading-tight font-semibold text-left">
      {{ $t('init.general-data') }}
    </p>
  </div>

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

    <UiFormField v-slot="{ componentField }" name="countryCode">
      <UiFormItem>
        <div>
          <UiFormLabel>{{ $t('center.data.country') }}</UiFormLabel>
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
              <UiSelectItem v-for="unit in countryCodes" :key="unit.value" :value="unit.value">
                {{ unit.label }}
              </UiSelectItem>
            </UiSelectGroup>
          </UiSelectContent>
        </UiSelect>
      </UiFormItem>
    </UiFormField>

    <UiFormField v-slot="{ componentField }" name="currencyCode">
      <UiFormItem>
        <div>
          <UiFormLabel>{{ $t('center.data.currency') }}</UiFormLabel>
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
              <UiSelectItem v-for="unit in currencyCodes" :key="unit.value" :value="unit.value">
                {{ unit.label }}
              </UiSelectItem>
            </UiSelectGroup>
          </UiSelectContent>
        </UiSelect>
      </UiFormItem>
    </UiFormField>

    <UiFormField v-slot="{ componentField }" name="timeZone">
      <UiFormItem>
        <div>
          <UiFormLabel>{{ $t('center.data.timezone') }}</UiFormLabel>
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
              <UiSelectItem v-for="unit in timeZones" :key="unit.value" :value="unit.value">
                {{ unit.label }}
              </UiSelectItem>
            </UiSelectGroup>
          </UiSelectContent>
        </UiSelect>
      </UiFormItem>
    </UiFormField>

    <UiButton type="submit" :disabled="isFormValid === false">
      {{ $t('app.cart.next-label') }}
    </UiButton>
  </form>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { channelCreateSchema } from '~~/server/core/services/channel'
import { useForm } from 'vee-validate'
import { useToast } from '~/components/ui/toast'

const emit = defineEmits(['success'])

const { toast } = useToast()
const { refresh: refreshChannelData } = await useChannel()

const countryCodes: { label: string, value: CountryCode }[] = [
  { label: 'Россия', value: 'RU' },
  { label: 'Украина', value: 'UA' },
  { label: 'Казахстан', value: 'KZ' },
  { label: 'Белоруссия', value: 'BY' },
  { label: 'Грузия', value: 'GE' },
  { label: 'США', value: 'US' },
  { label: 'Великобритания', value: 'GB' },
  { label: 'Греция', value: 'GR' },
]

const currencyCodes: { label: string, value: CurrencyCode }[] = [
  { label: 'Рубль', value: 'RUB' },
  { label: 'Доллар', value: 'USD' },
  { label: 'Евро', value: 'EUR' },
]

const timeZones: { label: string, value: TimeZone }[] = [
  { label: '-12:00', value: '-12:00' },
  { label: '-11:00', value: '-11:00' },
  { label: '-10:00', value: '-10:00' },
  { label: '-09:00', value: '-09:00' },
  { label: '-08:00', value: '-08:00' },
  { label: '-07:00', value: '-07:00' },
  { label: '-06:00', value: '-06:00' },
  { label: '-05:00', value: '-05:00' },
  { label: '-04:00', value: '-04:00' },
  { label: '-03:00', value: '-03:00' },
  { label: '-02:00', value: '-02:00' },
  { label: '-01:00', value: '-01:00' },
  { label: '00:00', value: '00:00' },
  { label: '+01:00', value: '+01:00' },
  { label: '+02:00', value: '+02:00' },
  { label: '+03:00', value: '+03:00' },
  { label: '+04:00', value: '+04:00' },
  { label: '+05:00', value: '+05:00' },
  { label: '+06:00', value: '+06:00' },
  { label: '+07:00', value: '+07:00' },
  { label: '+08:00', value: '+08:00' },
  { label: '+09:00', value: '+09:00' },
  { label: '+10:00', value: '+10:00' },
  { label: '+11:00', value: '+11:00' },
  { label: '+12:00', value: '+12:00' },
]

const formSchema = toTypedSchema(channelCreateSchema)

const { handleSubmit, isFieldValid } = useForm({
  validationSchema: formSchema,
})

const isFormValid = computed(() => isFieldValid('name') && isFieldValid('countryCode') && isFieldValid('currencyCode') && isFieldValid('timeZone'))

const onSubmit = handleSubmit(async (values) => {
  const { data, error } = await useAsyncData(
    'create-channel',
    () => $fetch('/api/channel', {
      method: 'PUT',
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
    toast({ title: 'Веб-сайт настроен!', description: 'Сейчас обновим данные.' })
  }
})
</script>
