<!-- eslint-disable vue/html-self-closing -->
<template>
  <header
    class="main-header w-100 d-flex align-items-center"
    :style="{ backgroundColor: headerData.background_color }"
  >
    <div class="container h-100">
      <nav
        class="navbar d-flex h-100 justify-content-between align-items-center flex-nowrap"
      >
        <NuxtLink itemprop="url" to="/" class="navbar-brand">
          <img
            itemprop="logo"
            :src="headerData.logo"
            :alt="headerData.logo_alt"
            class="logo"
          />
        </NuxtLink>

        <!-- Desktop Menu -->
      <div class="menu-desktop d-none d-lg-block w-100">
          <ul class="d-flex list-unstyled m-0">
            <li
              v-for="(header, index) of headerData.items"
              :key="index"
              style="transition: all 0.3s ease"
              itemprop="name"
              class="item-elementor"
            >
              <NuxtLink
                :to="header.link"
                :target="header.open_new_tab ? '_blank' : ''"
                itemprop="url"
                :class="{
                  'text-main': route.path === header.link,
                  'text-white': route.path !== header.link,
                }"
              >
                {{ header.text }}
              </NuxtLink>
            </li>
            <li v-if="LANGUAGES.length > 1" class="ml-2 list-none">
              <USelect
                v-model="country"
                :options="countries"
                option-attribute="name"
              />
            </li>
          </ul>
        </div>

        <div class="d-flex align-items-center gap-3">
          <!-- Mobile Menu Button -->
          <Button
            :is_show="checkMobile"
            size="24"
            class="menu-toggle phone-button d-lg-none d-block"
            @click="toggleMobileMenu"
            :class="{ 'is-active': isMobileMenuOpen }"
          >
            <i v-if="!isMobileMenuOpen" class="bi bi-list"></i>
            <i v-else class="bi bi-x-lg"></i>
          </Button>

          <Button
            :is_show="headerData.button.is_show"
            color="white"
            :itemprop="'telephone'"
            class="phone-button"
          >
            <i
              style="font-size: 16px !important"
              class="bi bi-telephone-fill me-2"
            ></i>
            <span itemprop="telephone">{{
              isMobileView ? headerData.button.text : ''
            }}</span>
          </Button>
        </div>

        <!-- Mobile Menu -->
        <Transition name="menu-slide">
          <div
            v-show="isMobileMenuOpen"
            class="mobile-menu-overlay"
            @click="toggleMobileMenu"
          >
            <div
              class="mobile-menu"
              :class="{ show: isMobileMenuOpen }"
              @click.stop
            >
              <ul class="mobile-menu__list">
                <li
                  v-for="(header, index) of headerData.items"
                  :key="index"
                  class="mobile-menu__item"
                >
                  <NuxtLink
                    itemprop="url"
                    :to="header.link"
                    :target="header.open_new_tab ? '_blank' : ''"
                    class="mobile-menu__link"
                    :class="{
                      'mobile-menu__link--active': route.path === header.link,
                    }"
                    @click="toggleMobileMenu"
                  >
                    {{ header.text }}
                  </NuxtLink>
                </li>
                <li v-if="LANGUAGES.length > 1" class="mobile-menu__item">
                  <USelect
                    v-model="country"
                    :options="countries"
                    option-attribute="name"
                  />
                </li>
              </ul>
            </div>
          </div>
        </Transition>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import header from '@/data/header.json';
import LANGUAGES from '@/data/lang-setting.json';
import Button from '~/common/Button.vue';

const isOpen = ref(false);
const route = useRoute();
const router = useRouter();
const checkMobile = ref(false);
const blogStore = useCounterStore();
const search = ref(blogStore.title);

// i18n
const countries = LANGUAGES.map((lang: any) => {
  return {
    name: lang.label,
    value: lang.value,
    enable: lang.isDefault,
  };
});
const langDefault: any = countries.find((lang: any) => lang.enable);

const updateCountry = (newValue: string) => {
  country.value = newValue;
};
const langCurrent = ref(langDefault.value);

const homeUrl = ref('/');
const headerData: any = ref(header.en);
console.log(headerData.value);

function renderHeader() {
  for (const key of Object.keys(header)) {
    if (country.value.includes(key)) {
      langCurrent.value = key;
      headerData.value = (header as any)[key];
      break;
    } else {
      headerData.value = (header as any)[langDefault.value];
    }
  }
}

for (const key of Object.keys(header)) {
  if (route.path.includes(key) || route.path.includes(`${key}/`)) {
    langCurrent.value = key;
    headerData.value = (header as any)[key];
    break;
  } else {
    headerData.value = (header as any)[langDefault.value];
  }
}

