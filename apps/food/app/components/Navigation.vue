<template>
  <nav
    class="z-10 w-0 hidden md:block md:w-72 fixed top-16 data-[active=true]:w-full data-[active=true]:block md:data-[active=true]:w-72"
    :data-active="isNavbarOpened"
  >
    <div class="w-full bg-gray-50 px-4 pt-4 border-r border-gray-100">
      <div class="h-screen overflow-y-auto">
        <div class="mb-8">
          <NuxtLink
            href="/"
            class="font-medium text-xl text-primary"
          >
            {{ channelData?.channel?.name }}
          </NuxtLink>
          <div class="mt-1 text-sm leading-tight">
            {{ channelData?.channel?.description }}
          </div>
        </div>

        <div v-if="checkout" class="mb-8">
          <DeliveryInfoBlock />

          <button
            class="flex flex-row gap-2 items-center active:scale-95 lg:hover:scale-95 lg:active:scale-90 duration-200"
            @click="isDeliveryInfoModalOpened = !isDeliveryInfoModalOpened"
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
const { isNavbarOpened, isDeliveryInfoModalOpened } = useApp()
const { icons } = useAppConfig()
const channelData = await useChannel()
const { checkout } = await useCheckout()
</script>
