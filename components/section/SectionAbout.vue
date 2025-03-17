<template>
  <section
    v-if="block.status"
    :data-cms-bind="dataBinding"
    class="about-section py-5"
  >
    <div class="container">
      <div class="row h-100 align-items-center">
        <div class="col-lg-6 text-white mb-4 mb-lg-0">
          <h2 class="display-4 fw-bold mb-4 about-title">
            {{ block.title }}
          </h2>
          <div
            v-html="block.description"
            class="lead text-secondary about-text ckeditor-custom"
          ></div>
        </div>
        <div class="col-lg-6">
          <div class="image-grid">
            <div
              v-for="(item, index) in block.list_images"
              :key="index"
              :class="[
                'image-item',
                index === 0 || index === block.list_images.length - 1
                  ? 'image-large'
                  : 'image-small',
              ]"
            >
              <NuxtImg
                :src="item.image"
                :alt="item.image_alt"
                class="img-fluid rounded shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
interface Props {
  dataBinding: any;
  block: any;
}

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: '0px',
    }
  );

  // Observe image items
  const imageItems = document.querySelectorAll('.image-item');
  imageItems.forEach((item) => {
    observer.observe(item);
  });

  // Observe text content
  const textContent = document.querySelector('.col-lg-6.text-white');
  if (textContent) {
    observer.observe(textContent);
  }
});

defineProps<Props>();
</script>

<style lang="scss" scoped>
@use '@/assets/style/_breakpoints.scss' as breakpoints;

.about-section {
  position: relative;
  overflow: hidden;
  min-height: 780px;
  width: 100%;

  @include breakpoints.tablet-down {
    min-height: auto;
    padding: 40px 0;
  }
}

.about-title {
  text-shadow: 0px 0px 15px rgba(255, 255, 255, 0.64);

  @include breakpoints.mobile-down {
    font-size: 24px !important;
  }
}

.about-text {
  font-size: 16px;

  @include breakpoints.mobile-down {
    font-size: 14px !important;
  }
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 1rem;
  padding: 1rem;
  max-width: 800px;
  margin: 0 auto;
  position: relative;

  @include breakpoints.tablet-down {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    padding: 1rem;
    width: 100%;
    max-width: 600px;
    aspect-ratio: 1;
  }

  @include breakpoints.mobile-down {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
    padding: 0.75rem;
    max-width: 100%;
  }
}

.image-item {
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.6s ease;
  aspect-ratio: 1;

  &.image-small {
    width: 280px;
    height: 280px;
  }

  &.image-large {
    width: 320px;
    height: 320px;
  }

  @include breakpoints.tablet-down {
    border-radius: 12px;
    width: 100%;
    height: 100%;
    aspect-ratio: 1;
    transform: none;

    &.image-small,
    &.image-large {
      width: 280px;
      height: 280px;
    }
  }

  @include breakpoints.mobile-down {
    border-radius: 8px;
  }

  &:nth-child(1) {
    transform: translateX(-20px) translateY(20px);
    @include breakpoints.tablet-down {
      transform: none !important;
    }
  }

  &:nth-child(2) {
    transform: translateX(0) translateY(40px) !important;
    @include breakpoints.tablet-down {
      transform: none !important;
    }
  }

  &:nth-child(3) {
    transform: translateX(40px) translateY(0) !important;
    @include breakpoints.tablet-down {
      transform: none !important;
    }
  }

  &:nth-child(4) {
    transform: translateX(20px) translateY(-20px);
    @include breakpoints.tablet-down {
      transform: none !important;
    }
  }

  &.visible {
    opacity: 1;
    transform: translateX(0) translateY(0);
  }

  &:hover {
    transform: scale(1.05);
    @include breakpoints.tablet-down {
      transform: scale(1.03);
    }
    @include breakpoints.mobile-down {
      transform: scale(1.02);
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);

    @include breakpoints.tablet-down {
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
    }
  }
}

.col-lg-6.text-white {
  opacity: 0;
  transform: translateX(-100px);
  transition: all 0.6s ease;

  &.visible {
    opacity: 1;
    transform: translateX(0);
  }
}

// Animation keyframes
@keyframes slideFromLeft {
  from {
    opacity: 0;
    transform: translateX(-100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideFromRight {
  from {
    opacity: 0;
    transform: translateX(100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideFromTop {
  from {
    opacity: 0;
    transform: translateY(-100px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideFromBottom {
  from {
    opacity: 0;
    transform: translateY(100px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// Remove fixed sizes for tablet and mobile
.image-small,
.image-large {
  @include breakpoints.tablet-down {
    width: 100% !important;
    height: 100% !important;
  }
}
</style>
