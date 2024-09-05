<template>
  <p class="font-medium text-lg mb-2">
    {{ title }}
  </p>
  <div class="flex flex-row gap-2 items-center mb-2">
    <Icon :name="icons.clock" /> сегодня до {{ todayUntil }}
  </div>
  <div class="mb-2">
    <div v-if="checkout?.deliveryMethod === 'WAREHOUSE'" class="flex flex-row gap-2 items-center">
      <Icon :name="icons.discount" />
      <div class="lowercase">
        Скидка 10 <span class="text-sm">%</span>
      </div>
    </div>

    <div v-if="checkout?.deliveryMethod === 'DELIVERY'" class="flex flex-row gap-2 items-center">
      <Icon :name="icons.delivery" />
      <div class="lowercase">
        бесплатно от 2500 <span class="text-sm">₽</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { icons } = useAppConfig()
const { checkout } = await useCheckout()

const title = computed(() => checkout.value?.deliveryMethod === 'DELIVERY' ? 'Доставка' : 'Самовывоз')
const todayUntil = computed(() => checkout.value?.deliveryMethod === 'DELIVERY' ? '22:00' : '23:00')
</script>
