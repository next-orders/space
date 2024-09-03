<template>
  <nav
    class="z-10 w-0 hidden md:block md:w-72 fixed top-16 data-[active=true]:w-full data-[active=true]:block md:data-[active=true]:w-72"
    :data-active="isNavbarOpened"
  >
    <div class="w-full bg-zinc-50 px-4 pt-4 border-r border-zinc-100">
      <div class="h-screen overflow-y-auto">
        <div class="mb-8">
          <NuxtLink
            href="/"
            class="font-medium text-xl"
          >
            Вкус на бегу
          </NuxtLink>
          <div class="mt-1 text-sm leading-tight">
            Здесь можно заказать еду
          </div>
        </div>

        <div class="mb-8">
          <!-- <DeliveryInfoBlock
            locale="{locale}"
            method="{checkout?.deliveryMethod" ?? 'DELIVERY'}
            currency-code="{currencyCode}"
          /> -->

          <button
            v-if="!!checkout"
            onClick="{toggleDeliveryInfoModal}"
            class="flex flex-row gap-2 items-center active:scale-95 lg:hover:scale-95 lg:active:scale-90 duration-200"
          >
            <Icon :name="icons.link" /> показать детали
          </button>
        </div>

        <div class="mb-32">
          <p class="font-medium text-lg">
            Каталог
          </p>

          <LinkButton
            v-for="category in channelData?.categories"
            :key="category.id"
            :link="`/catalog/${category.slug}`"
            :label="category.name"
          />
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const { isNavbarOpened } = useApp()
const { icons } = useAppConfig()
const channelData = await useChannel()

const checkout = {
  deliveryMethod: 'DELIVERY',
}
</script>
