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
              <UiSelectItem v-for="code in getLocalizedCountryCodesForSelect()" :key="code.value" :value="code.value">
                {{ code.label }}
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
              <UiSelectItem v-for="code in getLocalizedCurrencyCodesForSelect()" :key="code.value" :value="code.value">
                {{ code.label }}
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
              <UiSelectItem v-for="zone in getLocalizedTimezonesForSelect()" :key="zone.value" :value="zone.value">
                {{ zone.label }}
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

const { t } = useI18n()
const { toast } = useToast()
const { refresh: refreshChannelData } = await useChannel()

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
    toast({ title: t('error.title'), description: '...' })
  }

  if (data.value) {
    await refreshChannelData()
    emit('success')
    toast({ title: t('toast.website-configured'), description: t('toast.updating-data') })
  }
})
</script>
