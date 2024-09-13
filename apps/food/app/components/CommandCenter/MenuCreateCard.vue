<template>
  <div class="bg-neutral-50 rounded-2xl h-auto min-h-60 w-auto px-4 py-2 cursor-pointer hover:scale-95 duration-200 group">
    <div class="flex flex-col justify-center items-center h-full text-center">
      <img
        src="~/assets/img/green-notebook.png"
        width="64"
        height="64"
        alt=""
        class="mx-auto mb-4 w-14 h-14"
      >
      <h2 class="text-lg leading-tight">
        {{ $t('center.create.menu') }}
      </h2>
    </div>
  </div>
</template>
