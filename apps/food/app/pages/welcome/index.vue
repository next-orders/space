<template>
  <div class="pt-24">
    <h1 class="mb-2 text-3xl font-semibold text-center">
      {{ $t('init.title') }}
    </h1>
    <p class="text-lg leading-tight text-center">
      {{ $t('init.description') }}
    </p>

    <div class="mt-8 px-6 py-4 max-w-sm mx-auto bg-white dark:bg-neutral-500 rounded-2xl">
      <FormInitChannel v-if="!channel?.id" />
      <FormInitMaster v-else-if="!channel.masterAccountExists" />
      <div v-else>
        <h2 class="mb-4 text-xl md:text-2xl font-semibold text-center">
          {{ $t('init.finish-message') }}
        </h2>

        <NuxtLink to="/command-center">
          <UiButton>
            {{ $t('app.cart.next-label') }}
          </UiButton>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'welcome',
})

const { channel } = await useChannel()

if (channel.value?.id && channel.value?.masterAccountExists) {
  await navigateTo('/command-center')
}
</script>
