<template>
  <section
    class="testimonial-section position-relative"
    :style="{
      background: `linear-gradient(
        120deg,
        rgba(26, 30, 37, 0.65),
        rgba(26, 30, 37, 0.15)
      ),
      url(${block.background_image}) center/cover no-repeat`,
      padding: '120px 0',
    }"
  >
    <div class="container">
      <div class="row">
        <div class="col-lg-7">
          <div
            class="testimonial-card position-relative water-drop-animation"
            ref="testimonialCard"
            :class="{ 'animate-in': isVisible }"
          >
            <div class="d-flex align-items-center gap-2 mb-2">
              <h6
                class="text-uppercase text-white fw-medium tracking-wide mb-0"
                style="font-size: 14px"
              >
                TESTIMONIAL
              </h6>
            </div>
            <h2
              style="
                font-size: 37px;
                font-weight: 700;
                text-shadow: 0px 0px 15px rgba(255, 255, 255, 0.64);
              "
              class="section-title text-white fw-semibold pb-2"
            >
              {{ block.title }}
            </h2>
            <swiper
              :modules="[SwiperAutoplay, SwiperPagination]"
              :slides-per-view="1"
              :loop="true"
              :autoplay="{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }"
              :pagination="{ clickable: true }"
              class="testimonial-swiper"
            >
              <swiper-slide
                v-for="(testimonial, index) in block.list_items"
                :key="index"
              >
                <div>
                  <p
                    class="testimonial-text text-white fst-italic mb-4"
                    style="font-size: 20px"
                  >
                    {{ testimonial.description }}
                  </p>
                  <div class="d-flex align-items-center gap-3">
                    <div class="author-avatar rounded-circle overflow-hidden">
                      <NuxtImg
                        :src="testimonial.avatar"
                        :alt="testimonial.author"
                        class="w-100 h-100 object-fit-cover"
                      />
                    </div>
                    <div class="author-name text-white">
                      {{ testimonial.author }}
                    </div>
                  </div>
                </div>
              </swiper-slide>
            </swiper>
            <NuxtImg
              height="80"
              class="position-absolute"
              style="top: -40px; left: 50%; transform: translateX(-50%)"
              src="/images/icon-section-comment.png"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import { ref, onMounted } from 'vue';

const testimonialCard = ref(null);
const isVisible = ref(false);

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true;
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  if (testimonialCard.value) {
    observer.observe(testimonialCard.value);
  }
});

defineProps({
  block: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@use '@/assets/style/_breakpoints.scss' as breakpoints;

.testimonial-section {
  .container {
    position: relative;
    z-index: 1;
  }

  @include breakpoints.mobile-down {
    padding: 60px 0 !important;
  }
}

.tracking-wide {
  letter-spacing: 2px;
  font-size: 14px;

  @include breakpoints.mobile-down {
    font-size: 12px !important;
  }
}

.section-title {
  font-size: 42px;
  line-height: 1.2;
  position: relative;
  margin-bottom: 40px;
  font-weight: 700;
  text-shadow: 0px 0px 15px rgba(255, 255, 255, 0.64);

  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 0;
    width: 100%;
    height: 1px;
    background: rgba(255, 255, 255, 0.2);
  }

  @include breakpoints.tablet-down {
    font-size: 32px;
  }

  @include breakpoints.mobile-down {
    font-size: 24px !important;
  }
}

.testimonial-card {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.4) 0%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(255, 255, 255, 0.4) 100%
  );
  border-radius: 16px;
  padding: 64px 48px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);

  @include breakpoints.tablet-down {
    padding: 20px;
  }

  @include breakpoints.mobile-down {
    padding: 36px 16px 16px;
  }
}

.testimonial-text {
  font-size: 20px;
  line-height: 1.5;
  font-weight: 300;
  opacity: 0.95;
  margin: 0;

  @include breakpoints.tablet-down {
    font-size: 18px;
  }

  @include breakpoints.mobile-down {
    font-size: 16px;
  }
}

.author {
  &-avatar {
    width: 42px;
    height: 42px;
    border: 2px solid rgba(255, 255, 255, 0.2);

    @include breakpoints.mobile-down {
      width: 36px;
      height: 36px;
    }
  }

  &-name {
    font-size: 16px;
    font-weight: 500;

    @include breakpoints.mobile-down {
      font-size: 14px;
    }
  }
}

.position-absolute[src*='icon-section-comment'] {
  @include breakpoints.mobile-down {
    height: 56px !important;
    top: -32px !important;
  }
}

.testimonial-swiper {
  :deep(.swiper-pagination) {
    bottom: -40px;

    .swiper-pagination-bullet {
      background: rgba(255, 255, 255, 0.5);
      opacity: 1;

      &-active {
        background: #fff;
      }
    }
  }
}

.water-drop-animation {
  opacity: 0;
  transform: translateY(30px) scale(0.95);
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);

  &.animate-in {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at center,
      rgba(255, 255, 255, 0.8) 0%,
      transparent 100%
    );
    opacity: 0;
    transform: scale(1.5);
    transition: all 0.8s ease-out;
    pointer-events: none;
    border-radius: 16px;
  }

  &.animate-in::before {
    opacity: 0.4;
    transform: scale(1);
    animation: waterDrop 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }
}

@keyframes waterDrop {
  0% {
    opacity: 0.4;
    transform: scale(1.5);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.2);
  }
  100% {
    opacity: 0;
    transform: scale(1);
  }
}
</style>
