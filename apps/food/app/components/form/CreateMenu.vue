<template>
  <CommandCenterModal :title="$t('center.create.menu')" :on-close="handleReset">
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

      <UiButton type="submit" variant="secondary" class="mt-4">
        {{ $t('center.create.title') }}
      </UiButton>
    </form>
  </CommandCenterModal>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { menuCreateSchema } from '~~/server/core/services/menu'
import { useForm } from 'vee-validate'
import { useToast } from '~/components/ui/toast'

const { toast } = useToast()
const { refresh: refreshChannelData } = await useChannel()
const { isModalOpened } = useCommandCenter()

const formSchema = toTypedSchema(menuCreateSchema)

const { handleSubmit, handleReset } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit(async (values, { resetForm }) => {
  const { data, error } = await useAsyncData(
    'create-menu',
    () => $fetch('/api/menu', {
      method: 'POST',
      body: values,
    }),
  )

  if (error.value) {
    console.error(error.value)
    toast({ title: 'Ошибка', description: '...' })
  }

  if (data.value) {
    resetForm()
    await refreshChannelData()
    isModalOpened.value = false
    toast({ title: 'Меню создано!', description: 'Сейчас обновим данные.' })
  }
})
</script>
