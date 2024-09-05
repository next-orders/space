<template>
  <div class="px-0 py-0 flex flex-row gap-0 justify-center bg-gray-50 rounded-2xl">
    <button
      class="w-full px-2 py-2 font-normal rounded-2xl active:scale-95 lg:hover:bg-gray-100 lg:hover:scale-95 lg:active:scale-90 duration-200"
      :class="{ 'button-gradient': checkout?.deliveryMethod === 'DELIVERY' }"
      @click="update({ deliveryMethod: 'DELIVERY' })"
    >
      Доставка
    </button>
    <button
      class="w-full px-2 py-2 font-normal rounded-2xl active:scale-95 lg:hover:bg-gray-100 lg:hover:scale-95 lg:active:scale-90 duration-200"
      :class="{ 'button-gradient': checkout?.deliveryMethod === 'WAREHOUSE' }"
      @click="update({ deliveryMethod: 'WAREHOUSE' })"
    >
      Самовывоз
    </button>
  </div>
</template>

<script setup lang="ts">
const { checkout, update } = await useCheckout()
</script>
