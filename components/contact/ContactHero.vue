<template>
  <section
    v-if="block.status"
    :style="{ background: block.background_color }"
    :data-cms-bind="dataBinding"
    class="py-4"
  >
    <div class="container-md">
      <div class="row">
        <!-- Left Column -->
        <div class="col-md-5 d-flex flex-column justify-content-center">
          <h6 style="font-size: 14px" class="text-main mb-3">NAIL LAB</h6>
          <h2 class="title mb-3">
            {{ block.title }}
          </h2>

          <!-- Map Info -->
          <div
            class="contact-item d-flex align-items-start mb-4"
            v-for="item in block.menu_items"
            :key="item.label"
          >
            <NuxtLink to="/" class="contact-content"
              >{{ item.label }}
              <img
                width="20"
                height="20"
                :src="item.image"
                alt="icon"
                class="contact-image"
              />
              <span class="contact-text">
                {{ item.content }}
              </span>
            </NuxtLink>
          </div>
        </div>
        <div class="col-md-7">
          <div v-html="block.map"></div>
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

<style scoped>
.title {
  font-size: 37px;
  font-weight: 700;
  text-shadow: 0px 0px 10px rgba(255, 255, 255, 0.53);
  color: #fff;
  position: relative;
  padding-bottom: 15px;
}

.title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  box-shadow: 0 0.3px 0 #fff;
  background: transparent;
}

.contact-item {
  transition: all 0.3s ease;
}

.contact-item:hover {
  cursor: pointer;
}

.icon-wrapper {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  background-color: #1c1e2a;
  border-radius: 50%;
}

.icon-wrapper :deep(svg) {
  color: var(--color-secondary-text);
}

.contact-content {
  display: flex;
  align-items: center;
  gap: 10px;
}

.contact-title {
  font-size: 21px;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #fff;
  text-decoration: none;
  transition: color 0.3s ease;
}

.contact-title:hover {
  color: #74b1c1;
}

.contact-text {
  font-size: 16px;
  color: var(--color-secondary-text);
  margin: 0;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .title {
    font-size: 2rem;
  }

  .contact-item {
    margin-bottom: 2rem;
  }
}
</style>