const country = ref(langCurrent.value);

const isSearchMobile = ref(false);

const handleSubmit = () => {
  if (search.value === '') {
    return;
  }

  if (isSearchMobile) {
    isSearchMobile.value = false;
  }

  blogStore.searchActions(search.value);
  navigateTo({
    path: `${blogStore.lang}blog`,
    query: { search: search.value },
  });
};

watch(
  () => [country, langCurrent],
  () => {
    renderHeader();
    const params = route.query;

    if (country.value) {
      if (country.value === langDefault.value) {
        router.push({ path: '/', query: params });
        homeUrl.value = '/';
      } else {
        router.push({ path: `/${country.value}`, query: params });
        homeUrl.value = `/${country.value}`;
      }
    } else {
      homeUrl.value = '/';
      router.push({ path: '/' });
    }
  },
  { deep: true }
);

watch(
  () => [country, langCurrent],
  () => {
    renderHeader();
    if (country.value) {
      if (country.value === langDefault.value) {
        blogStore.setLang(`/`);
      } else {
        blogStore.setLang(`/${country.value}/`);
      }
    }
  },
  { deep: true, immediate: true }
);

const isActiveMenuItem = (link: any) => {
  return route.path === link;
};
const handleMenu = () => {
  isOpen.value = !isOpen.value;
};

watch(
  () => route.fullPath,
  () => {
    isOpen.value = false;
  }
);

const isMobileView = ref(false);

const checkScreenSize = () => {
  checkMobile.value = window.innerWidth < 1024;
  isMobileView.value = window.innerWidth > 1024;
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});

const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};
</script>

<style lang="scss" scoped>
@use '@/assets/style/_breakpoints.scss' as breakpoints;

.logo {
  height: 40px;
}

.item-elementor {
  cursor: pointer;

  a {
    font-size: 15px;
    margin: 0 17.5px;
    font-weight: 500;

    &:hover {
      color: var(--color-primary-text) !important;
      transition: 0.1s ease-in-out;
    }
  }
}

.menu-toggle {
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
  }

  &.is-active {
    background-color: rgba(255, 255, 255, 0.2);
  }
}

.phone-button {
  @include breakpoints.tablet-down {
    width: 40px !important;
    height: 40px !important;
    padding: 0 !important;
    min-width: unset !important;
    border-radius: 50% !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;

    &:hover {
      background: rgba(255, 255, 255, 0.2) !important;
    }

    i {
      margin: 0 !important;
      font-size: 20px !important;
    }
  }
}

.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1050;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  @include breakpoints.tablet-down {
    opacity: 1;
    visibility: visible;
  }
}

.mobile-menu {
  position: fixed;
  top: 58px;
  left: 0;
  width: 100%;
  background-color: white;
  transform-origin: top right;
  transform: scaleY(0);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  max-height: calc(100vh - 58px);
  overflow-y: auto;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;

  &.show {
    transform: scaleY(1);
  }

  &__list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  &__item {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    @for $i from 1 through 10 {
      &:nth-child(#{$i}) {
        transition-delay: #{$i * 0.05}s;
      }
    }

    &:last-child {
      border-bottom: none;
    }
  }

  &.show &__item {
    opacity: 1;
    transform: translateY(0);
  }

  &__link {
    display: block;
    padding: 0.75rem 1rem;
    color: #212529;
    text-decoration: none;
    transition: all 0.15s ease-in-out;
    border-radius: 8px;

    &:hover {
      color: var(--color-primary-text);
      background-color: rgba(var(--color-primary-rgb), 0.05);
    }

    &--active {
      color: white;
      background-color: var(--color-primary-text);
      font-weight: 500;
    }
  }
}

.menu-slide-enter-active,
.menu-slide-leave-active {
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  .mobile-menu {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
}

.menu-slide-enter-from,
.menu-slide-leave-to {
  opacity: 0;

  .mobile-menu {
    transform: scaleY(0);
  }
}

.menu-slide-enter-to,
.menu-slide-leave-from {
  opacity: 1;

  .mobile-menu {
    transform: scaleY(1);
  }
}

.menu-desktop {
  @include breakpoints.desktop-up {
    flex: 1;
    margin-left: auto;

    ul {
      justify-content: flex-end;
      align-items: center;
    }
  }
}

.navbar {
  @include breakpoints.desktop-up {
    padding: 1rem 0;
    gap: 2rem;
  }
}

.navbar-brand {
  @include breakpoints.desktop-up {
    flex: 0 0 auto;
  }
}
</style>
