<template>
  <div class="pt-24">
    <h1 class="mb-2 text-3xl font-semibold text-center">
      {{ $t('init.title') }}
    </h1>
    <p class="text-lg leading-tight text-center">
      {{ $t('init.description') }}
    </p>

    <div class="mt-8 px-6 py-4 max-w-sm mx-auto bg-white dark:bg-neutral-500 rounded-2xl">
      <FormInitChannel v-if="!channel?.id" @success="checkIfChannelInited()" />
      <FormInitMaster v-else-if="!channel.masterAccountExists" @success="checkIfChannelInited()" />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'welcome',
})

const { channel, refresh } = await useChannel()

async function checkIfChannelInited() {
  await refresh()

  const { channel } = await useChannel()

  if (channel.value?.id && channel.value?.masterAccountExists) {
    await navigateTo('/command-center')
  }
}

checkIfChannelInited()
</script>
