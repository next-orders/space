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

    <UiFormField v-slot="{ componentField }" name="sku">
      <UiFormItem>
        <div>
          <UiFormLabel>Артикул</UiFormLabel>
          <UiFormMessage />
        </div>
        <UiFormControl>
          <UiInput v-bind="componentField" :placeholder="$t('common.optional')" />
        </UiFormControl>
      </UiFormItem>
    </UiFormField>

    <div class="pt-4">
      <h3 class="font-semibold">
        {{ $t('common.optional') }}: Пищевая ценность на 100г
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
      {{ $t('center.create.title') }}
    </UiButton>
  </form>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { productVariantCreateSchema } from '~~/server/core/services/product'
import { useForm } from 'vee-validate'
import { useToast } from '~/components/ui/toast'

const { isOpened, productId } = defineProps<{
  isOpened: boolean
  productId: string
}>()

const emit = defineEmits(['success'])

const { toast } = useToast()
const { channel, refresh: refreshChannelData } = await useChannel()
const { refresh: refreshProducts } = await useProduct()

const formSchema = toTypedSchema(productVariantCreateSchema)

const { handleSubmit, handleReset, setFieldValue } = useForm({
  validationSchema: formSchema,
})

watch(
  () => isOpened,
  () => {
    handleReset()
    setFieldValue('productId', productId)
  },
)

const onSubmit = handleSubmit(async (values, { resetForm }) => {
  const { data, error } = await useAsyncData(
    'create-product-variant',
    () => $fetch('/api/product/variant', {
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
    await refreshProducts()
    emit('success')
    toast({ title: 'Вариация создана!', description: 'Сейчас обновим данные.' })
    resetForm()
  }
})

const weightUnitValues = getWeightUnitValues()
</script>
