<template>
  <div class="w-100 overflow-hidden">
    <MainHeader class="header-transparent main-header" />
    <main class="grow main-content">
      <slot />
      <MainFooter />
    </main>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@use '@/assets/style/_breakpoints.scss' as breakpoints;

.header-transparent {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: transparent;
}

.main-header {
  transition: all 0.3s ease;
  height: 84.5px;

  @include breakpoints.mobile-down {
    height: 70px;
  }
}

.main-content {
  transition: padding 0.3s ease;
  padding-top: 84.5px;

  @include breakpoints.mobile-down {
    padding-top: 70px;
  }
}
</style>
