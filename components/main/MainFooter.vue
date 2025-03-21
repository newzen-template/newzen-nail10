<template>
  <footer>
    <div class="footer-content py-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 mb-4 mb-lg-0">
            <NuxtImg
              :src="footerData.logo"
              :alt="footerData.logo_alt"
              style="width: 150px; margin-bottom: 12px"
            />
            <p class="description">
              {{ footerData.description }}
            </p>
            <div class="social-links d-flex gap-2 mt-4">
              <div
                v-for="(item, itemIndex) in footerData.social"
                :key="itemIndex"
              >
                <NuxtLink
                  itemprop="url"
                  :to="item?.link"
                  :target="item?.is_new_tab ? '_blank' : '_self'"
                  class="social-link"
                >
                  <img
                    :src="item.image"
                    alt="icon"
                    style="height: 20px; width: 20px"
                  />
                </NuxtLink>
              </div>
            </div>
          </div>

          <div class="col-lg-4 d-flex flex-column gap-3">
            <div class="contact-grid">
              <div
                v-for="(section, index) in footerData.contact"
                :key="index"
                class="contact-item d-flex flex-column gap-1"
              >
                <h5 class="section-title" style="font-size: 21px; color: #fff">
                  {{ section.label }}
                </h5>
                <template v-if="section.list_items">
                  <div
                    class="contact-info"
                    v-for="(item, itemIndex) in section.list_items"
                    :key="itemIndex"
                    v-bind="
                      item?.item_prop?.includes('streetAddress') &&
                      handleRenderAttribute
                    "
                  >
                    <NuxtLink
                      itemprop="url"
                      :to="item.link"
                      class="contact-link d-flex align-items-center gap-2"
                    >
                      <img
                        style="height: 20px; width: 20px"
                        :src="item.image"
                        alt="icon"
                      />
                      <span
                        :itemprop="item?.item_prop"
                        style="font-size: 14px"
                        >{{ item.title }}</span
                      >
                    </NuxtLink>
                  </div>
                </template>
              </div>
              <div class="contact-item d-flex flex-column gap-1">
                <h5 class="section-title" style="font-size: 21px; color: #fff">
                  {{ footerData.hour.label }}
                </h5>
                <template v-if="footerData.hour.list_hour">
                  <div
                    class="contact-info"
                    v-for="(item, itemIndex) in footerData.hour.list_hour"
                    :key="itemIndex"
                    itemprop="openingHours"
                    :content="item.label + ' ' + item.time"
                  >
                    <NuxtLink
                      itemprop="url"
                      :to="item.link"
                      class="contact-link d-flex align-items-center gap-2"
                    >
                      <span style="font-size: 14px"
                        >{{ item.label }} {{ item.time }}</span
                      >
                    </NuxtLink>
                  </div>
                </template>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div
              class="map-container"
              :style="{ backgroundColor: footerData.background_copyright }"
            >
              <div v-html="footerData.map"></div>
            </div>
          </div>
        </div>

        <!-- Map Container -->
      </div>
      <div class="decor-footer">
        <NuxtImg
          :src="footerData?.decor_footer || ' '"
          :alt="footerData?.decor_footer || ' '"
        />
      </div>
    </div>

    <!-- Copyright -->
    <div class="container">
      <div class="copyright" v-html="footerData.text_bottom_footer"></div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import footer from '@/data/footer.json';
import langSetting from '@/data/lang-setting.json';

const route = useRoute();
let langDefault: any = langSetting.find((lang: any) => lang.isDefault === true);
let footerData: any = ref(footer.en);

const handleRenderAttribute = computed(() => {
  return {
    itemprop: 'address',
    itemscope: true,
    itemtype: 'http://schema.org/PostalAddress',
  };
});

watch(
  () => route.path,
  () => {
    for (const key of Object.keys(footer)) {
      if (route.path.includes(key)) {
        footerData.value = (footer as any)[key];
        break;
      } else {
        footerData.value = (footer as any)[langDefault.value];
      }
    }
  },
  { immediate: true }
);

