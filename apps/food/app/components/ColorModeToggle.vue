<template>
  <ClientOnly>
    <button
      :aria-label="ariaLabel"
      class="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 flex justify-center items-center"
      @click="isDark = !isDark"
    >
      <Icon :name="isDark ? icons.colorMode.dark : icons.colorMode.light" class="w-6 h-6 opacity-40" />
    </button>

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
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  },
})

const ariaLabel = computed(() => isDark.value ? t('common.color-mode.switch.light') : t('common.color-mode.switch.dark'))
</script>
