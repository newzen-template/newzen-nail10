<template>
  <section
    v-if="block.status"
    :style="{ background: block?.background_color }"
    :data-cms-bind="dataBinding"
  >
    <div class="container">
      <div v-if="block.is_show_image">
        <NuxtImg
          class="image-menu"
          :src="block?.image || ' '"
          :alt="block?.image_alt || ' '"
          style="width: 100%; border-radius: 25px"
        />
      </div>
      <h2 class="text-center text-white title-menu">
        {{ block.title }}
      </h2>

      <div class="menu-container">
        <div
          v-for="(item, index) in block.menu"
          :key="index"
          class="menu-item animation-item"
        >
          <div class="d-flex justify-content-between align-items-start mb-2">
            <h3 class="menu-title text-white mb-0">{{ item.name }}</h3>
            <span class="flex-grow-1 border-dotted"></span>
            <div class="menu-title text-end">
              <div class="price text-white">${{ item.price }}</div>
              <!-- <div v-if="item.gel_polish_price" class="gel-polish text-white">
                Gel Polish ${{ item.gel_polish_price }}
              </div> -->
            </div>
          </div>
          <div
            v-if="block.is_show_image"
            class="menu-description text-secondary"
          >
            <div
              class="menu-description-item ckeditor-custom"
              v-html="item?.description || ' '"
            ></div>
          </div>
        </div>
      </div>
      <div
        v-if="block.is_show_image"
        class="text-secondary"
        style="font-size: 16px; font-style: italic"
      >
        <p
          class="mb-1 description-menu ckeditor-custom"
          v-html="block?.description || ' '"
        ></p>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';

interface Props {
  dataBinding: any;
  block: any;
}

const props = defineProps<Props>();

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  document.querySelectorAll('.animation-item').forEach((item) => {
    observer.observe(item);
  });
});
</script>

<style lang="scss" scoped>
@use '@/assets/style/_breakpoints.scss' as breakpoints;

.title-menu {
  padding: 1rem;
  font-size: 37px;
  font-weight: 700;
  text-shadow: 0px 0px 10px rgba(255, 255, 255, 0.5);

  @include breakpoints.tablet-down {
    font-size: 24px;
  }

  @include breakpoints.mobile-down {
    font-size: 24px;
  }
}

.image-menu {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 25px;

  @include breakpoints.tablet-down {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @include breakpoints.mobile-down {
    width: 100%;
    height: 360px;
    object-fit: cover;
  }
}

.menu-container {
  column-count: 2;
  column-gap: 2rem;

  @include breakpoints.tablet-down {
    column-count: 1;
  }
}

.menu-item {
  padding: 0.25rem 0;
  margin-bottom: 0.5rem;
  break-inside: avoid;
  -webkit-column-break-inside: avoid;
  page-break-inside: avoid;

  @include breakpoints.tablet-down {
    padding: 0.5rem 0;
  }
}

.menu-title {
  font-size: 16px;
  font-weight: 500;

  @include breakpoints.mobile {
    font-size: 14px;
  }
}

.border-dotted {
  margin: 0 10px;
  border-bottom: 1px dotted white;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  align-self: center;
}

.price {
  font-size: 16px;
  font-weight: 500;

  @include breakpoints.mobile {
    font-size: 14px;
  }
}

.gel-polish {
  font-size: 0.9rem;
  opacity: 0.8;
}

.menu-description {
  font-size: 14px;
  line-height: 1.4;

  @include breakpoints.mobile {
    font-size: 12px;
  }

  ul {
    margin: 0;
    padding: 0;

    li {
      position: relative;
      padding-left: 1rem;
      margin: 0;

      &::before {
        content: '-';
        position: absolute;
        left: 0;
      }
    }
  }
}

.description-menu {
  font-size: 14px;

  @include breakpoints.mobile {
    font-size: 12px;
  }
}

.animation-item {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease-out;

  &.animate {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
