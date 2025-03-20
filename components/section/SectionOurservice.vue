<template>
  <section
    v-if="block.status"
    :style="{ background: block.background_color }"
    :data-cms-bind="dataBinding"
    style="padding: 80px 0"
  >
    <div
      class="container-md text-white d-flex flex-column gap-4 align-items-center"
    >
      <div class="text-center">
        <h6 class="text-main">{{ block.name_logo }}</h6>
        <h2
          class="service-title"
          style="
            text-shadow: 0px 0px 15px rgba(255, 255, 255, 0.64);
            font-weight: 700;
            font-size: 37px;
          "
        >
          {{ block.title }}
        </h2>
      </div>
      <div class="row service-row" style="width: 100%">
        <div
          v-for="(item, index) in block.list_items"
          :key="index"
          class="col-12 col-md-3 my-2 animation-element"
        >
          <div
            :style="{
              backgroundColor: block.background_items,
              padding: '52px 32px',
            }"
            class="d-flex justify-content-center align-items-center rounded flex-column gap-3"
          >
            <NuxtImg
              :src="item.image"
              :alt="item.image_alt"
              style="width: 86px; height: 86px"
            />
            <NuxtLink
              :to="item.url"
              style="color: white; font-size: 21px; font-weight: 600"
              >{{ item.title }}</NuxtLink
            >
          </div>
        </div>
      </div>
      <Button
        :is_show="block.button.is_show"
        :label="block.button.label"
        :link="block.button.link"
        :open_new_tab="block.button.open_new_tab"
        style="width: 160px"
        class="btn-mobile"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
import Button from '~/common/Button.vue';

interface Props {
  dataBinding: any;
  block: any;
}

defineProps<Props>();

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          !entry.target.classList.contains('has-animated')
        ) {
          entry.target.classList.add('visible');
          entry.target.classList.add('has-animated');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: '-50px',
    }
  );

  const items = document.querySelectorAll('.animation-element');
  items.forEach((item) => {
    observer.observe(item);
  });
});
</script>

<style lang="scss" scoped>
// Variables
$mobile-breakpoint: 414px;
$animation-duration: 1s;
$dark-bg-color: #12141d80;

// Mixins
@mixin transform($value) {
  transform: $value;
}

// Base styles
.col-12 {
  opacity: 0;
  transition: all $animation-duration ease;

  &:nth-child(1) {
    @include transform(translateX(-100px));
  }

  &:nth-child(2) {
    @include transform(translateY(-100px));
  }

  &:nth-child(3) {
    @include transform(translateY(100px));
  }

  &:nth-child(4) {
    @include transform(translateX(100px));
  }

  &.visible {
    opacity: 1;
    @include transform(translateX(0) translateY(0));
  }
}

// Media queries
@media screen and (max-width: $mobile-breakpoint) {
  h6 {
    font-size: 12px !important;
  }

  h2 {
    font-size: 24px !important;
  }

  .service-row {
    margin: 0 auto;
  }

  .col-12 {
    padding: 0;
  }

  .container-md {
    padding-left: 0;
    padding-right: 0;
  }

  .btn-mobile {
    font-size: 12px !important;
  }
}

// Animations
@mixin slide-animation($direction, $axis, $value) {
  @keyframes slideFrom#{$direction} {
    0% {
      opacity: 0;
      @if $axis == 'X' {
        @include transform(translateX($value));
      } @else {
        @include transform(translateY($value));
      }
    }
    100% {
      opacity: 1;
      @include transform(translate(0));
    }
  }
}

@include slide-animation('Left', 'X', -100px);
@include slide-animation('Right', 'X', 100px);
@include slide-animation('Top', 'Y', -100px);
@include slide-animation('Bottom', 'Y', 100px);
</style>
