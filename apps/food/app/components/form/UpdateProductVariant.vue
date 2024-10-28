<template>
  <form class="space-y-3" @submit="onSubmit">
    <UiFormField v-slot="{ componentField }" name="name">
      <UiFormItem>
        <div>
          <UiFormLabel>{{ $t('center.data.name') }}</UiFormLabel>
          <UiFormMessage />
        </div>
        <UiFormControl>
          <UiInput v-bind="componentField" :placeholder="$t('center.product.variant-name-placeholder')" />
        </UiFormControl>
      </UiFormItem>
    </UiFormField>

    <UiFormField v-slot="{ componentField }" name="gross">
      <UiFormItem>
        <div>
          <UiFormLabel>{{ $t('common.price') }}, {{ getCurrencySign(channel?.currencyCode) }}</UiFormLabel>
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
            <UiFormLabel>{{ $t('common.weight-or-volume') }}</UiFormLabel>
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
            <UiFormLabel>{{ $t('common.measurement-unit') }}</UiFormLabel>
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
                <UiSelectItem v-for="unit in getLocalizedWeightUnitsForSelect()" :key="unit.value" :value="unit.value">
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
          <UiFormLabel>{{ $t('common.sku') }}</UiFormLabel>
          <UiFormMessage />
        </div>
        <UiFormControl>
          <UiInput v-bind="componentField" :placeholder="$t('common.optional')" />
        </UiFormControl>
      </UiFormItem>
    </UiFormField>

    <div class="pt-4">
      <h3 class="font-semibold">
        {{ $t('common.optional') }}: {{ $t('common.nutrition.value-title') }}
      </h3>

      <div class="grid grid-cols-2 gap-2">
        <UiFormField v-slot="{ componentField }" name="calories">
          <UiFormItem>
            <div>
              <UiFormLabel>{{ $t('common.nutrition.calories') }}, {{ $t('common.nutrition.kcal') }}</UiFormLabel>
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
              <UiFormLabel>{{ $t('common.nutrition.protein') }}</UiFormLabel>
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
              <UiFormLabel>{{ $t('common.nutrition.fat') }}</UiFormLabel>
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
              <UiFormLabel>{{ $t('common.nutrition.carbohydrate') }}</UiFormLabel>
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

const emit = defineEmits(['success', 'submitted'])

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
      sku: productVariant?.sku,
    })
  },
)

const onSubmit = handleSubmit(async (values, { resetForm }) => {
  emit('submitted')

  const { data, error } = await useAsyncData(
    'update-product-variant',
    () => $fetch(`/api/product/variant/${productVariantId}`, {
      method: 'PATCH',
      body: values,
    }),
  )

  if (error.value) {
    console.error(error.value)
    toast({ title: t('error.title'), description: '...' })
  }

  if (data.value) {
    await refreshChannelData()
    await refreshProducts()
    emit('success')
    toast({ title: t('toast.variant-updated'), description: t('toast.updating-data') })
    resetForm()
  }
})
</script>
