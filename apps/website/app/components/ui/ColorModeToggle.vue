<template>
  <ClientOnly>
    <UTooltip :text="ariaLabel">
      <UButton
        :icon="isDark ? icons.colorMode.dark : icons.colorMode.light"
        :aria-label="ariaLabel"
        variant="ghost"
        color="gray"
        size="xl"
        @click="isDark = !isDark"
      />
    </UTooltip>

    <template #fallback>
      <USkeleton class="w-8 h-8" />
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

const ariaLabel = computed(() => isDark.value ? t('app.colorMode.switch.light') : t('app.colorMode.switch.dark'))
</script>
