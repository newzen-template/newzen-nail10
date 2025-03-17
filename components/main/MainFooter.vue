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
                  :to="item?.link"
                  :target="item?.is_new_tab ? '_blank' : '_self'"
                  class="social-link"
                >
                  <img
                    :src="item?.icon_name"
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
                  >
                    <NuxtLink
                      :to="item.link"
                      class="contact-link d-flex align-items-center gap-2"
                    >
                      <img
                        style="height: 20px; width: 20px"
                        v-if="item?.icon_name"
                        :src="item?.icon_name"
                        alt="icon"
                      />
                      <span style="font-size: 14px">{{ item.title }}</span>
                    </NuxtLink>
                  </div>
                </template>
                <template v-else-if="section.hours">
                  <div class="hours-info">
                    <p
                      v-for="(hour, hourIndex) in section.hours"
                      :key="hourIndex"
                      class="mb-2"
                    >
                      {{ hour }}
                    </p>
                  </div>
                </template>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3833.6492143608884!2d-78.6030766!3d35.9009568!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89ac5752d88602b3%3A0xf4b931a748e2dc2c!2sNAIL%20LAB%20-%20Luxury%20Nail%20Bar!5e1!3m2!1sen!2s!4v1741236418821!5m2!1sen!2s"
                class="w-100"
                height="300"
                :style="{ border: 0 }"
                :allowfullscreen="true"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        <!-- Map Container -->
      </div>
    </div>

    <!-- Copyright -->
    <div class="copyright py-3">
      <div class="container text-center">
        © 2024 NAIL LAB design by NailSoft • All Rights Reserved |
        <NuxtLink to="#" class="text-secondary">nail salon in 27615</NuxtLink> |
        <NuxtLink to="#" class="text-secondary"
          >best nail salon in 27615</NuxtLink
        >
      </div>
    </div>

    <!-- Back to top button -->
    <!-- <button
      v-show="isShowButtonToTop"
      @click="scrollToTop"
      class="btn-scroll-top"
    >
      <i class="fas fa-arrow-up"></i>
    </button> -->
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
  }

  .col-lg-4 {
    .map-container {
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

      @include breakpoints.desktop-down {
        height: 280px;
      }

      @include breakpoints.tablet-down {
        height: 250px;
      }

      @include breakpoints.mobile-down {
        width: 100%;
        height: 220px;
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
    padding: 15px 0;

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
