<template>
  <div class="px-3 section-hero">
    <section
      v-if="block.status"
      :data-cms-bind="dataBinding"
      class="rounded-bottom-5 position-relative hero-section"
    >
      <div class="container">
        <div class="row">
          <div
            class="col d-flex flex-column justify-content-center gap-2 text-content"
            style="font-size: 14px"
          >
            <div class="slide-up hero-description">
              {{ block.description }}
            </div>
            <h1 class="fw-bold text-white slide-up hero-title"></h1>
            <Button
              :is_show="block.button.is_show"
              :link="block.button.link"
              :open_new_tab="block.button.open_new_tab"
              color="white"
              label="Booking Now"
              class="hero-button"
            />
          </div>
          <div class="col position-relative text-center image-container">
            <NuxtImg
              :src="block.image_2"
              :alt="block.image_alt_2"
              class="position-absolute scale-in hero-image-2"
            />
            <NuxtImg
              :src="block.image_1"
              :alt="block.image_alt_1"
              class="slide-up hero-image-1"
            />
            <NuxtImg
              :src="block.image_3"
              :alt="block.image_alt_3"
              class="position-absolute scale-in hero-image-3"
            />
          </div>
        </div>
      </div>
      <div class="position-absolute hero-bg"></div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import header from '@/data/header.json';
import LANGUAGES from '@/data/lang-setting.json';
import { useRoute } from 'vue-router';
import Button from '~/common/Button.vue';

const route = useRoute();
const langDefault: any = LANGUAGES.find((item) => {
  return item.isDefault;
});

let headerData: any = ref(header.en);

watch(
  () => route.path,
  () => {
    for (const key of Object.keys(header)) {
      if (route.path.includes(key)) {
        headerData.value = (header as any)[key];
        break;
      } else {
        headerData.value = (header as any)[langDefault.value];
      }
    }
  },
  { deep: true, immediate: true }
);

interface Props {
  dataBinding: any;
  block: any;
}

const { dataBinding, block } = defineProps<Props>();

const currentText = getCurrentPageText();

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.2, rootMargin: '-50px' }
  );

  const slideUpElements = document.querySelectorAll('.slide-up');
  const scaleInElements = document.querySelectorAll('.scale-in');

  slideUpElements.forEach((element) => {
    observer.observe(element);
  });

  scaleInElements.forEach((element) => {
    observer.observe(element);
  });
});

function getCurrentPageText(): string {
  const currentPagePath = route.path.replace(/^\//, '');
  return currentPagePath;
}
</script>

<style lang="scss" scoped>
@use '@/assets/style/_breakpoints.scss' as breakpoints;

.section-hero {
  @include breakpoints.mobile-down {
    padding: 0 !important;
  }
}

.hero-section {
  margin-top: 84.5px;
  height: 528px;
  background-image: url('/images/bg-nail-lab.1.png');
  background-position: bottom center;
  background-repeat: no-repeat;
  overflow: hidden;
}

.row {
  @include breakpoints.mobile-down {
    flex-direction: column;
  }
}

.text-content {
  font-size: 14px;

  @include breakpoints.mobile-down {
    text-align: center;
  }
}

.hero-tag {
  width: 18%;
  background-color: transparent;
  font-size: 14px;
  padding: 6px 0;
  box-shadow: 0 0 1px 0.1px #8ed7f5;
  animation-delay: 0.2s;

  @include breakpoints.mobile-down {
    width: 28% !important;
    margin: 0 auto 8px;
    font-size: 12px !important;
  }
}

.hero-description {
  font-size: 50px;
  font-weight: 700;
  color: white;
  margin-bottom: 6px;
  animation-delay: 0.4s;
  width: 95%;
  text-shadow: 0px 0px 16px rgba(255, 255, 255, 0.51);
  line-height: 1.1;

  @include breakpoints.mobile-down {
    font-size: 30px !important;
  }
}

.hero-title {
  font-size: 50px;
  text-shadow: 0px 0px 16px rgba(255, 255, 255, 0.51);
  animation-delay: 0.6s;

  @include breakpoints.mobile-down {
    font-size: 30px !important;
  }
}

.hero-button {
  width: 25%;
  height: 46px;

  @include breakpoints.mobile-down {
    width: 36% !important;
    margin: 0 auto;
    font-size: 12px !important;
  }
}

.image-container {
  @include breakpoints.mobile-down {
    height: 450px;
    margin-top: 20px;
  }
}

.hero-image-1 {
  height: 520px;
  z-index: 10;
  animation-delay: 0.4s;

  @include breakpoints.mobile-down {
    height: 360px !important;
    margin: 0 auto;
  }
}

.hero-image-2 {
  height: 200px;
  top: 12%;
  left: 5%;
  animation-delay: 0.3s;

  @include breakpoints.mobile-down {
    height: 120px !important;
    top: 5% !important;
    left: 2% !important;
  }
}

.hero-image-3 {
  height: 112px;
  top: 57%;
  right: 0;
  animation-delay: 0.4s;

  @include breakpoints.mobile-down {
    height: 80px !important;
    top: 45% !important;
    right: 0 !important;
  }
}

.hero-bg {
  top: 20px;
  right: -450px;
  width: 100%;
  height: 100%;
  background-image: url('/images/bg-nail-lab-3.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  @include breakpoints.mobile-down {
    display: none;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(60px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.slide-up {
  opacity: 0;
  transform: translateY(60px);

  &.visible {
    animation: slideUp 0.8s ease forwards;
  }
}

.scale-in {
  opacity: 0;
  transform: scale(0.8);

  &.visible {
    animation: scaleIn 0.8s ease forwards;
  }
}

.first_items {
  &::after {
    content: ' /';
  }
}

h6 {
  box-shadow: 0px 0px 30px 0px rgba(255, 255, 255, 0.1);
}
</style>
