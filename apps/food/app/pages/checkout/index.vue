<template>
  <h1 class="pt-8 mb-4 md:mb-8 text-3xl md:text-4xl font-medium">
    Оформление заказа
  </h1>

  <div class="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
    <div class="col-span-full md:col-span-7 space-y-6">
      <CheckoutDeliveryForm />

      <div class="p-3 md:p-6 bg-white rounded-3xl">
        <h2 class="mb-4 text-xl md:text-2xl font-medium">
          Вы заказываете
        </h2>

        <CheckoutLine v-for="line in checkout?.lines" :key="line.id" :line-id="line.id" />

        <div class="mt-4">
          <UiLabel for="note">
            Комментарий для кухни
          </UiLabel>
          <UiTextarea
            id="note"
            name="note"
            placeholder="Пожелания к заказу"
          />
        </div>
      </div>
    </div>

    <div class="col-span-full md:col-span-5 h-fit sticky top-20">
      <div class="mb-6 p-3 md:p-6 bg-white rounded-3xl space-y-5">
        <div>
          <h3 class="mb-2 text-lg md:text-xl font-medium">
            Метод оплаты
          </h3>

          <div class="grid grid-cols-2 md:grid-cols-2 gap-2">
            <UiButton v-for="method in paymentMethods" :key="method.type" variant="secondary" class="w-full min-h-14 flex flex-col flex-wrap gap-1 justify-center items-center" @click="selectedPaymentMethodId = method.id">
              <Icon :name="method.type === 'CASH' ? icons.moneyCash : icons.moneyCard" class="w-8 h-8 text-neutral-300" :class="{ '!text-emerald-500': method.id === selectedPaymentMethodId }" />
              <p class="font-medium leading-tight break-all">
                {{ method.name }}
              </p>
            </UiButton>
          </div>
        </div>

        <div>
          <h3 class="mb-2 text-lg md:text-xl font-medium">
            Итого
          </h3>

          <div>
            <div class="mb-2 flex flex-row justify-between text-lg">
              <div>Стоимость товаров</div>
              <div class="tracking-tight">
                {{ checkout?.totalPrice }} <span class="text-sm">{{ getCurrencySign(channel?.currencyCode) }}</span>
              </div>
            </div>
            <div class="mb-2 flex flex-row justify-between text-lg">
              <div>Стоимость доставки</div>
              <div class="tracking-tight">
                {{ checkout?.shippingPrice }} <span class="text-sm">{{ getCurrencySign(channel?.currencyCode) }}</span>
              </div>
            </div>

            <div class="mt-4">
              <div class="text-base text-neutral-500">
                Есть промо код?
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-row flex-nowrap gap-4 items-center">
          <NuxtLink to="#" class="grow">
            <UiButton class="w-full px-4 py-4 text-lg text-center">
              Создать заказ
            </UiButton>
          </NuxtLink>

          <div class="font-medium text-right text-2xl min-w-[5rem] tracking-tight">
            {{ checkout?.totalPrice }} <span class="text-base">{{ getCurrencySign(channel?.currencyCode) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'checkout',
})

const { icons } = useAppConfig()
const { channel } = await useChannel()
const { checkout } = useCheckout()

const selectedPaymentMethodId = ref('')
const paymentMethods = computed(() => channel.value?.paymentMethods)
</script>
