<script setup lang="ts">
import { dateZhCN, lightTheme, zhCN } from 'naive-ui'
</script>

<template>
  <NConfigProvider
    :locale="zhCN"
    :date-locale="dateZhCN"
    :theme="lightTheme"
  >
    <NLoadingBarProvider>
      <NMessageProvider>
        <RouterView v-slot="{ Component }">
          <Transition
            name="router"
            mode="out-in"
          >
            <KeepAlive>
              <component :is="Component" />
            </KeepAlive>
          </Transition>
        </RouterView>
      </NMessageProvider>
    </NLoadingBarProvider>
  </NConfigProvider>
</template>

<style scoped lang="scss">
.router-enter-active,
.router-leave-active {
  transition: opacity 0.3s ease;
}
.router-enter-from,
.router-leave-to {
  opacity: 0;
}
</style>
