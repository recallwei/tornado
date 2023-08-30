<template>
  <div class="flex h-screen w-screen flex-col">
    <header class="h-16 w-full bg-slate-100">Header</header>
    <div class="h-[calc(100vh-112px)] w-full">
      <slot />
    </div>
    <footer class="h-12 w-full bg-slate-200">Footer</footer>
  </div>
</template>
