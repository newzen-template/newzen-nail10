<template>
  <section
    v-if="block.status"
    :data-cms-bind="dataBinding"
    class="gallery-section"
    :style="{ backgroundColor: block.background_color }"
  >
    <div class="container">
      <div class="mb-4">
        <BaseLightBox
          :valueButton="valueButton"
          :dataImage="dataImage"
          :indexCurrent="indexCurrent"
          @close="handleClose"
        />

        <ul class="category-list">
          <li
            :class="['category-item', idTab === 'all' ? 'active' : '']"
            @click="handelTabCategory('all')"
          >
            All
          </li>
          <li
            v-for="(item, index) in block.gallery"
            :key="index"
            :class="['category-item', idTab === index ? 'active' : '']"
            @click="handelTabCategory(index)"
          >
            {{ item.label }}
          </li>
        </ul>
      </div>

      <div class="position-relative">
        <div class="gallery-grid">
          <div
            v-for="(item, index) in displayAlbum"
            :key="index"
            class="gallery-item"
            @click="onShow(index)"
          >
            <img
              :src="item.image"
              :alt="item.image_alt"
              class="gallery-image"
            />
          </div>
        </div>

        <button
          v-if="displayAlbum.length < getTabListAlbum().length"
          class="load-more-btn"
          @click="handleLoadMore()"
        >
          View More
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  dataBinding: any;
  block: any;
  layout?: {
    largeDesktop?: number; // > 1200px
    desktop?: number; // 768px - 1200px
    tablet?: number; // 576px - 768px
    mobile?: number; // < 576px
  };
}

const props = withDefaults(defineProps<Props>(), {
  layout: () => ({
    largeDesktop: 8,
    desktop: 6,
    tablet: 4,
    mobile: 2,
  }),
});
const idTab = ref<string | number>('all');
const isLoading = ref<boolean>(false);
const PAGE_SIZE: number = 12;
const currentPage = ref<number>(1);
const handelTabCategory = (id: string | number) => {
  if (idTab.value !== id) {
    isLoading.value = true;
    idTab.value = id;
    currentPage.value = 1;
    isLoading.value = false;
    getTabListAlbum();
  }
};
const getTabListAlbum = () => {
  const galleryItems =
    idTab.value === 'all'
      ? props.block.gallery.map((item: any) => item.item).flat()
      : props.block.gallery.map((item: any) => item.item)[idTab.value];
  return [...galleryItems].sort((a, b) => {
    const dateA = a?.created_at || 0;
    const dateB = b?.created_at || 0;
    return dateB - dateA;
  });
};
const displayAlbum = computed(() => {
  const data: any[] = getTabListAlbum();
  return data.slice(0, PAGE_SIZE * currentPage.value);
});
const handleLoadMore = () => {
  isLoading.value = true;
  setTimeout(() => {
    currentPage.value += 1;
    isLoading.value = false;
  }, 500);
};
const dataImage = computed(() => {
  return getTabListAlbum()
    .slice(0, PAGE_SIZE * currentPage.value)
    .map((e: any) => ({
      src: e.image,
      title: e.image_alt,
    }));
});

const indexCurrent = ref(-1);
const valueButton = ref<any>();
const onShow = (idx: number) => {
  indexCurrent.value = idx;
  nextTick(() => {
    const eleIconClose = document.querySelector('.btn-close') as HTMLElement;
    eleIconClose.style.display = 'none';
  });
  setTimeout(() => {
    nextTick(() => {
      const wrapper = document.querySelector('.vel-img-wrapper');
      const btnClose = document.querySelector('.btn-close') as HTMLElement;
      if (btnClose) {
        btnClose?.classList.add('btn-close');
        btnClose.style.display = 'block';
      }
      wrapper?.appendChild(btnClose);
      valueButton.value = btnClose;
    });
  }, 400);
};

const handleClose = (id: number) => {
  indexCurrent.value = id;
};

onMounted(() => {
  if (typeof document !== 'undefined') {
    const galleryGrid = document.querySelector('.gallery-grid') as HTMLElement;
    if (galleryGrid) {
      const observe = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
            }
          });
        },
        {
          threshold: 0.1,
        }
      );
      observe.observe(galleryGrid);
    }
  }
});
</script>

<style lang="scss" scoped>
@use '@/assets/style/_breakpoints.scss' as breakpoints;

.gallery-section {
  padding: 3rem 0;
  background-color: #1c1e2a;
}

.category-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.category-item {
  padding: 0.5rem 1.5rem;
  border: 1px solid #94a3b8;
  color: #fff;
  background-color: #222222;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
  border-radius: 25px;

  &:hover {
    background-color: var(--color-primary-button);
    border-color: var(--color-primary-button);
  }

  &.active {
    background-color: var(--color-primary-button);
    border-color: var(--color-primary-button);
  }

  @include breakpoints.tablet-down {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }

  @include breakpoints.mobile-down {
    padding: 0.5rem 0.75rem;
    font-size: 0.75rem;
  }
}

.gallery-grid {
  display: grid;
  gap: 1rem;
  margin-top: 2rem;
  opacity: 0;
  transition: opacity 0.5s ease;

  &.is-visible {
    opacity: 1;
  }

  // Large Desktop (> 1200px)
  @include breakpoints.large-desktop {
    grid-template-columns: repeat(v-bind('props.layout.largeDesktop'), 1fr);
  }

  // Desktop (768px - 1200px)
  @include breakpoints.desktop {
    grid-template-columns: repeat(v-bind('props.layout.desktop'), 1fr);
  }

  // Tablet (576px - 768px)
  @include breakpoints.tablet {
    grid-template-columns: repeat(v-bind('props.layout.tablet'), 1fr);
    gap: 0.75rem;
  }

  // Mobile (< 576px)
  @include breakpoints.mobile {
    grid-template-columns: repeat(v-bind('props.layout.mobile'), 1fr);
    gap: 0.5rem;
  }
}

.gallery-item {
  position: relative;
  aspect-ratio: 3/4;
  overflow: hidden;
  border-radius: 8px;
  cursor: pointer;
  opacity: 0;
  transform: scale(0.3) translateX(-100px);
  animation: scaleUp 0.5s ease forwards;
  animation-play-state: paused;

  @for $i from 1 through 24 {
    &:nth-child(#{$i}) {
      animation-delay: #{$i * 0.1}s;
    }
  }

  .gallery-grid.is-visible & {
    animation-play-state: running;
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.2);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1;
  }

  &:hover {
    &::before {
      opacity: 1;
    }

    .gallery-image {
      transform: scale(1.1);
    }
  }
}

@keyframes scaleUp {
  0% {
    opacity: 0;
    transform: scale(0.3) translateX(-100px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateX(0);
  }
}

.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.load-more-btn {
  margin: 2rem auto 0;
  padding: 0.5rem 2rem;
  background: transparent;
  border: 1px solid #94a3b8;
  color: #fff;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: block;
  border-radius: 25px;

  &:hover {
    background-color: var(--color-primary-button);
    border-color: var(--color-primary-button);
  }

  @include breakpoints.mobile-down {
    padding: 0.5rem 1.5rem;
    font-size: 0.75rem;
    margin-top: 1.5rem;
  }
}
</style>
