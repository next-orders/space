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

    <UiFormField v-slot="{ componentField }" name="slug">
      <UiFormItem>
        <div>
          <UiFormLabel>Часть URL</UiFormLabel>
          <UiFormMessage />
        </div>
        <UiFormControl>
          <UiInput v-bind="componentField" />
        </UiFormControl>
      </UiFormItem>
    </UiFormField>

    <UiButton type="submit" variant="secondary" class="mt-4">
      {{ $t('center.update.title') }}
    </UiButton>
  </form>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { menuCategoryUpdateSchema } from '~~/server/core/services/menu'
import { useForm } from 'vee-validate'
import { useToast } from '~/components/ui/toast'

const { isOpened, menuId, categoryId } = defineProps<{
  isOpened: boolean
  menuId: string
  categoryId: string
}>()

const emit = defineEmits(['success'])

const { toast } = useToast()
const { menus, refresh: refreshChannelData } = await useChannel()

const menu = computed(() => menus.value?.find((menu) => menu.id === menuId))
const category = computed(() => menu.value?.categories?.find((category) => category.id === categoryId))

const formSchema = toTypedSchema(menuCategoryUpdateSchema)

const { handleSubmit, handleReset, setValues } = useForm({
  validationSchema: formSchema,
})

watch(
  () => isOpened,
  () => {
    handleReset()
    setValues({
      name: category.value?.name,
      slug: category.value?.slug,
    })
  },
)

const onSubmit = handleSubmit(async (values, { resetForm }) => {
  const { data, error } = await useAsyncData(
    'update-menu-category',
    () => $fetch(`/api/category/${category.value?.id}`, {
      method: 'PATCH',
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
    emit('success')
    toast({ title: 'Категория обновлена!', description: 'Сейчас обновим данные.' })
  }
})
</script>
