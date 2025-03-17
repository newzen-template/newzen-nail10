<template>
  <section
    v-if="block.status"
    :style="{ background: block.background_color }"
    :data-cms-bind="dataBinding"
    class="py-4 menu-section"
  >
    <div class="container-md">
      <div class="row g-4">
        <!-- Left side - Image -->
        <div class="col-lg-6 text-center">
          <img
            :src="block.image"
            :alt="block.image_alt"
            class="img-fluid rounded shadow-sm menu-image"
          />
        </div>

        <!-- Right side - Content -->
        <div class="col-lg-6">
          <div
            v-for="(section, sectionIndex) in block.list_items"
            :key="sectionIndex"
            class="menu-section"
          >
            <h2 class="text-white mb-3 section-title">{{ section.name }}</h2>
            <p
              v-if="sectionIndex === 0"
              class="text-info mb-4 text-center text-secondary description"
            >
              {{ block.description }}
            </p>

            <div
              v-for="(item, itemIndex) in section.menu"
              :key="itemIndex"
              class="menu-item d-flex justify-content-between align-items-center mb-3"
            >
              <div class="text-white service-title">{{ item.title }}</div>
              <div class="d-flex align-items-center flex-grow-1">
                <div class="dotted-line border-bottom border-white mx-3"></div>
                <div class="text-white price">{{ item.price }}</div>
              </div>
            </div>
          </div>

          <!-- Note at bottom -->
          <p class="text-info fst-italic mt-4 text-center text-secondary note">
            {{ block.note }}
          </p>
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

defineProps<Props>();
</script>

<style lang="scss" scoped>
@use '@/assets/style/_breakpoints.scss' as breakpoints;

.menu-section {
  margin-bottom: 2rem;

  &:last-child {
    margin-bottom: 0;
  }
}

.section-title {
  font-size: 37px !important;
  text-align: center;
  font-weight: 700;
  text-shadow: 0px 0px 10px rgba(255, 255, 255, 0.5);

  @include breakpoints.desktop-down {
    font-size: 37px !important;
  }

  @include breakpoints.tablet-down {
    font-size: 30px !important;
  }

  @include breakpoints.mobile-down {
    font-size: 24px !important;
  }
}

.description {
  font-size: 18px;
  line-height: 1.6;

  @include breakpoints.desktop-down {
    font-size: 16px;
  }

  @include breakpoints.tablet-down {
    font-size: 15px;
  }

  @include breakpoints.mobile-down {
    font-size: 14px;
  }
}

.menu-item {
  .service-title {
    font-size: 16px;
    line-height: 1.6;

    @include breakpoints.desktop-down {
      font-size: 15px;
    }

    @include breakpoints.tablet-down {
      font-size: 14px;
    }

    @include breakpoints.mobile-down {
      font-size: 13px;
    }
  }

  .price {
    font-size: 16px;
    white-space: nowrap;

    @include breakpoints.desktop-down {
      font-size: 15px;
    }

    @include breakpoints.tablet-down {
      font-size: 14px;
    }

    @include breakpoints.mobile-down {
      font-size: 13px;
    }
  }

  .dotted-line {
    flex: 1;
    border-bottom: 1px dotted #94a3b8;
  }
}

.note {
  @include breakpoints.mobile {
    font-size: 13px;
    margin-top: 15px !important;
  }

  @include breakpoints.mobile-down {
    font-size: 12px;
  }
}

.mb-5 {
  @include breakpoints.mobile {
    margin-bottom: 20px !important;
  }
}
</style>
