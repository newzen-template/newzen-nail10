<template>
  <section
    :style="{
      backgroundColor: block.background_color,
    }"
    v-if="block.status"
    :data-cms-bind="dataBinding"
    class="px-3"
  >
    <div
      :style="{
        backgroundImage: !block.style
          ? 'url(/images/bg-nail-lab.1.png)'
          : 'none',
        backgroundPosition: 'bottom center',
        backgroundRepeat: 'no-repeat',
        overflow: !block.style ? 'hidden' : '',
        backgroundSize: !block.style ? 'contain' : 'auto',
      }"
      class="breadcrumb-section rounded-bottom-5 position-relative d-flex align-items-center justify-content-center flex-column"
    >
      <h6
        v-if="block.style && block.sub_title"
        class="nail-lab-badge border-primary text-white rounded-pill text-center fw-normal slide-up-animation-h6"
      >
        {{ block.sub_title || '' }}
      </h6>
      <h1 class="text-white text-center slide-up-animation-h1">
        {{ block.title }}
      </h1>
      <div v-if="block.style" class="bg-overlay bg-overlay-style"></div>
      <div v-if="!block.style" class="bg-overlay bg-overlay-no-style"></div>
    </div>
  </section>
</template>

<script lang="ts" setup>
interface Props {
  dataBinding: any;
  block: any;
}

defineProps<Props>();
</script>

<style lang="scss" scoped>
@use '@/assets/style/_breakpoints.scss' as breakpoints;

.breadcrumb-section {
  padding: 120px 0;

  @include breakpoints.tablet-down {
    padding: 80px 0;
  }

  @include breakpoints.mobile-down {
    padding: 40px 0;
  }
}

.nail-lab-badge {
  width: 120px;
  background-color: transparent;
  font-size: 14px;
  padding: 6px 0;
  box-shadow: 0 0 1px 0.1px #8ed7f5;
  margin-bottom: 20px;

  @include breakpoints.desktop-down {
    width: 110px;
    font-size: 13px;
    margin-bottom: 18px;
  }

  @include breakpoints.tablet-down {
    width: 100px;
    font-size: 12px;
    margin-bottom: 15px;
  }

  @include breakpoints.mobile-down {
    width: 90px;
    font-size: 11px;
    margin-bottom: 12px;
  }
}

.slide-up-animation {
  &-h1 {
    animation: slideUpH1 1s ease-out;
    font-size: 67px;
    text-shadow: 0px 0px 25px rgba(255, 255, 255, 0.44);
    font-weight: 700;
    margin-bottom: 30px;

    @include breakpoints.desktop-down {
      font-size: 55px;
      margin-bottom: 25px;
    }

    @include breakpoints.tablet-down {
      font-size: 45px;
      margin-bottom: 20px;
    }

    @include breakpoints.mobile-down {
      font-size: 32px;
      margin-bottom: 15px;
    }
  }

  &-h6 {
    animation: slideUpH6 1.1s ease-out;
  }
}

.bg-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;

  &-style {
    top: -84.5px;
    left: 50%;
    transform: translateX(-50%);
    background-image: url('/images/bg-nail-lab-5.png');
    z-index: 5;
    background-size: cover;
  }

  &-no-style {
    top: 0;
    right: -450px;
    background-image: url('/images/bg-nail-lab-3.png');
    background-size: cover;

    @include breakpoints.tablet-down {
      right: -300px;
    }

    @include breakpoints.mobile-down {
      right: -200px;
    }
  }
}

@keyframes slideUpH1 {
  from {
    transform: translateY(200px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slideUpH6 {
  from {
    transform: translateY(100px);
    opacity: 0;
  }
  70% {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
