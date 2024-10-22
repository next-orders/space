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

    <UiFormField v-slot="{ componentField }" name="address">
      <UiFormItem>
        <div>
          <UiFormLabel>Адрес</UiFormLabel>
          <UiFormMessage />
        </div>
        <UiFormControl>
          <UiInput v-bind="componentField" />
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
import { warehouseUpdateSchema } from '~~/server/core/services/warehouse'
import { useForm } from 'vee-validate'
import { useToast } from '~/components/ui/toast'

const { isOpened, warehouseId } = defineProps<{
  isOpened: boolean
  warehouseId: string
}>()

const emit = defineEmits(['success', 'submitted'])

const { channel } = await useChannel()
const warehouse = computed(() => channel.value?.warehouses?.find((w) => w.id === warehouseId))

const { toast } = useToast()
const { refresh: refreshChannelData } = await useChannel()

const formSchema = toTypedSchema(warehouseUpdateSchema)

const { handleSubmit, handleReset, setValues } = useForm({
  validationSchema: formSchema,
})

watch(
  () => isOpened,
  () => {
    handleReset()
    setValues({
      name: warehouse.value?.name,
      address: warehouse.value?.address,
    })
  },
)

const onSubmit = handleSubmit(async (values, { resetForm }) => {
  emit('submitted')

  const { data, error } = await useAsyncData(
    'update-warehouse',
    () => $fetch(`/api/warehouse/${warehouse.value?.id}`, {
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
    toast({ title: 'Склад обновлен!', description: 'Сейчас обновим данные.' })
    resetForm()
  }
})
</script>
