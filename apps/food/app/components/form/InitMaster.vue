<template>
  <div class="mb-4 flex flex-row gap-4 justify-center items-center">
    <img
      src="~/assets/img/hot-drink.png"
      width="64"
      height="64"
      alt=""
      class="w-16 h-16"
    >

    <p class="text-lg leading-tight font-semibold text-left">
      {{ $t('init.admin-data') }}
    </p>
  </div>

  <form class="space-y-3" @submit="onSubmit">
    <UiFormField v-slot="{ componentField }" name="login">
      <UiFormItem>
        <div>
          <UiFormLabel>{{ $t('common.login') }}</UiFormLabel>
          <UiFormMessage />
        </div>
        <UiFormControl>
          <UiInput v-bind="componentField" />
        </UiFormControl>
      </UiFormItem>
    </UiFormField>

    <UiFormField v-slot="{ componentField }" name="password">
      <UiFormItem>
        <div>
          <UiFormLabel>{{ $t('common.password') }}</UiFormLabel>
          <UiFormMessage />
        </div>
        <UiFormControl>
          <UiInput v-bind="componentField" type="password" />
        </UiFormControl>
      </UiFormItem>
    </UiFormField>

    <UiFormField v-slot="{ componentField }" name="name">
      <UiFormItem>
        <div>
          <UiFormLabel>{{ $t('app.checkout.your-name') }}</UiFormLabel>
          <UiFormMessage />
        </div>
        <UiFormControl>
          <UiInput v-bind="componentField" :placeholder="$t('common.optional')" />
        </UiFormControl>
      </UiFormItem>
    </UiFormField>

    <UiButton type="submit" :disabled="isFormValid === false">
      {{ $t('app.cart.next-label') }}
    </UiButton>
  </form>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { userCreateSchema } from '~~/server/core/services/user'
import { useForm } from 'vee-validate'
import { useToast } from '~/components/ui/toast'

const emit = defineEmits(['success'])

const { t } = useI18n()
const { toast } = useToast()
const { refresh: refreshChannelData } = await useChannel()

const formSchema = toTypedSchema(userCreateSchema)

const { handleSubmit, isFieldValid } = useForm({
  validationSchema: formSchema,
})

const isFormValid = computed(() => isFieldValid('login') && isFieldValid('password'))

const onSubmit = handleSubmit(async (values) => {
  const { data, error } = await useAsyncData(
    'create-channel',
    () => $fetch('/api/channel/master', {
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
    toast({ title: t('toast.account-configured'), description: t('toast.updating-data') })
  }
})
</script>
