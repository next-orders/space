<template>
  <div class="mb-6 flex flex-row justify-between items-center">
    <nav class="hidden md:block">
      <ol class="flex flex-row flex-wrap gap-y-2 items-center">
        <li v-for="link in links" :key="link.title" class="relative max-w-[20rem] after:content-['/'] after:px-1 after:text-lg after:text-neutral-300 dark:after:text-neutral-600 last:after:content-[''] last:after:hidden">
          <NuxtLink
            v-if="link.href !== '#'"
            :to="link.href"
            class="px-3 py-2 inline-block leading-tight rounded-xl active:scale-95 md:active:scale-90 hover:bg-neutral-200 dark:hover:bg-neutral-600 hover:scale-95 duration-200 bg-neutral-50 dark:bg-neutral-700"
          >
            {{ link.title }}
          </NuxtLink>
          <div v-else class="px-1 leading-tight">
            {{ link.title }}
          </div>
        </li>
      </ol>
    </nav>

    <div class="w-full md:w-auto mx-auto md:mx-0">
      <UiButton variant="secondary" :class="{ 'bg-neutral-200': isDarkBackground }" @click="back()">
        <div class="flex flex-row gap-2 justify-center items-center">
          <Icon :name="icons.undo" size="20" /> {{ $t('common.return') }}
        </div>
      </UiButton>
    </div>
  </div>
</template>

<script setup lang="ts">
const { links } = defineProps<{
  links: { title: string, href: string }[]
  isDarkBackground?: boolean
}>()

const { icons } = useAppConfig()
const { back } = useRouter()
</script>
