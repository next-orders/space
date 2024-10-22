<template>
  <div class="px-4 lg:px-12 pb-10 mt-20 text-center">
    <div class="flex flex-row gap-1 justify-center items-center">
      {{ $t('common.footer.copyright-part-one') }}
      <NuxtLink
        :to="projectUrl"
        target="_blank"
        class="font-semibold hover:opacity-80 duration-200"
      >
        {{ $t('common.footer.copyright-part-two') }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const { public: { projectUrl } } = useRuntimeConfig()
</script>
