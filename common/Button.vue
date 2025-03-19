<script setup>
defineProps({
  label: String,
  icon: String,
  color: String,
  link: String,
  size: String,
  open_new_tab: Boolean,
  is_show: Boolean,
  itemprop: String,
});
</script>

<template>
  <button
    v-if="is_show"
    class="btn-primary bg-button border-0 rounded-start-pill rounded-end-pill px-3"
  >
    <NuxtLink
      :target="open_new_tab ? '_blank' : '_self'"
      :to="link"
      class="text-white"
    >
      <slot></slot>
      <span :itemprop="itemprop">{{ label }}</span>
    </NuxtLink>
  </button>
</template>

<style scoped lang="scss">
.btn-primary {
  font-size: 14px;
  padding: 8px 0;

  &:hover {
    opacity: 0.9;
    transition: 0.1s ease-in-out;
  }
}
</style>
