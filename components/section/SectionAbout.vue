<template>
  <section
    v-if="block.status"
    :data-cms-bind="dataBinding"
    :style="{ backgroundColor: block.background_color }"
    class="about-section py-5"
  >
    <div
      class="container position-relative"
      itemscope
      itemtype="http://schema.org/AboutPage"
    >
      <div class="row h-100 align-items-center">
        <div class="col-lg-6 text-white mb-4 mb-lg-0">
          <h2 class="display-4 fw-bold mb-4 about-title" itemprop="name">
            {{ block.title }}
          </h2>
          <div
            v-html="block.description"
            itemprop="description"
            class="lead text-secondary about-text ckeditor-custom"
          ></div>
        </div>
        <div class="col-lg-6">
          <div class="image-grid">
            <div>
              <img
                :src="block.image_1"
                :alt="block.image_alt"
                class="img-fluid rounded shadow-lg"
              />
            </div>
            <div>
              <img
                :src="block.image_2"
                :alt="block.image_alt_2"
                class="img-fluid rounded shadow-lg"
              />
            </div>
            <div>
              <img
                :src="block.image_3"
                :alt="block.image_alt_3"
                class="img-fluid rounded shadow-lg"
              />
            </div>
            <div>
              <img
                :src="block.image_4"
                :alt="block.image_alt_4"
                class="img-fluid rounded shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="decor-image">
        <img
          :src="block.decor_image"
          alt="decor image"
          class="img-fluid rounded shadow-lg"
          style="width: 100%; height: 100%; filter: blur(50px)"
        />
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
  padding: 4rem 0;

  @include breakpoints.tablet-down {
    padding: 3rem 0;
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
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
  aspect-ratio: 1;

  @include breakpoints.tablet-down {
    max-width: 600px;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 1rem;
  }

  @include breakpoints.mobile-down {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 0.75rem;
    padding: 0.75rem;
  }

  div {
    overflow: hidden;
    border-radius: 12px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    aspect-ratio: 1;
    width: 100%;
    height: 100%;

    &:nth-child(1) {
      grid-column: 1;
      grid-row: 1;
    }

    &:nth-child(2) {
      grid-column: 2;
      grid-row: 1;
      @include breakpoints.desktop-up {
        height: 90%;
        width: 90%;
        margin-top: 10%;
      }
    }

    &:nth-child(3) {
      grid-column: 1;
      grid-row: 2;
      @include breakpoints.desktop-up {
        height: 90%;
        width: 90%;
        margin-left: 10%;
      }
    }

    &:nth-child(4) {
      grid-column: 2;
      grid-row: 2;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;

      &:hover {
        transform: scale(1.05);
      }
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

.decor-image {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  opacity: 0.8;
}

.row {
  position: relative;
  z-index: 2;
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
