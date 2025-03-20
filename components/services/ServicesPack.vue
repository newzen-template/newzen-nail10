<template>
  <section
    v-if="block.status"
    :style="{ background: block.background_color }"
    :data-cms-bind="dataBinding"
  >
    <div
      class="container-md position-relative"
      itemscope
      itemtype="http://schema.org/Service"
    >
      <meta itemprop="serviceType" :content="businessType" />
      <div class="row g-4">
        <!-- Manicure Column -->
        <div
          class="col-md-6"
          style="z-index: 10"
          v-for="(menuItem, index) in block.menu"
          :key="index"
        >
          <div class="menu-section text-white">
            <div class="menu-image mb-4">
              <NuxtImg
                itemprop="image"
                :src="menuItem.image"
                :alt="menuItem.image_alt"
                class="img-fluid w-100 rounded"
                style="height: 200px; object-fit: cover"
              />
            </div>
            <div
              style="
                background-color: #1c1e2a;
                border-radius: 15px;
                padding: 8px 10px;
              "
            >
              <h2 itemprop="name" class="text-center mb-3 title-menu">
                {{ menuItem.title }}
              </h2>

              <div class="menu-items">
                <div
                  v-for="(item, idx) in menuItem.list_items"
                  :key="idx"
                  class="menu-item mb-4"
                  :style="{
                    'margin-bottom':
                      idx === menuItem.list_items.length - 1 ? '0' : '1.5rem',
                  }"
                >
                  <div
                    class="d-flex justify-content-between align-items-baseline"
                  >
                    <h5 class="item-name mb-0">
                      {{ item.title }}
                    </h5>
                    <span class="dotted-line"></span>
                    <div
                      class="price-section"
                      style="display: flex; gap: 8px; align-items: baseline"
                    >
                      <span class="price">${{ item.price }}</span>
                      <!-- <span v-if="item.gel_price" class="gel-price">
                        Gel Polish ${{ item.gel_price }}
                      </span> -->
                    </div>
                  </div>
                  <p v-if="item.description" class="description mt-2">
                    {{ item.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="decor-image" v-if="block?.decor_image">
        <NuxtImg
          style="width: 100%; height: 100%; filter: blur(50px)"
          :src="block?.decor_image || ' '"
          :alt="block?.decor_image || ' '"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import SITE from '@/data/site.json';

const dataSite: any = ref(SITE);
const firstKey = Object.keys(SITE)[0];
const lengthType = dataSite.value[firstKey].business_type.split('/').length;
const businessType =
  dataSite.value[firstKey].business_type.split('/')[lengthType - 1];

interface Props {
  dataBinding: any;
  block: any;
}

defineProps<Props>();
</script>

<style lang="scss" scoped>
@use '@/assets/style/_breakpoints.scss' as breakpoints;

.title-menu {
  font-size: 37px;
  font-weight: 700;
  text-shadow: 0px 0px 10px rgba(255, 255, 255, 0.5);
  letter-spacing: 2px;
  color: white;

  @include breakpoints.tablet-down {
    font-size: 24px;
  }

  @include breakpoints.mobile-down {
    font-size: 24px;
  }
}
.menu-section {
  border-radius: 20px;
  color: #fff;
}

.menu-items {
  position: relative;
}

.item-name {
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  margin: 0;
  padding-right: 15px;
  position: relative;
  z-index: 1;

  @include breakpoints.tablet-down {
    font-size: 15px;
  }

  @include breakpoints.mobile {
    font-size: 14px;
  }
}

.price-section {
  white-space: nowrap;
  padding-left: 15px;
  position: relative;
  z-index: 1;

  @include breakpoints.mobile {
    text-align: right;
  }
}

.price {
  font-size: 16px;
  font-weight: 500;
  color: white;

  @include breakpoints.tablet-down {
    font-size: 15px;
  }

  @include breakpoints.mobile {
    font-size: 14px;
  }
}

.gel-price {
  font-size: 16px;
  font-weight: 500;
  color: white;
  opacity: 0.9;

  @include breakpoints.tablet-down {
    font-size: 15px;
  }

  @include breakpoints.mobile {
    font-size: 14px;
  }
}

.description {
  color: var(--color-secondary-text);
  font-size: 15px;
  line-height: 1.6;
  margin-top: 8px;

  @include breakpoints.tablet-down {
    font-size: 14px;
  }

  @include breakpoints.mobile {
    font-size: 13px;
    line-height: 1.5;
  }
}

.d-flex.justify-content-between {
  position: relative;
  width: 100%;

  @include breakpoints.mobile {
    flex-direction: row;
    align-items: baseline;
    gap: 10px;
  }
}

.dotted-line {
  flex: 1;
  border-bottom: 1px dotted rgba(255, 255, 255, 0.3);
  align-self: center;
}

.menu-section {
  @include breakpoints.tablet-down {
    h2 {
      font-size: 32px;
    }
  }

  @include breakpoints.mobile {
    h2 {
      font-size: 24px;
      margin-bottom: 1.5rem;
    }
  }
}
.decor-image {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@media (prefers-color-scheme: dark) {
  .menu-section {
    background: rgba(0, 0, 0, 0.2);
  }
}
</style>
