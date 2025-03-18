<template>
  <section
    v-if="block.status"
    :data-cms-bind="dataBinding"
    :style="{ backgroundColor: block.background_color, padding: '16px' }"
  >
    <div
      class="contact-section container rounded d-flex justify-content-between align-items-center position-relative"
    >
      <NuxtImg :src="block.logo" class="logo-image" :alt="block.logo_alt" />
      <Button
        class="contact-button"
        :link="block.button.link"
        :open_new_tab="block.button.open_new_tab"
        :is_show="block.button.is_show"
        :label="block.button.label"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  dataBinding: any;
  block: any;
}

const { dataBinding, block } = defineProps<Props>();
import Button from '~/common/Button.vue';
</script>

<style lang="scss" scoped>
@use '@/assets/style/_breakpoints.scss' as breakpoints;

.contact-section {
  background-image: url('/images/bg-nail-lab-3.png');
  background-position: bottom right;
  background-repeat: no-repeat;
  width: 100%;
  height: 122px;
  padding: 0 20px;
  background: #1c1e2a;

  @include breakpoints.desktop-down {
    height: 110px;
    padding: 0 16px;
  }

  @include breakpoints.tablet-down {
    height: 100px;
    margin-top: 10px;
  }

  @include breakpoints.mobile-down {
    height: auto;
    padding: 20px !important;
    flex-direction: column;
    gap: 20px;
    margin: 24px 0 !important;
    background-position: center right;
  }
}

.logo-image {
  height: 50px;

  @include breakpoints.desktop-down {
    height: 45px;
  }

  @include breakpoints.tablet-down {
    height: 42px;
  }

  @include breakpoints.mobile-down {
    height: 40px;
  }
}

.contact-button {
  height: 46px;
  width: 140px;
  margin-right: 20px;

  @include breakpoints.desktop-down {
    height: 44px;
    width: 130px;
    margin-right: 16px;
  }

  @include breakpoints.tablet-down {
    height: 42px;
    width: 125px;
    margin-right: 12px;
    font-size: 14px;
  }

  @include breakpoints.mobile-down {
    width: 120px !important;
    height: 40px !important;
    margin-right: 0 !important;
    font-size: 12px;
  }
}
</style>
