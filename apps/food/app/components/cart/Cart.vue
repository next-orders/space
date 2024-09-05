<template>
  <div class="relative bg-white rounded-2xl px-4 py-4 h-full flex flex-col justify-between">
    <div class="h-screen overflow-y-auto">
      <div class="mb-48">
        <div class="mb-4 flex flex-row justify-between items-center">
          <p class="text-2xl font-medium">
            Корзина
          </p>

          <button
            aria-label="Close"
            class="block xl:hidden rounded-xl lg:hover:scale-90 hover:bg-gray-100 duration-200"
            @click="isCartDrawerOpened = !isCartDrawerOpened"
          >
            <Icon :name="icons.close" class="w-8 h-8" />
          </button>
        </div>

        <div class="mt-2 mb-4">
          <!-- <CartDeliveryMethodToggle channel="{channel}" checkout="{checkout}" /> -->
        </div>

        <CartEmpty v-if="isEmptyCart" />
        <div v-else>
          <CartLine v-for="line in checkout?.lines" :key="line.id" :line-id="line.id" />
        </div>
      </div>
    </div>

    <div class="absolute bottom-0 left-0 right-0 rounded-2xl bg-gray-50">
      <button
        class="relative my-4 mx-4 flex flex-row gap-3 flex-wrap items-center active:scale-95 lg:hover:scale-95 lg:active:scale-90 duration-200"
        @click="() => {}"
      >
        <Icon :name="icons.info" class="w-8 h-8 text-gray-300" />

        <div class="text-left">
          <CartDeliveryInfo />

          <div class="text-sm text-gray-500">
            Подробные условия
          </div>
        </div>
      </button>

      <div v-if="!isEmptyCart" class="my-4 mx-4">
        <NuxtLink
          to="/checkout"
          class="button-gradient w-full px-4 py-4 flex flex-row gap-2 flex-wrap justify-between items-center rounded-xl cursor-pointer active:scale-95 lg:hover:scale-95 lg:active:scale-90 duration-200"
        >
          <div class="font-normal">
            Хорошо, далее
          </div>
          <div class="font-medium text-lg tracking-tight">
            {{ checkout?.totalPrice }} <span class="text-base">₽</span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { isCartDrawerOpened } = useApp()
const { icons } = useAppConfig()
const checkout = await useCheckout()
const isEmptyCart = !checkout.value || checkout.value?.lines?.length === 0
</script>
