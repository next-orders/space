<template>
  <div class="relative">
    <button class="py-2 px-4 h-12 flex flex-row items-center gap-2 duration-200 rounded-2xl bg-neutral-100 dark:bg-neutral-600 hover:bg-neutral-200 dark:hover:bg-neutral-500" @click="isOpened = !isOpened">
      <Icon :name="icons.globe" class="w-6 h-6 opacity-40" />
      <span>{{ $t('short-name') }}</span>
    </button>

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
