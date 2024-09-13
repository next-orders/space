<template>
  <ClientOnly>
    <Button variant="secondary" :aria-label="ariaLabel" class="flex justify-center items-center" @click="isDark = !isDark">
      <Icon :name="isDark ? icons.colorMode.dark : icons.colorMode.light" class="w-6 h-6 opacity-40" />
    </Button>

    <template #fallback>
      <div class="w-8 h-8" />
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
const { icons } = useAppConfig()
const colorMode = useColorMode()
const { t } = useI18n()

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.value = colorMode.value === 'dark' ? 'light' : 'dark'
  },
})

const ariaLabel = computed(() => isDark.value ? t('common.color-mode.switch.light') : t('common.color-mode.switch.dark'))
</script>
