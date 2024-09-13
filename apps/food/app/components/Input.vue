<template>
  <div>
    <label :for="id" class="mb-1 block text-sm font-medium text-neutral-900">{{ label }}</label>
    <input
      :id="id"
      type="text"
      value=""
      :placeholder="placeholder"
      class="px-4 py-3 mb-2 w-full border border-neutral-200 rounded-2xl outline-2 outline-offset-1 outline-neutral-500 placeholder:text-neutral-400"
    >
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  placeholder?: string
}>()

const id = useId()
</script>
