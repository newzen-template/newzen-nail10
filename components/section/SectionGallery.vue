<template>
  <section
    v-if="block.status"
    :style="{ background: block.background_color }"
    :data-cms-bind="dataBinding"
    class="our-work"
  >
    <div class="container">
      <h2
        class="text-center text-white mb-5 fw-bold"
        style="
          font-size: 37px;
          text-shadow: 0px 0px 15px rgba(255, 255, 255, 0.64);
        "
      >
        {{ block.title }}
      </h2>
      <div class="row g-2">
        <div
          v-for="(item, index) in displayedData"
          :key="index"
          class="col-4 col-sm-3 col-md-2 col-lg-1-7"
        >
          <div
            class="work-item position-relative overflow-hidden rounded animation-element"
            :style="{ transitionDelay: index * 0.12 + 's' }"
            @click="openLightbox(index)"
          >
            <NuxtImg
              :src="item.image"
              :alt="item.image_alt"
              class="img-fluid w-100 h-150 object-fit-cover"
            />
          </div>
        </div>
      </div>
      <div class="text-center">
        <Button
          :is_show="block.button.is_show"
          :label="block.button.label"
          :link="block.button.link"
          :open_new_tab="block.button.open_new_tab"
          style="width: 120px; margin-top: 40px; height: 40px"
          class="btn-mobile"
        />
      </div>
    </div>

    <!-- Lightbox component -->
    <vue-easy-lightbox
      :visible="isShowLightbox"
      :imgs="imageData"
      :index="currentImageIndex"
      :loop="true"
      :moveDisabled="false"
      @hide="closeLightbox"
    >
      <template #prev-btn="{ prev }">
        <button class="custom-prev-btn" @click="prev">
          <i class="bi bi-chevron-left"></i>
        </button>
      </template>
      <template #next-btn="{ next }">
        <button class="custom-next-btn" @click="next">
          <i class="bi bi-chevron-right"></i>
        </button>
      </template>
      <template #close-btn="{ close }">
        <button class="custom-close-btn" @click="close">
          <i class="bi bi-x-lg"></i>
        </button>
      </template>
    </vue-easy-lightbox>
  </section>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue';
import Button from '~/common/Button.vue';
import VueEasyLightbox from 'vue-easy-lightbox';
import LANGUAGES from '@/data/lang-setting.json';

interface Props {
  dataBinding: any;
  block: {
    status: boolean;
    background_color: string;
    title: string;
    list_items: Array<{
      image: string;
      image_alt: string;
    }>;
    button: {
      is_show: boolean;
      label: string;
      link: string;
      open_new_tab: boolean;
    };
  };
}

const props = defineProps<Props>();

const currentImageIndex = ref(0);
const isShowLightbox = ref(false);

const route = useRoute();
const pathQuery = ref<string>('/');

const countries = LANGUAGES.map((lang: any) => {
  return {
    name: lang.label,
    value: lang.value,
    enable: lang.isDefault,
  };
});

const { data: dataGallery } = useAsyncData('dataGallery', async () => {
  if (
    route?.params?.slug &&
    countries &&
    countries.some((item: any) => item.value === route?.params?.slug[0])
  ) {
    pathQuery.value = `/${route?.params?.slug[0]}/`;
  }
  return await queryContent(`${pathQuery.value}gallery`)
    .where({ _path: `${pathQuery.value}gallery` })
    .sort({ createdAt: -1 })
    .findOne();
});

const displayedData = computed(() => {
  if (!dataGallery.value?.content_blocks) {
    return [];
  }

  const galleryBlock = dataGallery.value.content_blocks.find(
    (e: any) => e._block_name === 'gallery/hero'
  );

  if (!galleryBlock?.gallery) {
    return [];
  }

  const galleryItems = galleryBlock.gallery
    .map((item: any) => item.item)
    .filter(Boolean)
    .flat()
    .slice(0, 7);

  console.log(galleryBlock.gallery);

  return [...galleryItems].sort((a, b) => {
    const dateA = a?.created_at || 0;
    const dateB = b?.created_at || 0;
    return dateB - dateA;
  });
});

