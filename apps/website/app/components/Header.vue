<template>
  <header :class="headerClasses">
    <UContainer>
      <div class="flex h-16 items-center justify-between">
        <div class="flex items-center gap-4">
          <Logo />
        </div>
        <div class="flex items-center gap-1">
          <UColorModeToggle />
          <UGithubButton />
        </div>
      </div>
    </UContainer>
  </header>
</template>

<script setup lang="ts">
interface Props {
  transparent?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  transparent: false,
})

const headerClasses = computed(() => [
  props.transparent ? 'bg-transparent' : 'bg-white dark:bg-gray-800 shadow-sm',
])
</script>
