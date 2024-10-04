<template>
  <div class="relative">
    <UiButton variant="secondary" class="flex justify-center items-center gap-2" @click="isOpened = !isOpened">
      <Icon :name="icons.globe" class="w-6 h-6 opacity-40" />
      <span>{{ $t('short-name') }}</span>
    </UiButton>

    <div v-if="isOpened" class="dropdown-menu">
      <button v-for="chooseLocale in locales" :key="chooseLocale.code" @click="() => handleLocaleSwitch(chooseLocale.code)">
        {{ chooseLocale.name }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { icons } = useAppConfig()
const { locales, setLocale } = useI18n()
const isOpened = ref(false)

function handleLocaleSwitch(code: string) {
  isOpened.value = false
  setLocale(code)
}
</script>
