<script setup lang="ts">
import { UserApi } from '@/api'

onMounted(() => {
  UserApi.getUsers().then((res) => {
    console.log(res)
  })
})
</script>

<template>
  <main class="absolute inset-0 m-auto">
    <div class="absolute inset-0 m-auto flex h-fit w-1/3 flex-col space-y-4 pb-20 text-center text-4xl">
      <span class="animate-pulse font-semibold">API</span>
    </div>
  </main>
</template>
