<template>
  <ClientOnly v-if="!colorMode?.forced">
    <UToggle
      v-if="switchMode"
      v-model="isDark"
      :on-icon="icons.colorMode.dark"
      :off-icon="icons.colorMode.light"
      :aria-label="areaLabel"
    />
    <UTooltip v-else :text="areaLabel">
      <UButton
        :icon="isDark ? icons.colorMode.dark : icons.colorMode.light"
        :aria-label="areaLabel"
        variant="ghost"
        color="gray"
        @click="isDark = !isDark"
      />
    </UTooltip>

    <template #fallback>
      <USkeleton class="w-8 h-8" />
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
interface Props {
  switchMode?: boolean
}

withDefaults(defineProps<Props>(), {
  switchMode: false,
})

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

const areaLabel = computed(() => isDark.value ? t('app.colorMode.switch.light') : t('app.colorMode.switch.dark'))
</script>
