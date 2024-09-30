<template>
  <Navigation>
    <div>
      <div class="mb-8">
        <NuxtLink
          href="/"
          class="font-medium text-xl text-primary"
        >
          {{ channel?.name }}
        </NuxtLink>
        <div class="mt-1 text-sm leading-tight">
          {{ channel?.description }}
        </div>
      </div>

      <div v-if="checkout" class="mb-8">
        <DeliveryInfoBlock />

        <button
          class="flex flex-row gap-2 items-center active:scale-95 lg:hover:scale-95 lg:active:scale-90 duration-200"
          @click="isDeliveryInfoModalOpened = !isDeliveryInfoModalOpened"
        >
          <Icon :name="icons.link" /> {{ $t('app.show-details-label') }}
        </button>
      </div>

      <div class="mb-32">
        <p class="font-medium text-lg">
          {{ $t('app.catalog') }}
        </p>

        <NavigationButton
          v-for="category in categoriesWithProducts"
          :key="category.id"
          :link="`/catalog/${category.slug}`"
          :label="category.name"
        />
      </div>
    </div>

    <div class="mb-6 flex flex-col gap-2">
      <div class="flex flex-row gap-2">
        <ColorModeToggle />
      </div>
    </div>
  </Navigation>
</template>

<script setup lang="ts">
const { isDeliveryInfoModalOpened } = useApp()
const { icons } = useAppConfig()
const { channel, categoriesWithProducts } = await useChannel()
const { checkout } = await useCheckout()
</script>
