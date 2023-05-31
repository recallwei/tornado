<script setup lang="ts">
import { siteMetaData } from '@/constants'
</script>

<template>
  <main class="absolute inset-0 m-auto">
    <div class="absolute inset-0 m-auto flex h-fit w-1/3 flex-col space-y-4 pb-20 text-center text-4xl">
      <span class="animate-pulse font-semibold">{{ siteMetaData.AppName }}</span>
      <span class="text-base tracking-wider">v{{ siteMetaData.Version }}</span>
    </div>
  </main>
</template>
