<template>
  <div class="mb-6 px-4 py-5 md:px-6 md:py-6 bg-white rounded-3xl">
    <h2 class="mb-2 text-xl md:text-2xl font-medium">
      Условия доставки
    </h2>

    <div class="px-4 py-2 bg-neutral-100 rounded-2xl inline-block">
      <div class="font-medium">
        Доставка
      </div>
      <div>
        100 <span class="text-xs">₽</span>
      </div>
    </div>

    <div class="w-full mt-4">
      <h3 class="mb-2 text-lg md:text-xl font-medium">
        Контакты
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-2 md:gap-2">
        <input
          type="text"
          name="phone"
          value=""
          placeholder="Ваш телефон"
          class="px-4 py-3 mb-2 w-full border border-neutral-200 rounded-2xl outline-2 outline-offset-1 outline-neutral-500 placeholder:text-neutral-400 data-[valid=true]:outline-teal-400"
          data-valid="{isValidPhone}"
        >

        <input
          type="text"
          name="name"
          placeholder="Ваше имя"
          class="px-4 py-3 mb-2 w-full border border-neutral-200 rounded-2xl"
        >
      </div>
    </div>

    <div class="w-full mt-4">
      <h3 class="mb-2 text-lg md:text-xl font-medium">
        Укажите свой адрес
      </h3>
      <input
        type="text"
        name="street"
        placeholder="Улица и дом"
        class="px-4 py-3 mb-2 w-full border border-neutral-200 rounded-2xl"
      >

      <div class="mb-2 grid grid-cols-2 md:grid-cols-4 gap-2">
        <input
          type="text"
          name="apartment"
          placeholder="Кв./офис"
          class="px-4 py-3 border border-neutral-200 rounded-2xl"
        >

        <input
          type="text"
          name="doorphone"
          placeholder="Домофон"
          class="px-4 py-3 border border-neutral-200 rounded-2xl"
        >

        <input
          type="text"
          name="entrance"
          placeholder="Подъезд"
          class="px-4 py-3 border border-neutral-200 rounded-2xl"
        >

        <input
          type="text"
          name="floor"
          placeholder="Этаж"
          class="px-4 py-3 border border-neutral-200 rounded-2xl"
        >
      </div>

      <input
        type="text"
        name="comment"
        placeholder="Комментарий"
        class="px-4 py-3 mb-2 w-full border border-neutral-200 rounded-2xl"
      >
    </div>

    <h2 class="mt-4 mb-2 text-xl md:text-2xl font-medium">
      Время доставки
    </h2>

    <div class="flex flex-row gap-2 items-center">
      <Icon :name="icons.clock" />
      Сейчас: 45-60 мин
    </div>
  </div>
</template>

<script setup lang="ts">
const { icons } = useAppConfig()
</script>
