<template>
  <div class="flex flex-row gap-1 leading-tight">
    <div class="text-sm">
      {{ avg }} мин
    </div>
    <span class="text-gray-300">/</span>
    <div class="text-sm">
      <div v-if="checkout?.deliveryMethod === 'WAREHOUSE'">
        Скидка 10 <span class="text-xs">%</span>
      </div>

      <div v-if="checkout?.deliveryMethod === 'DELIVERY'">
        Доставка {{ checkout?.shippingPrice }} <span class="text-xs">₽</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { checkout } = await useCheckout()

const avg = computed(() => checkout.value?.deliveryMethod === 'DELIVERY' ? '45–60' : '15–20')
</script>
