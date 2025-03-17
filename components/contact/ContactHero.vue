<template>
  <section
    v-if="block.status"
    :style="{ background: block.background_color }"
    :data-cms-bind="dataBinding"
    class="py-4 contact-section"
  >
    <div class="container-md">
      <div class="row">
        <!-- Left Column -->
        <div class="col-md-5 d-flex flex-column justify-content-center">
          <h6 style="font-size: 14px" class="text-primary mb-3">NAIL LAB</h6>
          <h2 class="title mb-3">
            {{ block.title }}
          </h2>

          <!-- Map Info -->
          <div class="contact-item d-flex align-items-start mb-4">
            <div class="icon-wrapper">
              <Icon size="32" name="i-ic-baseline-location-on" />
            </div>
            <div class="contact-content">
              <NuxtLink to="/" class="contact-title">Map</NuxtLink to="">
              <p class="contact-text">
                {{ block.address }}
              </p>
            </div>
          </div>

          <!-- Email Info -->
          <div class="contact-item d-flex align-items-start mb-4">
            <div class="icon-wrapper">
              <Icon size="32" name="i-ic-baseline-mail" />
            </div>
            <div class="contact-content">
              <NuxtLink to="/" class="contact-title">Email us</NuxtLink to="">
              <p class="contact-text">
                {{ block.mail }}
              </p>
            </div>
          </div>

          <!-- Phone Info -->
          <div class="contact-item d-flex align-items-start">
            <div class="icon-wrapper">
              <Icon size="32" name="i-ic-baseline-phone" />
            </div>
            <div class="contact-content">
              <NuxtLink to="/" class="contact-title">Phone</NuxtLink to="">
              <p class="contact-text">
                {{ block.phone }}
              </p>
            </div>
          </div>
        </div>

        <!-- Right Column -->
        <div class="col-md-7">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d30669.193637388995!2d-78.603077!3d35.900957!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89ac5752d88602b3%3A0xf4b931a748e2dc2c!2sNAIL%20LAB%20-%20Luxury%20Nail%20Bar!5e1!3m2!1sen!2sus!4v1741341715935!5m2!1sen!2sus"
            width="100%"
            height="485"
            style="border: 0"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
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
.contact-section {
  background-color: #1a1d21 !important;
  color: #fff;
}

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
  transform: translateX(5px);
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
  flex: 1;
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

.contact-text a {
  color: #fff;
  text-decoration: none;
  transition: color 0.3s ease;
}

.contact-text a:hover {
  color: #74b1c1;
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
