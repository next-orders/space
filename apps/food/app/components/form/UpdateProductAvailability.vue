<template>
  <form>
    <div class="min-w-60 px-4 py-3 bg-neutral-50 dark:bg-neutral-500 border border-neutral-100 dark:border-neutral-500 rounded-2xl">
      <div class="flex items-center gap-4">
        <UiSwitch id="product-switch" :default-checked="isAvailableForPurchase" @update:checked="onSubmit()" />
        <UiLabel for="product-switch" class="leading-tight">
          {{ isAvailableForPurchase ? $t('center.product.available-for-purchase') : $t('center.product.not-available-for-purchase') }}
        </UiLabel>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { productUpdateSchema } from '~~/server/core/services/product'
import { useForm } from 'vee-validate'
import { useToast } from '~/components/ui/toast'

const { isAvailableForPurchase, productId } = defineProps<{
  isAvailableForPurchase: boolean
  productId: string
}>()

const emit = defineEmits(['success'])

const { t } = useI18n()
const { toast } = useToast()
const { refresh: refreshChannelData } = await useChannel()
const { refresh: refreshProducts } = await useProduct()

const formSchema = toTypedSchema(productUpdateSchema)

const { handleSubmit, handleReset, setFieldValue } = useForm({
  validationSchema: formSchema,
})

watch(
  () => isAvailableForPurchase,
  () => {
    handleReset()
    setFieldValue('isAvailableForPurchase', isAvailableForPurchase)
  },
)

const onSubmit = handleSubmit(async (_, { resetForm }) => {
  const { data, error } = await useAsyncData(
    'update-product',
    () => $fetch(`/api/product/${productId}`, {
      method: 'PATCH',
      body: {
        isAvailableForPurchase: !isAvailableForPurchase,
      },
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
    toast({ title: t('toast.product-updated'), description: t('toast.updating-data') })
    resetForm()
  }
})
</script>
