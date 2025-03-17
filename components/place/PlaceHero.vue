<template>
  <section
    v-if="block.status"
    :style="{ background: block.background_color, margin: '1rem 0' }"
    :data-cms-bind="dataBinding"
    class="section"
  >
    <div class="container p-0">
      <GalleryHome
        :dataImage="block.gallery"
        :dataBinding="dataBinding"
        :block="block"
        :layout="{
          largeDesktop: 6,
          desktop: 4,
          tablet: 3,
          mobile: 2,
        }"
      />
    </div>

    <!-- Lightbox component -->
    <vue-easy-lightbox
      :visible="isShowLightbox"
      :imgs="galleryImages"
      :index="currentImageIndex"
      :loop="true"
      :moveDisabled="false"
      @hide="closeLightbox"
    >
      <template #prev-btn="{ prev }">
        <button class="btn-nav prev" @click="prev">
          <i class="bi bi-chevron-left"></i>
        </button>
      </template>
      <template #next-btn="{ next }">
        <button class="btn-nav next" @click="next">
          <i class="bi bi-chevron-right"></i>
        </button>
      </template>
      <template #close-btn="{ close }">
        <button class="btn-nav close" @click="close">
          <i class="bi bi-x-lg"></i>
        </button>
      </template>
    </vue-easy-lightbox>
  </section>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import VueEasyLightbox from 'vue-easy-lightbox';
import GalleryHome from '@/common/GalleryHome.vue';

interface Props {
  dataBinding: any;
  block: {
    status: boolean;
    background_color: string;
    gallery: Array<{
      image: string;
      image_alt: string;
    }>;
  };
}

const props = defineProps<Props>();

const currentImageIndex = ref(0);
const isShowLightbox = ref(false);

const galleryImages = computed(() => {
  return props.block.gallery.map((item) => ({
    src: item.image,
    title: item.image_alt,
  }));
});

const openLightbox = (index: number) => {
  currentImageIndex.value = index;
  isShowLightbox.value = true;
};

const closeLightbox = () => {
  isShowLightbox.value = false;
};
</script>

<style lang="scss" scoped>
@use '@/assets/style/_breakpoints.scss' as breakpoints;

.section {
  background-color: #ffffff;
  position: relative;
  overflow: hidden;
}

// Lightbox styles
.btn-nav {
  background: rgba(255, 255, 255, 0.3);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s ease;
  position: absolute;

  &:hover {
    background: rgba(255, 255, 255, 0.5);
  }

  @include breakpoints.tablet-down {
    width: 35px;
    height: 35px;
  }

  @include breakpoints.mobile-down {
    width: 30px;
    height: 30px;
  }

  &.prev {
    left: 20px;
    top: 50%;
    transform: translateY(-50%);

    @include breakpoints.tablet-down {
      left: 10px;
    }
  }

  &.next {
    right: 20px;
    top: 50%;
    transform: translateY(-50%);

    @include breakpoints.tablet-down {
      right: 10px;
    }
  }

  &.close {
    top: 20px;
    right: 20px;

    @include breakpoints.tablet-down {
      top: 10px;
      right: 10px;
    }
  }

  .bi {
    color: white;
    font-size: 20px;

    @include breakpoints.tablet-down {
      font-size: 18px;
    }

    @include breakpoints.mobile-down {
      font-size: 16px;
    }
  }
}

::-webkit-scrollbar {
  width: 8px;

  &-track {
    background: #f1f1f1;
  }

  &-thumb {
    background: #d4b48c;
    border-radius: 4px;

    &:hover {
      background: #c4a47c;
    }
  }
}
</style>
