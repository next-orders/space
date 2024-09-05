<template>
  <button
    class="z-40 fixed left-0 right-0 -top-20 -bottom-20 appearance-none bg-gray-700/50 opacity-0 data-[active=true]:opacity-100 translate-x-full data-[active=true]:-translate-x-0 transition-opacity"
    :data-active="isDeliveryInfoModalOpened"
    @click="isDeliveryInfoModalOpened = false"
  />
  <div
    class="z-40 fixed left-0 top-0 w-full max-w-md h-auto p-2 m-0 shadow-none rounded-2xl -translate-x-full data-[active=true]:translate-x-0 data-[active=true]:right-0 data-[active=true]:mx-auto transition-transform"
    :data-active="isDeliveryInfoModalOpened"
  >
    <div class="mt-16 px-8 py-8 bg-white rounded-2xl">
      <div class="mb-2 text-2xl font-medium">
        {{ checkout?.deliveryMethod === 'DELIVERY' ? 'Детали доставки' : 'Детали самовывоза' }}
      </div>

      <div v-if="checkout?.deliveryMethod === 'WAREHOUSE'">
        <div class="flex flex-row justify-between">
          <div class="flex flex-row gap-2 items-center">
            <Icon :name="icons.discount" />
            Скидка
          </div>
          <div>10 %</div>
        </div>

        <div class="mt-8 mb-2 text-xl font-medium">
          Приготовить к
        </div>

        <div class="flex flex-row justify-between">
          <div class="flex flex-row gap-2 items-center">
            <Icon :name="icons.clock" />
            Сейчас: 15-20 мин
          </div>
        </div>

        <div class="mt-8 mb-2 text-xl font-medium">
          Больше информации
        </div>

        <div class="mb-2 flex flex-row justify-between">
          <div>Минимальная стоимость заказа</div>
          <div>
            1000 <span class="text-sm">₽</span>
          </div>
        </div>
      </div>

      <div v-if="checkout?.deliveryMethod === 'DELIVERY'">
        <div class="flex flex-row justify-between">
          <div class="flex flex-row gap-2 items-center">
            <Icon :name="icons.bike" />
            Курьерская оплата
          </div>
          <div>
            {{ checkout?.shippingPrice }} <span class="text-sm">₽</span>
          </div>
        </div>

        <div class="mt-8 mb-2 text-xl font-medium">
          Доставить к
        </div>

        <div class="flex flex-row justify-between">
          <div class="flex flex-row gap-2 items-center">
            <Icon :name="icons.clock" />
            Сейчас: 45-60 мин
          </div>
        </div>

        <div class="mt-8 mb-2 text-xl font-medium">
          Больше информации
        </div>

        <div class="mb-2 flex flex-row justify-between">
          <div>Минимальная стоимость заказа</div>
          <div>
            1000 <span class="text-sm">₽</span>
          </div>
        </div>

        <div class="mb-2 flex flex-row justify-between">
          <div>Максимальный вес заказа</div>
          <div>20 кг</div>
        </div>
      </div>

      <button
        class="mt-4 px-5 py-3 w-full text-center text-base font-medium cursor-pointer rounded-2xl bg-gray-200 active:scale-95 lg:hover:bg-gray-300 lg:hover:scale-95 lg:active:scale-90 duration-200"
        @click="isDeliveryInfoModalOpened = false"
      >
        OK
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { icons } = useAppConfig()
const { isDeliveryInfoModalOpened } = useApp()
const { checkout } = await useCheckout()
</script>