const imageData = computed(() => {
  return displayedData?.value.map((e: any) => e.image);
});

const openLightbox = (index: number) => {
  currentImageIndex.value = index;
  isShowLightbox.value = true;
};

const closeLightbox = () => {
  isShowLightbox.value = false;
};

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
$primary-color: #8cd4f5;
$primary-hover-color: #6bc1e9;
$overlay-color: rgba(0, 0, 0, 0.4);
$lightbox-btn-bg: rgba(255, 255, 255, 0.3);
$lightbox-btn-hover-bg: rgba(255, 255, 255, 0.5);

// Breakpoints
$mobile-sm: 414px;
$mobile: 575.98px;
$tablet: 767.98px;
$desktop-sm: 991.98px;

// Mixins
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

@mixin transition($property: all, $duration: 0.3s) {
  transition: $property $duration ease;
}

@mixin lightbox-button {
  background: $lightbox-btn-bg;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  @include flex-center;
  cursor: pointer;
  @include transition(background);
  position: absolute;

  &:hover {
    background: $lightbox-btn-hover-bg;
  }
}

// Base styles
.our-work {
  @include flex-center;
  width: 100%;
  padding: 80px 0;
}

.animation-element {
  opacity: 0;
  transform: translate(-100px, 100px) scale(0);
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  will-change: transform, opacity;

  &.visible {
    opacity: 1;
    transform: translate(0, 0) scale(1);
  }
}

// Grid system
.col-lg-1-7 {
  flex: 0 0 calc(100% / 7);
  max-width: calc(100% / 7);
}

// Work item styles
.work-item {
  @include transition(transform);
  overflow: hidden;
  position: relative;

  &:hover {
    cursor: pointer;

    &::before {
      opacity: 1;
    }

    .img-fluid {
      transform: scale(1.2);
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: $overlay-color;
    opacity: 0;
    @include transition(opacity);
    z-index: 1;
  }
}

.img-fluid {
  @include transition;
}

// Button styles
.btn-view-work {
  background-color: $primary-color;
  color: white;
  padding: 0.75rem 2rem;
  border-radius: 25px;
  text-decoration: none;
  @include transition;

  &:hover {
    background-color: $primary-hover-color;
    transform: translateY(-2px);
  }
}

// Lightbox styles
:deep {
  .custom-prev-btn,
  .custom-next-btn,
  .custom-close-btn {
    @include lightbox-button;
    top: 50%;
    transform: translateY(-50%);
  }

  .custom-prev-btn {
    left: 20px;
  }

  .custom-next-btn {
    right: 20px;
  }

  .custom-close-btn {
    top: 20px;
    right: 20px;
    transform: none;
  }

  .bi {
    color: white;
    font-size: 20px;
  }

  .vel-img {
    cursor: zoom-in;

    &.zoomed {
      cursor: zoom-out;
    }
  }

  .vel-thumbnails-list .vel-thumbnail {
    cursor: pointer;
  }
}

// Media queries
@media (max-width: $desktop-sm) {
  .col-md-2 {
    flex: 0 0 calc(100% / 6);
    max-width: calc(100% / 6);
  }
}

@media (max-width: $tablet) {
  .col-sm-3 {
    flex: 0 0 25%;
    max-width: 25%;
  }
}

@media (max-width: $mobile) {
  .col-4 {
    flex: 0 0 33.333333%;
    max-width: 33.333333%;
    padding: 0 5px;
  }

  .our-work {
    padding: 40px 0;
    display: block;
  }

  .container {
    padding: 0 10px;
  }

  .work-item {
    aspect-ratio: 3/4;
  }

  .img-fluid {
    height: 100%;
    object-fit: cover;
    object-position: top;
  }

  h2 {
    font-size: 28px !important;
    margin-bottom: 20px !important;
  }
}

@media (max-width: $mobile-sm) {
  .row {
    margin: 0 -5px;
  }

  .col-4 {
    padding: 0 3px;
  }

  .work-item {
    aspect-ratio: 2/3;
  }

  .btn-mobile {
    font-size: 12px !important;
  }
}
</style>
