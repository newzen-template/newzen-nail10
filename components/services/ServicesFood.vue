<template>
  <section
    v-if="block.status"
    class="text-whites py-3"
    :style="{ background: block.background_color }"
    :data-cms-bind="dataBinding"
  >
    <div class="container-md" itemscope itemtype="http://schema.org/Service">
      <meta itemprop="serviceType" :content="businessType" />
      <h2
        class="text-center text-white display-4 mb-3 section-title"
        itemprop="name"
      >
        {{ block.title }}
      </h2>
      <div class="row g-4">
        <div
          v-for="(item, index) in block.menu"
          :key="index"
          :class="{
            'col-md-4 mb-2':
              index !== block.menu.length - 1 || !block.is_two_column,
            'col-md-8 mb-2':
              index === block.menu.length - 1 && block.is_two_column,
          }"
        >
          <div class="menu-card">
            <div class="menu-header">
              <h3>{{ item.name }}</h3>
            </div>
            <div
              class="menu-content ckeditor-custom"
              v-html="item.description"
            ></div>
          </div>
        </div>
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
  is_two_column?: boolean;
}

defineProps<Props>();
</script>

<style lang="scss" scoped>
@use '@/assets/style/_breakpoints.scss' as breakpoints;

.section-title {
  font-size: 37px !important;
  font-weight: 700;
  text-shadow: 0px 0px 10px rgba(255, 255, 255, 0.5);

  @include breakpoints.desktop-down {
    font-size: 34px !important;
  }

  @include breakpoints.tablet-down {
    font-size: 30px !important;
  }

  @include breakpoints.mobile-down {
    font-size: 24px !important;
  }
}

.menu-card {
  border: none;
  border-radius: 12px;
  overflow: hidden;
  background-color: #191b27;
  padding-bottom: 0.5rem;
  display: flex;
  flex-direction: column;
  height: 100%;

  @include breakpoints.tablet-down {
    border-radius: 20px;
  }

  @include breakpoints.mobile-down {
    border-radius: 16px;
  }
}

.menu-header {
  margin: 1rem;
  background: #94a3b8;
  min-height: 27px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;

  @include breakpoints.tablet-down {
    margin: 0.75rem;
    min-height: 24px;
  }

  @include breakpoints.mobile-down {
    margin: 0.5rem;
    min-height: 22px;
  }

  h3 {
    margin: 0;
    padding: 0;
    font-size: 21px !important;
    color: #fff;
    text-transform: uppercase;

    @include breakpoints.desktop-down {
      font-size: 19px !important;
    }

    @include breakpoints.tablet-down {
      font-size: 18px !important;
    }

    @include breakpoints.mobile-down {
      font-size: 16px !important;
    }
  }
}

.menu-content {
  padding: 0 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  color: var(--color-secondary-text);
  font-size: 15px;

  @include breakpoints.tablet-down {
    padding: 0 1.25rem;
    gap: 1.25rem;
  }

  @include breakpoints.mobile-down {
    padding: 0 1rem;
    gap: 1rem;
  }

  :deep(p, span) {
    line-height: 2rem;
    font-size: 16px;
    margin: 0;

    @include breakpoints.desktop-down {
      font-size: 15px;
      line-height: 1.9;
    }

    @include breakpoints.tablet-down {
      font-size: 14px;
      line-height: 1.8;
    }

    @include breakpoints.mobile-down {
      font-size: 13px;
      line-height: 1.7;
    }
  }
}

// Responsive grid adjustments
@include breakpoints.tablet-down {
  .col-md-4 {
    width: 50%;
  }

  .col-md-8 {
    width: 100%;
  }
}

@include breakpoints.mobile-down {
  .col-md-4,
  .col-md-8 {
    width: 100%;
  }
}
</style>
