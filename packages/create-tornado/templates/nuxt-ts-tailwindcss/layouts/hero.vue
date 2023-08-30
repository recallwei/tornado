<template>
  <div class="flex h-screen w-screen flex-col">
    <div class="h-[calc(100vh-48px)] w-full">
      <slot />
    </div>
    <footer class="h-12 w-full bg-slate-200">Footer</footer>
  </div>
</template>
