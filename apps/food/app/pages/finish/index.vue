<template>
  <h1 class="pt-8 mb-4 md:mb-8 text-3xl md:text-4xl font-medium text-center">
    Заказ оформлен
  </h1>

  <div class="p-3 md:p-6 bg-white rounded-3xl space-y-6">
    <h2 class="text-center font-medium text-xl">
      Ваша заявка была успешно передана на обработку. Ожидайте звонка от оператора.
    </h2>

    <ClientOnly>
      <div>
        <h3 class="text-lg font-medium">
          {{ checkout?.deliveryMethod === 'WAREHOUSE' ? $t('app.cart.pickup') : $t('app.cart.delivery') }}
        </h3>

        <p>Ваше имя: {{ checkout?.name }}</p>
        <p>Ваш телефон: {{ checkout?.phone }}</p>

        <p v-if="warehouse?.address">
          Адрес: {{ warehouse?.address }}
        </p>
        <p v-if="address">
          Адрес: {{ address }}
        </p>

        <p>Метод оплаты: {{ channel?.paymentMethods.find((p) => p.id === checkout?.paymentMethodId)?.name }}</p>
        <p>Комментарий: {{ checkout?.note }}</p>
      </div>

      <div>
        <h3 class="mb-2 text-lg font-medium">
          Вы заказали
        </h3>

        <CheckoutLine v-for="line in checkout?.lines" :key="line.id" :line-id="line.id" :can-be-changed="false" />
      </div>

      <div>
        <h3 class="mb-2 text-lg font-medium">
          Итого
        </h3>
        <div class="flex flex-row justify-between">
          <div>Стоимость товаров</div>
          <div class="tracking-tight text-lg">
            {{ checkout?.totalPrice }} <span class="text-sm">{{ getCurrencySign(channel?.currencyCode) }}</span>
          </div>
        </div>
        <div class="flex flex-row justify-between">
          <div>Стоимость доставки</div>
          <div class="tracking-tight text-lg">
            {{ checkout?.shippingPrice }} <span class="text-sm">{{ getCurrencySign(channel?.currencyCode) }}</span>
          </div>
        </div>
      </div>
    </ClientOnly>

    <NuxtLink to="/" class="block grow">
      <UiButton class="w-full px-4 py-4 text-lg text-center">
        Вернуться на главную
      </UiButton>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'finish',
})

const { channel } = await useChannel()
const { checkout, address } = useCheckout()

// const address = computed(() => checkout.value?.deliveryMethod === 'DELIVERY' && getAddress(checkout.value?.addressId))
const warehouse = computed(() => channel.value?.warehouses.find((w) => w.id === checkout.value?.warehouseId))
</script>
