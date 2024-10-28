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
    <p class="text-center">
      {{ locales[l][2] }}
    </p>
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n()
const l = locale.value as Locale

const locales = {
  en: {
    1: 'This is where work with a specific menu takes place',
    2: 'You can add new categories and products.',
  },
  ru: {
    1: 'Здесь происходит работа с конкретным меню',
    2: 'Можно добавлять новые категории и продукты.',
  },
  ka: {
    1: 'სწორედ აქ ხდება მუშაობა კონკრეტულ მენიუსთან',
    2: 'თქვენ შეგიძლიათ დაამატოთ ახალი კატეგორიები და პროდუქტები.',
  },
}
</script>