const isShowButtonToTop = ref(false);

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

onMounted(() => {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      isShowButtonToTop.value = true;
    } else {
      isShowButtonToTop.value = false;
    }
  });
});

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0, rootMargin: '0px 0px 300px 0px' }
  );

  const items = document.querySelectorAll('.animation_up, .animation_in');

  items.forEach((item) => {
    observer.observe(item);
  });
});
</script>

<style lang="scss" scoped>
@use '@/assets/style/_breakpoints.scss' as breakpoints;

footer {
  background: #1a1e25;
  color: var(--color-secondary-text) !important;

  .footer-content {
    position: relative;
    padding: 60px 0;

    @include breakpoints.desktop-down {
      padding: 50px 0;
    }

    @include breakpoints.tablet-down {
      padding: 40px 0;
    }

    @include breakpoints.mobile-down {
      padding: 30px 0;
    }

    .decor-footer {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .col-lg-4 {
    .map-container {
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      height: 100%;

      @include breakpoints.desktop-down {
        height: 280px;
      }

      @include breakpoints.mobile-down {
        width: 100%;
      }
    }

    .description {
      line-height: 1.8;
      font-size: 0.95rem;

      @include breakpoints.desktop-down {
        font-size: 14px;
      }

      @include breakpoints.tablet-down {
        font-size: 13px;
      }

      @include breakpoints.mobile-down {
        font-size: 13px;
        text-align: center;
      }
    }

    .section-title {
      font-size: 1.25rem;
      font-weight: 600;
      text-transform: uppercase;

      @include breakpoints.desktop-down {
        font-size: 20px;
      }

      @include breakpoints.tablet-down {
        font-size: 18px;
      }

      @include breakpoints.mobile-down {
        font-size: 16px !important;
      }
    }

    @include breakpoints.tablet-down {
      margin-bottom: 30px;
    }

    @include breakpoints.mobile-down {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 24px;
    }
  }

  .contact-grid {
    @include breakpoints.mobile-down {
      width: 100%;
      margin-bottom: 12px;
    }
  }

  .contact-item {
    @include breakpoints.mobile-down {
      text-align: left;
    }
  }

  .social-links {
    .social-link {
      width: 36px;
      height: 36px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: var(--color-secondary-text);
      font-size: 0.9rem;
      transition: all 0.3s ease;

      &:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: translateY(-2px);
      }

      @include breakpoints.tablet-down {
        width: 32px;
        height: 32px;
      }

      @include breakpoints.mobile-down {
        width: 30px;
        height: 30px;
      }
    }

    @include breakpoints.mobile-down {
      justify-content: center;
    }
  }

  .contact-info {
    .contact-link {
      text-decoration: none;
      transition: color 0.3s ease;
      cursor: pointer;
      color: var(--color-secondary-text);

      &:hover {
        color: #fff;
      }

      @include breakpoints.mobile-down {
        justify-content: flex-start;
        font-size: 13px;

        .icon {
          width: 18px;
          height: 18px;
          margin-right: 6px;
        }
      }
    }

    .address p {
      margin-bottom: 0.5rem;
    }

    @include breakpoints.mobile-down {
      margin-bottom: 6px;
    }
  }

  .hours-info {
    p {
      margin-bottom: 0.5rem;

      @include breakpoints.mobile-down {
        margin-bottom: 6px;
        font-size: 13px;
      }
    }

    @include breakpoints.mobile-down {
      text-align: left;
    }
  }

  .copyright {
    background: rgba(0, 0, 0, 0.3);
    font-size: 0.9rem;
    padding: 40px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;

    a {
      text-decoration: none;
      transition: opacity 0.3s ease;
      color: var(--color-secondary-text);

      &:hover {
        opacity: 0.8;
        color: #fff;
      }
    }

    @include breakpoints.mobile-down {
      font-size: 0.8rem;
      padding: 12px 0;
    }
  }

  .btn-scroll-top {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background: #007bff;
    color: #fff;
    border: none;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 1000;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    }
  }
}
</style>
