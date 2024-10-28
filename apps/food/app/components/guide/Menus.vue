<template>
  <div class="mt-32 text-center max-w-xl mx-auto">
    <img
      src="~/assets/img/recipe-book.png"
      width="64"
      height="64"
      alt=""
      class="mx-auto mb-4 w-16 h-16"
    >
    <h2 class="mb-4 text-lg font-semibold">
      {{ locales[l][1] }}
    </h2>
    <p class="text-left">
      {{ locales[l][2] }}
    </p>
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n()
const l = locale.value as Locale

const locales = {
  en: {
    1: 'This is where all menus are handled',
    2: 'Select an existing menu or create a new one. You can add new categories and products inside the menu.',
  },
  ru: {
    1: 'Здесь происходит работа со всеми меню',
    2: 'Выберите созданное меню или создайте новое. Внутри меню можно добавлять новые категории и продукты.',
  },
  ka: {
    1: 'ეს არის სადაც ყველა მენიუ დამუშავებულია',
    2: 'აირჩიეთ არსებული მენიუ ან შექმენით ახალი. თქვენ შეგიძლიათ დაამატოთ ახალი კატეგორიები და პროდუქტები მენიუში.',
  },
}
</script>
