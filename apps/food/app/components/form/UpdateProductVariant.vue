<template>
  <form class="space-y-3" @submit="onSubmit">
    <UiFormField v-slot="{ componentField }" name="name">
      <UiFormItem>
        <div>
          <UiFormLabel>Название</UiFormLabel>
          <UiFormMessage />
        </div>
        <UiFormControl>
          <UiInput v-bind="componentField" placeholder="25 см, 6 шт, на традиционном тесте, и т.п." />
        </UiFormControl>
      </UiFormItem>
    </UiFormField>

    <UiFormField v-slot="{ componentField }" name="gross">
      <UiFormItem>
        <div>
          <UiFormLabel>Цена, {{ getCurrencySign(channel?.currencyCode) }}</UiFormLabel>
          <UiFormMessage />
        </div>
        <UiFormControl>
          <UiInput v-bind="componentField" type="number" step="any" placeholder="0.00" />
        </UiFormControl>
      </UiFormItem>
    </UiFormField>

    <div class="grid grid-cols-2 gap-2">
      <UiFormField v-slot="{ componentField }" name="weightValue">
        <UiFormItem>
          <div>
            <UiFormLabel>Вес / Объем</UiFormLabel>
            <UiFormMessage />
          </div>
          <UiFormControl>
            <UiInput v-bind="componentField" type="number" step="any" />
          </UiFormControl>
        </UiFormItem>
      </UiFormField>

      <UiFormField v-slot="{ componentField }" name="weightUnit">
        <UiFormItem>
          <div>
            <UiFormLabel>Ед. измерения</UiFormLabel>
            <UiFormMessage />
          </div>
          <UiSelect v-bind="componentField">
            <UiFormControl>
              <UiSelectTrigger>
                <UiSelectValue placeholder="Выберите" />
              </UiSelectTrigger>
            </UiFormControl>

            <UiSelectContent>
              <UiSelectGroup>
                <UiSelectItem v-for="unit in weightUnitValues" :key="unit.value" :value="unit.value">
                  {{ unit.label }}
                </UiSelectItem>
              </UiSelectGroup>
            </UiSelectContent>
          </UiSelect>
        </UiFormItem>
      </UiFormField>
    </div>

    <div class="pt-4">
      <h3 class="font-semibold">
        Опционально: Пищевая ценность на 100г
      </h3>

      <div class="grid grid-cols-2 gap-2">
        <UiFormField v-slot="{ componentField }" name="calories">
          <UiFormItem>
            <div>
              <UiFormLabel>Калории, ккал</UiFormLabel>
              <UiFormMessage />
            </div>
            <UiFormControl>
              <UiInput v-bind="componentField" type="number" step="any" />
            </UiFormControl>
          </UiFormItem>
        </UiFormField>

        <UiFormField v-slot="{ componentField }" name="protein">
          <UiFormItem>
            <div>
              <UiFormLabel>Белки</UiFormLabel>
              <UiFormMessage />
            </div>
            <UiFormControl>
              <UiInput v-bind="componentField" type="number" step="any" />
            </UiFormControl>
          </UiFormItem>
        </UiFormField>

        <UiFormField v-slot="{ componentField }" name="fat">
          <UiFormItem>
            <div>
              <UiFormLabel>Жиры</UiFormLabel>
              <UiFormMessage />
            </div>
            <UiFormControl>
              <UiInput v-bind="componentField" type="number" step="any" />
            </UiFormControl>
          </UiFormItem>
        </UiFormField>

        <UiFormField v-slot="{ componentField }" name="carbohydrate">
          <UiFormItem>
            <div>
              <UiFormLabel>Углеводы</UiFormLabel>
              <UiFormMessage />
            </div>
            <UiFormControl>
              <UiInput v-bind="componentField" type="number" step="any" />
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
import { productVariantUpdateSchema } from '~~/server/core/services/product'
import { useForm } from 'vee-validate'
import { useToast } from '~/components/ui/toast'

const { isOpened, productVariantId, productVariant } = defineProps<{
  isOpened: boolean
  productVariantId: string
  productVariant: any
}>()

const emit = defineEmits(['success'])

const { t } = useI18n()
const { toast } = useToast()
const { channel, refresh: refreshChannelData } = await useChannel()
const { refresh: refreshProducts } = await useProduct()

const formSchema = toTypedSchema(productVariantUpdateSchema)

const { handleSubmit, handleReset, setValues } = useForm({
  validationSchema: formSchema,
})

watch(
  () => isOpened,
  () => {
    handleReset()
    setValues({
      name: productVariant?.name,
      gross: productVariant?.gross,
      weightValue: productVariant?.weightValue,
      weightUnit: productVariant?.weightUnit,
      calories: productVariant?.calories,
      protein: productVariant?.protein,
      fat: productVariant?.fat,
      carbohydrate: productVariant?.carbohydrate,
    })
  },
)

const onSubmit = handleSubmit(async (values, { resetForm }) => {
  const { data, error } = await useAsyncData(
    'update-product-variant',
    () => $fetch(`/api/product/variant/${productVariantId}`, {
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
    await refreshProducts()
    emit('success')
    toast({ title: 'Вариация обновлена!', description: 'Сейчас обновим данные.' })
    resetForm()
  }
})

const weightUnitValues: { value: WeightUnit, label: string }[] = [
  { value: 'KG', label: t('common.weight-unit.kg') },
  { value: 'G', label: t('common.weight-unit.g') },
  { value: 'L', label: t('common.weight-unit.l') },
  { value: 'ML', label: t('common.weight-unit.ml') },
  { value: 'OZ', label: t('common.weight-unit.oz') },
  { value: 'LB', label: t('common.weight-unit.lb') },
]
</script>
