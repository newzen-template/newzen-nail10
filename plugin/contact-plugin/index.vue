<template>
  <div
    v-if="block.status"
    :data-cms-bind="dataBinding"
    :style="{
      backgroundColor: block.background_color,
      backgroundImage: 'url(\'' + block.background_image + '\')',
    }"
    class="relative bg-cover bg-center flex flex-col justify-center items-center pb-[40px]"
  >
    <div class="container relative">
      <div class="text-center w-full">
        <h2
          v-if="block.title"
          class="custom_title_plugin"
          v-html="block.title"
        ></h2>
        <div
          v-if="block.sub_title"
          v-html="block.sub_title"
          class="custom_subtitle"
        ></div>
      </div>
      <div class="w-full flex flex-col justify-center items-center">
        <div
          :class="{
            'md:w-1/2 w-full': block.form_width === '1/2',
            'w-full': block.form_width === 'full',
          }"
        >
          <div
            v-if="block.form"
            class="grid w-full md:grid-cols-2 grid-cols-1 gap-x-[30px]"
          >
            <div
              v-for="(item, key) in block.form"
              :key="key"
              :class="{
                'col-span-1': item.width_fields === '1/2',
                'md:col-span-2': item.width_fields === 'full',
              }"
            >
              <div
                class="flex flex-col gap-[15px] justify-start items-start w-full mt-[15px]"
                v-if="item.fields === 'text'"
              >
                <div class="w-full flex flex-col relative">
                  <label
                    v-if="item.label"
                    :style="`color: ${block.color_text}`"
                    class="custom_label"
                    >{{ item.label
                    }}<span
                      class="text-red-500 ml-[3px] font-light text-[14px]"
                      v-if="item.status_error"
                      >*</span
                    ></label
                  >
                  <input
                    :type="item.field"
                    v-model="formState[key].value"
                    class="outline-none text-[14px] h-[36px] w-full py-[6px] px-[12px] bg-white border focus:outline-none"
                    :style="{
                      borderRadius: block.border ? `${block.border}px` : '0px',
                      color: block.color_text,
                    }"
                    :class="{
                      'border-red-500':
                        (item.status_error &&
                          fieldError[key] &&
                          !formState[key].value) === true,
                    }"
                    :placeholder="item.placehoder ? item.placehoder : ''"
                    style="box-shadow: 0 0 0 transparent"
                  />
                  <div
                    v-if="
                      item.status_error &&
                      fieldError[key] &&
                      !formState[key].value
                    "
                  >
                    <span class="text-red-500 text-[14px] font-medium">{{
                      item.error
                    }}</span>
                  </div>
                </div>
              </div>

              <div
                class="flex flex-col gap-[15px] justify-start items-start w-full mt-[15px]"
                v-if="item.fields === 'email'"
              >
                <div class="w-full flex flex-col relative">
                  <label
                    v-if="item.label"
                    :style="`color: ${block.color_text}`"
                    class="custom_label"
                    >{{ item.label
                    }}<span
                      class="text-red-500 ml-[3px] font-light text-[14px]"
                      v-if="item.status_error"
                      >*</span
                    ></label
                  >
                  <input
                    :type="item.field"
                    v-model="formState[key].value"
                    :class="{
                      'border-red-500':
                        item.status_error === true &&
                        ((fieldError[key] === true && !formState[key].value) ||
                          errorEmail === true),
                    }"
                    class="outline-none text-[14px] h-[36px] w-full py-[6px] px-[12px] bg-white border"
                    :style="{
                      borderRadius: block.border ? `${block.border}px` : '0px',
                      color: block.color_text,
                    }"
                    :placeholder="item.placehoder ? item.placehoder : ''"
                    style="box-shadow: 0 0 0 transparent"
                  />
                  <div v-if="item.status_error">
                    <div v-if="fieldError[key] && !formState[key].value">
                      <span class="text-red-500 text-[14px] font-medium">{{
                        item.error
                      }}</span>
                    </div>
                    <div v-else-if="errorEmail">
                      <span class="text-red-500 text-[14px] font-medium"
                        >Invalid email format.</span
                      >
                    </div>
                  </div>
                </div>
              </div>

              <div
                class="flex flex-col gap-[15px] justify-start items-start w-full mt-[15px]"
                v-if="item.fields === 'tel'"
              >
                <div class="w-full flex flex-col relative">
                  <label
                    v-if="item.label"
                    :style="`color: ${block.color_text}`"
                    class="custom_label"
                    >{{ item.label
                    }}<span
                      class="text-red-500 ml-[3px] font-light text-[14px]"
                      v-if="item.status_error"
                      >*</span
                    ></label
                  >
                  <input
                    :type="item.field"
                    v-model="formState[key].value"
                    @input="onPhoneNumberInput($event)"
                    maxlength="12"
                    :class="{
                      'border-red-500':
                        item.status_error === true &&
                        ((fieldError[key] === true && !formState[key].value) ||
                          errorPhone === true),
                    }"
                    class="outline-none text-[14px] h-[36px] w-full py-[6px] px-[12px] bg-white border"
                    :style="{
                      borderRadius: block.border ? `${block.border}px` : '0px',
                      color: block.color_text,
                    }"
                    :placeholder="item.placehoder ? item.placehoder : ''"
                    style="box-shadow: 0 0 0 transparent"
                  />
                  <div v-if="item.status_error">
                    <div v-if="fieldError[key] && !formState[key].value">
                      <span class="text-red-500 text-[14px] font-medium">{{
                        item.error
                      }}</span>
                    </div>
                    <div v-else-if="errorPhone">
                      <span class="text-red-500 text-[14px] font-medium"
                        >Invalid phone number format.</span
                      >
                    </div>
                  </div>
                </div>
              </div>

              <div
                class="flex flex-col gap-[15px] justify-start items-start w-full mt-[15px]"
                v-else-if="item.fields === 'textarea'"
              >
                <div class="w-full flex flex-col relative">
                  <label
                    v-if="item.label"
                    :style="`color: ${block.color_text}`"
                    class="custom_label"
                    >{{ item.label
                    }}<span
                      class="text-red-500 ml-[3px] font-light text-[14px]"
                      v-if="item.status_error"
                      >*</span
                    ></label
                  >
                  <textarea
                    rows="5"
                    v-model="formState[key].value"
                    :class="{
                      'border-red-500':
                        (item.status_error &&
                          fieldError[key] &&
                          !formState[key].value) === true,
                    }"
                    class="outline-none text-[14px] w-full py-[6px] px-[12px] bg-white border"
                    :style="{
                      borderRadius: block.border ? `${block.border}px` : '0px',
                      color: block.color_text,
                    }"
                    :placeholder="item.placehoder ? item.placehoder : ''"
                    style="box-shadow: 0 0 0 transparent"
                  ></textarea>
                  <div
                    v-if="
                      item.status_error &&
                      fieldError[key] &&
                      !formState[key].value
                    "
                  >
                    <span class="text-red-500 text-[14px] font-medium">{{
                      item.error
                    }}</span>
                  </div>
                </div>
              </div>

              <div
                class="flex flex-col justify-start items-start w-full mt-[15px]"
                v-else-if="item.fields === 'file'"
              >
                <label
                  v-if="item.label"
                  :style="`color: ${block.color_text}`"
                  class="custom_label"
                  >{{ item.label
                  }}<span
                    class="text-red-500 ml-[3px] font-light text-[14px]"
                    v-if="item.status_error"
                    >*</span
                  ></label
                >
                <div
                  @dragover.prevent
                  @drop.prevent="handleDropFiles($event, key)"
                  :class="{
                    'border-red-500':
                      (item.status_error &&
                        fieldError[key] &&
                        !formState[key].value) === true,
                  }"
                  class="w-full py-9 bg-gray-50 rounded-2xl border border-gray-300 gap-3 grid border-dashed"
                >
                  <div class="grid gap-1">
                    <svg
                      class="mx-auto"
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="File">
                        <path
                          id="icon"
                          d="M31.6497 10.6056L32.2476 10.0741L31.6497 10.6056ZM28.6559 7.23757L28.058 7.76907L28.058 7.76907L28.6559 7.23757ZM26.5356 5.29253L26.2079 6.02233L26.2079 6.02233L26.5356 5.29253ZM33.1161 12.5827L32.3683 12.867V12.867L33.1161 12.5827ZM31.8692 33.5355L32.4349 34.1012L31.8692 33.5355ZM24.231 11.4836L25.0157 11.3276L24.231 11.4836ZM26.85 14.1026L26.694 14.8872L26.85 14.1026ZM11.667 20.8667C11.2252 20.8667 10.867 21.2248 10.867 21.6667C10.867 22.1085 11.2252 22.4667 11.667 22.4667V20.8667ZM25.0003 22.4667C25.4422 22.4667 25.8003 22.1085 25.8003 21.6667C25.8003 21.2248 25.4422 20.8667 25.0003 20.8667V22.4667ZM11.667 25.8667C11.2252 25.8667 10.867 26.2248 10.867 26.6667C10.867 27.1085 11.2252 27.4667 11.667 27.4667V25.8667ZM20.0003 27.4667C20.4422 27.4667 20.8003 27.1085 20.8003 26.6667C20.8003 26.2248 20.4422 25.8667 20.0003 25.8667V27.4667ZM23.3337 34.2H16.667V35.8H23.3337V34.2ZM7.46699 25V15H5.86699V25H7.46699ZM32.5337 15.0347V25H34.1337V15.0347H32.5337ZM16.667 5.8H23.6732V4.2H16.667V5.8ZM23.6732 5.8C25.2185 5.8 25.7493 5.81639 26.2079 6.02233L26.8633 4.56274C26.0191 4.18361 25.0759 4.2 23.6732 4.2V5.8ZM29.2539 6.70608C28.322 5.65771 27.7076 4.94187 26.8633 4.56274L26.2079 6.02233C26.6665 6.22826 27.0314 6.6141 28.058 7.76907L29.2539 6.70608ZM34.1337 15.0347C34.1337 13.8411 34.1458 13.0399 33.8638 12.2984L32.3683 12.867C32.5216 13.2702 32.5337 13.7221 32.5337 15.0347H34.1337ZM31.0518 11.1371C31.9238 12.1181 32.215 12.4639 32.3683 12.867L33.8638 12.2984C33.5819 11.5569 33.0406 10.9662 32.2476 10.0741L31.0518 11.1371ZM16.667 34.2C14.2874 34.2 12.5831 34.1983 11.2872 34.0241C10.0144 33.8529 9.25596 33.5287 8.69714 32.9698L7.56577 34.1012C8.47142 35.0069 9.62375 35.4148 11.074 35.6098C12.5013 35.8017 14.3326 35.8 16.667 35.8V34.2ZM5.86699 25C5.86699 27.3344 5.86529 29.1657 6.05718 30.593C6.25217 32.0432 6.66012 33.1956 7.56577 34.1012L8.69714 32.9698C8.13833 32.411 7.81405 31.6526 7.64292 30.3798C7.46869 29.0839 7.46699 27.3796 7.46699 25H5.86699ZM23.3337 35.8C25.6681 35.8 27.4993 35.8017 28.9266 35.6098C30.3769 35.4148 31.5292 35.0069 32.4349 34.1012L31.3035 32.9698C30.7447 33.5287 29.9863 33.8529 28.7134 34.0241C27.4175 34.1983 25.7133 34.2 23.3337 34.2V35.8ZM32.5337 25C32.5337 27.3796 32.532 29.0839 32.3577 30.3798C32.1866 31.6526 31.8623 32.411 31.3035 32.9698L32.4349 34.1012C33.3405 33.1956 33.7485 32.0432 33.9435 30.593C34.1354 29.1657 34.1337 27.3344 34.1337 25H32.5337ZM7.46699 15C7.46699 12.6204 7.46869 10.9161 7.64292 9.62024C7.81405 8.34738 8.13833 7.58897 8.69714 7.03015L7.56577 5.89878C6.66012 6.80443 6.25217 7.95676 6.05718 9.40704C5.86529 10.8343 5.86699 12.6656 5.86699 15H7.46699ZM16.667 4.2C14.3326 4.2 12.5013 4.1983 11.074 4.39019C9.62375 4.58518 8.47142 4.99313 7.56577 5.89878L8.69714 7.03015C9.25596 6.47133 10.0144 6.14706 11.2872 5.97592C12.5831 5.8017 14.2874 5.8 16.667 5.8V4.2ZM23.367 5V10H24.967V5H23.367ZM28.3337 14.9667H33.3337V13.3667H28.3337V14.9667ZM23.367 10C23.367 10.7361 23.3631 11.221 23.4464 11.6397L25.0157 11.3276C24.9709 11.1023 24.967 10.8128 24.967 10H23.367ZM28.3337 13.3667C27.5209 13.3667 27.2313 13.3628 27.0061 13.318L26.694 14.8872C27.1127 14.9705 27.5976 14.9667 28.3337 14.9667V13.3667ZM23.4464 11.6397C23.7726 13.2794 25.0543 14.5611 26.694 14.8872L27.0061 13.318C26.0011 13.1181 25.2156 12.3325 25.0157 11.3276L23.4464 11.6397ZM11.667 22.4667H25.0003V20.8667H11.667V22.4667ZM11.667 27.4667H20.0003V25.8667H11.667V27.4667ZM32.2476 10.0741L29.2539 6.70608L28.058 7.76907L31.0518 11.1371L32.2476 10.0741Z"
                          :fill="block.button.background"
                        />
                      </g>
                    </svg>
                    <span class="text-center text-gray-400 text-xl leading-4">{{
                      item.placehoder
                    }}</span>
                  </div>
                  <div class="grid gap-2">
                    <span
                      class="text-center text-gray-900 text-sm font-medium leading-snug"
                      >Drag and Drop your file here or
                    </span>
                    <div class="flex items-center justify-center">
                      <label>
                        <input
                          id="fileInput"
                          accept="image/*,.pdf"
                          :type="item.fields"
                          multiple
                          @change="handleOnchaneTypeFile($event, key)"
                          hidden
                        />
                        <div
                          :style="{
                            borderRadius: block.button.border
                              ? `${block.button.border}px`
                              : '0px',
                            color: block.button.color,
                            backgroundColor:
                              block.button.variant === 'solid'
                                ? block.button.background
                                : 'transparent',
                            border: `2px solid ${block.button.background}`,
                          }"
                          class="flex w-28 h-9 px-2 flex-col bg-indigo-600 rounded-full shadow text-white text-xs font-semibold leading-4 items-center justify-center cursor-pointer focus:outline-none"
                        >
                          Choose File
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
                <div
                  v-if="
                    item.status_error &&
                    fieldError[key] &&
                    !formState[key].value
                  "
                >
                  <span class="text-red-500 text-[14px] font-medium">{{
                    item.error
                  }}</span>
                </div>
                <!-- list file complete-->
                <div v-if="listFilesComplete[key]" class="mt-[5px] w-full">
                  <div
                    v-for="(file, index) in listFilesComplete[key]?.value"
                    :key="index + file?.url"
                    class="w-full grid gap-1 mb-4"
                  >
                    <div class="flex items-center justify-between gap-2">
                      <div class="flex items-center gap-2">
                        <svg
                          class="mx-auto"
                          xmlns="http://www.w3.org/2000/svg"
                          width="40"
                          height="40"
                          viewBox="0 0 40 40"
                          fill="none"
                        >
                          <g id="File">
                            <path
                              id="icon"
                              d="M31.6497 10.6056L32.2476 10.0741L31.6497 10.6056ZM28.6559 7.23757L28.058 7.76907L28.058 7.76907L28.6559 7.23757ZM26.5356 5.29253L26.2079 6.02233L26.2079 6.02233L26.5356 5.29253ZM33.1161 12.5827L32.3683 12.867V12.867L33.1161 12.5827ZM31.8692 33.5355L32.4349 34.1012L31.8692 33.5355ZM24.231 11.4836L25.0157 11.3276L24.231 11.4836ZM26.85 14.1026L26.694 14.8872L26.85 14.1026ZM11.667 20.8667C11.2252 20.8667 10.867 21.2248 10.867 21.6667C10.867 22.1085 11.2252 22.4667 11.667 22.4667V20.8667ZM25.0003 22.4667C25.4422 22.4667 25.8003 22.1085 25.8003 21.6667C25.8003 21.2248 25.4422 20.8667 25.0003 20.8667V22.4667ZM11.667 25.8667C11.2252 25.8667 10.867 26.2248 10.867 26.6667C10.867 27.1085 11.2252 27.4667 11.667 27.4667V25.8667ZM20.0003 27.4667C20.4422 27.4667 20.8003 27.1085 20.8003 26.6667C20.8003 26.2248 20.4422 25.8667 20.0003 25.8667V27.4667ZM23.3337 34.2H16.667V35.8H23.3337V34.2ZM7.46699 25V15H5.86699V25H7.46699ZM32.5337 15.0347V25H34.1337V15.0347H32.5337ZM16.667 5.8H23.6732V4.2H16.667V5.8ZM23.6732 5.8C25.2185 5.8 25.7493 5.81639 26.2079 6.02233L26.8633 4.56274C26.0191 4.18361 25.0759 4.2 23.6732 4.2V5.8ZM29.2539 6.70608C28.322 5.65771 27.7076 4.94187 26.8633 4.56274L26.2079 6.02233C26.6665 6.22826 27.0314 6.6141 28.058 7.76907L29.2539 6.70608ZM34.1337 15.0347C34.1337 13.8411 34.1458 13.0399 33.8638 12.2984L32.3683 12.867C32.5216 13.2702 32.5337 13.7221 32.5337 15.0347H34.1337ZM31.0518 11.1371C31.9238 12.1181 32.215 12.4639 32.3683 12.867L33.8638 12.2984C33.5819 11.5569 33.0406 10.9662 32.2476 10.0741L31.0518 11.1371ZM16.667 34.2C14.2874 34.2 12.5831 34.1983 11.2872 34.0241C10.0144 33.8529 9.25596 33.5287 8.69714 32.9698L7.56577 34.1012C8.47142 35.0069 9.62375 35.4148 11.074 35.6098C12.5013 35.8017 14.3326 35.8 16.667 35.8V34.2ZM5.86699 25C5.86699 27.3344 5.86529 29.1657 6.05718 30.593C6.25217 32.0432 6.66012 33.1956 7.56577 34.1012L8.69714 32.9698C8.13833 32.411 7.81405 31.6526 7.64292 30.3798C7.46869 29.0839 7.46699 27.3796 7.46699 25H5.86699ZM23.3337 35.8C25.6681 35.8 27.4993 35.8017 28.9266 35.6098C30.3769 35.4148 31.5292 35.0069 32.4349 34.1012L31.3035 32.9698C30.7447 33.5287 29.9863 33.8529 28.7134 34.0241C27.4175 34.1983 25.7133 34.2 23.3337 34.2V35.8ZM32.5337 25C32.5337 27.3796 32.532 29.0839 32.3577 30.3798C32.1866 31.6526 31.8623 32.411 31.3035 32.9698L32.4349 34.1012C33.3405 33.1956 33.7485 32.0432 33.9435 30.593C34.1354 29.1657 34.1337 27.3344 34.1337 25H32.5337ZM7.46699 15C7.46699 12.6204 7.46869 10.9161 7.64292 9.62024C7.81405 8.34738 8.13833 7.58897 8.69714 7.03015L7.56577 5.89878C6.66012 6.80443 6.25217 7.95676 6.05718 9.40704C5.86529 10.8343 5.86699 12.6656 5.86699 15H7.46699ZM16.667 4.2C14.3326 4.2 12.5013 4.1983 11.074 4.39019C9.62375 4.58518 8.47142 4.99313 7.56577 5.89878L8.69714 7.03015C9.25596 6.47133 10.0144 6.14706 11.2872 5.97592C12.5831 5.8017 14.2874 5.8 16.667 5.8V4.2ZM23.367 5V10H24.967V5H23.367ZM28.3337 14.9667H33.3337V13.3667H28.3337V14.9667ZM23.367 10C23.367 10.7361 23.3631 11.221 23.4464 11.6397L25.0157 11.3276C24.9709 11.1023 24.967 10.8128 24.967 10H23.367ZM28.3337 13.3667C27.5209 13.3667 27.2313 13.3628 27.0061 13.318L26.694 14.8872C27.1127 14.9705 27.5976 14.9667 28.3337 14.9667V13.3667ZM23.4464 11.6397C23.7726 13.2794 25.0543 14.5611 26.694 14.8872L27.0061 13.318C26.0011 13.1181 25.2156 12.3325 25.0157 11.3276L23.4464 11.6397ZM11.667 22.4667H25.0003V20.8667H11.667V22.4667ZM11.667 27.4667H20.0003V25.8667H11.667V27.4667ZM32.2476 10.0741L29.2539 6.70608L28.058 7.76907L31.0518 11.1371L32.2476 10.0741Z"
                              :fill="block.button.background"
                            />
                          </g>
                        </svg>
                        <div class="grid gap-1">
                          <NuxtLink :to="file.url" target="_blank">
                            <span
                              class="text-gray-900 text-sm font-normal font-['Inter'] leading-snug"
                              >{{ file.name }}</span
                            >
                          </NuxtLink>
                          <span
                            class="text-gray-400 text-xs font-normal font-['Inter'] leading-[18px]"
                            >Upload complete
                          </span>
                        </div>
                      </div>
                      <div class="flex items-center gap-2">
                        <div class="relative">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="none"
                              stroke="#1ba300"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="1.5"
                              d="M9 12.75L11.25 15L15 9.75M21 12a9 9 0 1 1-18 0a9 9 0 0 1 18 0"
                            />
                          </svg>
                        </div>
                        <div
                          @click="RemoveFile(index, key, file.url)"
                          class="icon-cancel cursor-pointer"
                        >
                          <svg
                            class=""
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <g id="Upload 3">
                              <path
                                class="stroke-2 stroke-red-500"
                                id="icon"
                                d="M15 9L12 12M12 12L9 15M12 12L9 9M12 12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                stroke="#D1D5DB"
                                stroke-width="1.6"
                                stroke-linecap="round"
                              />
                            </g>
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div class="relative flex items-center gap-2.5 py-1.5 px-2">
                      <div
                        class="relative w-full h-2.5 overflow-hidden rounded-3xl bg-gray-100"
                      >
                        <div
                          role="progressbar"
                          aria-valuenow="100"
                          aria-valuemin="0"
                          aria-valuemax="100"
                          style="width: 100%"
                          class="flex h-full items-center transition-all duration-100 ease-linear justify-center bg-indigo-600 text-white rounded-3xl"
                        ></div>
                      </div>
                      <span
                        class="ml-2 bg-white rounded-full text-gray-800 text-xs font-medium flex justify-center items-center"
                        >100%</span
                      >
                    </div>
                  </div>
                </div>
                <!-- list file inprocess upload -->
                <div v-if="listFilesUpload[key]" class="mt-[5px] w-full">
                  <div
                    v-for="(file, index) in listFilesUpload[key].value"
                    :key="index + file?.size"
                    class="w-full grid gap-1 mb-4"
                  >
                    <div class="flex items-center justify-between gap-2">
                      <div class="flex items-center gap-2">
                        <svg
                          class="mx-auto"
                          xmlns="http://www.w3.org/2000/svg"
                          width="40"
                          height="40"
                          viewBox="0 0 40 40"
                          fill="none"
                        >
                          <g id="File">
                            <path
                              id="icon"
                              d="M31.6497 10.6056L32.2476 10.0741L31.6497 10.6056ZM28.6559 7.23757L28.058 7.76907L28.058 7.76907L28.6559 7.23757ZM26.5356 5.29253L26.2079 6.02233L26.2079 6.02233L26.5356 5.29253ZM33.1161 12.5827L32.3683 12.867V12.867L33.1161 12.5827ZM31.8692 33.5355L32.4349 34.1012L31.8692 33.5355ZM24.231 11.4836L25.0157 11.3276L24.231 11.4836ZM26.85 14.1026L26.694 14.8872L26.85 14.1026ZM11.667 20.8667C11.2252 20.8667 10.867 21.2248 10.867 21.6667C10.867 22.1085 11.2252 22.4667 11.667 22.4667V20.8667ZM25.0003 22.4667C25.4422 22.4667 25.8003 22.1085 25.8003 21.6667C25.8003 21.2248 25.4422 20.8667 25.0003 20.8667V22.4667ZM11.667 25.8667C11.2252 25.8667 10.867 26.2248 10.867 26.6667C10.867 27.1085 11.2252 27.4667 11.667 27.4667V25.8667ZM20.0003 27.4667C20.4422 27.4667 20.8003 27.1085 20.8003 26.6667C20.8003 26.2248 20.4422 25.8667 20.0003 25.8667V27.4667ZM23.3337 34.2H16.667V35.8H23.3337V34.2ZM7.46699 25V15H5.86699V25H7.46699ZM32.5337 15.0347V25H34.1337V15.0347H32.5337ZM16.667 5.8H23.6732V4.2H16.667V5.8ZM23.6732 5.8C25.2185 5.8 25.7493 5.81639 26.2079 6.02233L26.8633 4.56274C26.0191 4.18361 25.0759 4.2 23.6732 4.2V5.8ZM29.2539 6.70608C28.322 5.65771 27.7076 4.94187 26.8633 4.56274L26.2079 6.02233C26.6665 6.22826 27.0314 6.6141 28.058 7.76907L29.2539 6.70608ZM34.1337 15.0347C34.1337 13.8411 34.1458 13.0399 33.8638 12.2984L32.3683 12.867C32.5216 13.2702 32.5337 13.7221 32.5337 15.0347H34.1337ZM31.0518 11.1371C31.9238 12.1181 32.215 12.4639 32.3683 12.867L33.8638 12.2984C33.5819 11.5569 33.0406 10.9662 32.2476 10.0741L31.0518 11.1371ZM16.667 34.2C14.2874 34.2 12.5831 34.1983 11.2872 34.0241C10.0144 33.8529 9.25596 33.5287 8.69714 32.9698L7.56577 34.1012C8.47142 35.0069 9.62375 35.4148 11.074 35.6098C12.5013 35.8017 14.3326 35.8 16.667 35.8V34.2ZM5.86699 25C5.86699 27.3344 5.86529 29.1657 6.05718 30.593C6.25217 32.0432 6.66012 33.1956 7.56577 34.1012L8.69714 32.9698C8.13833 32.411 7.81405 31.6526 7.64292 30.3798C7.46869 29.0839 7.46699 27.3796 7.46699 25H5.86699ZM23.3337 35.8C25.6681 35.8 27.4993 35.8017 28.9266 35.6098C30.3769 35.4148 31.5292 35.0069 32.4349 34.1012L31.3035 32.9698C30.7447 33.5287 29.9863 33.8529 28.7134 34.0241C27.4175 34.1983 25.7133 34.2 23.3337 34.2V35.8ZM32.5337 25C32.5337 27.3796 32.532 29.0839 32.3577 30.3798C32.1866 31.6526 31.8623 32.411 31.3035 32.9698L32.4349 34.1012C33.3405 33.1956 33.7485 32.0432 33.9435 30.593C34.1354 29.1657 34.1337 27.3344 34.1337 25H32.5337ZM7.46699 15C7.46699 12.6204 7.46869 10.9161 7.64292 9.62024C7.81405 8.34738 8.13833 7.58897 8.69714 7.03015L7.56577 5.89878C6.66012 6.80443 6.25217 7.95676 6.05718 9.40704C5.86529 10.8343 5.86699 12.6656 5.86699 15H7.46699ZM16.667 4.2C14.3326 4.2 12.5013 4.1983 11.074 4.39019C9.62375 4.58518 8.47142 4.99313 7.56577 5.89878L8.69714 7.03015C9.25596 6.47133 10.0144 6.14706 11.2872 5.97592C12.5831 5.8017 14.2874 5.8 16.667 5.8V4.2ZM23.367 5V10H24.967V5H23.367ZM28.3337 14.9667H33.3337V13.3667H28.3337V14.9667ZM23.367 10C23.367 10.7361 23.3631 11.221 23.4464 11.6397L25.0157 11.3276C24.9709 11.1023 24.967 10.8128 24.967 10H23.367ZM28.3337 13.3667C27.5209 13.3667 27.2313 13.3628 27.0061 13.318L26.694 14.8872C27.1127 14.9705 27.5976 14.9667 28.3337 14.9667V13.3667ZM23.4464 11.6397C23.7726 13.2794 25.0543 14.5611 26.694 14.8872L27.0061 13.318C26.0011 13.1181 25.2156 12.3325 25.0157 11.3276L23.4464 11.6397ZM11.667 22.4667H25.0003V20.8667H11.667V22.4667ZM11.667 27.4667H20.0003V25.8667H11.667V27.4667ZM32.2476 10.0741L29.2539 6.70608L28.058 7.76907L31.0518 11.1371L32.2476 10.0741Z"
                              :fill="block.button.background"
                            />
                          </g>
                        </svg>
                        <div class="grid gap-1">
                          <span
                            class="text-gray-900 text-sm font-normal font-['Inter'] leading-snug"
                            >{{ file.name }}</span
                          >
                          <span
                            v-if="!statusUploadFile[key]?.value"
                            class="text-red-400 text-xs font-bold font-['Inter'] leading-[18px]"
                            >Upload Fail
                          </span>
                          <span
                            v-else
                            class="text-gray-400 text-xs font-normal font-['Inter'] leading-[18px]"
                            >Inprocess
                          </span>
                        </div>
                      </div>
                      <div class="flex items-center gap-2">
                        <svg
                          v-if="!statusUploadFile[key]?.value"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="#eb0000"
                            fill-rule="evenodd"
                            d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5zM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75m0 8.25a.75.75 0 1 0 0-1.5a.75.75 0 0 0 0 1.5"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <div v-else class="icon-cancel cursor-pointer">
                          <div
                            class="relative"
                            style="width: 24px; height: 24px"
                          >
                            <svg
                              class="size-full -rotate-90"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                            >
                              <!-- Background Circle -->
                              <circle
                                cx="12"
                                cy="12"
                                r="10"
                                fill="none"
                                class="stroke-current text-gray-200 dark:text-neutral-700"
                                stroke-width="2"
                              ></circle>
                              <!-- Progress Circle -->
                              <circle
                                cx="12"
                                cy="12"
                                r="10"
                                fill="none"
                                class="stroke-current text-blue-600 dark:text-blue-500"
                                stroke-width="2"
                                stroke-dasharray="62.83"
                                :stroke-dashoffset="
                                  62.83 *
                                  (1 -
                                    percentCompleteUploadFile[key].value / 100)
                                "
                                stroke-linecap="round"
                              ></circle>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      class="relative flex items-center justify-between gap-2.5 py-1.5"
                    >
                      <span
                        v-if="!statusUploadFile[key]?.value"
                        class="text-red-400 text-xl font-normal font-['Inter'] leading-[18px]"
                      >
                        'Only files with these MIME types are allowed: image/*,
                        application/pdf.'
                      </span>
                      <div
                        v-else
                        class="relative w-full h-2.5 overflow-hidden rounded-3xl bg-gray-100"
                      >
                        <div
                          role="progressbar"
                          aria-valuenow="100"
                          aria-valuemin="0"
                          aria-valuemax="100"
                          :style="{
                            width: percentCompleteUploadFile[key].value
                              ? `${percentCompleteUploadFile[key].value}%`
                              : '0%',
                          }"
                          class="flex h-full items-center transition-all duration-100 ease-linear justify-center bg-indigo-600 text-white rounded-3xl"
                        ></div>
                      </div>
                      <div class="flex justify-center items-center">
                        <span
                          v-if="statusUploadFile[key]?.value"
                          class="ml-2 bg-white rounded-full text-gray-800 text-xs font-medium flex justify-center items-center"
                          >{{
                            percentCompleteUploadFile[key].value
                              ? `${percentCompleteUploadFile[key].value}%`
                              : '0%'
                          }}</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="text-center w-full">
              <div class="text-2xl" :style="`color: ${block.color_text}`">
                Please add new form fields to display contact.
              </div>
            </div>
          </div>
          <div
            class="w-full flex"
            :class="{
              'justify-center': block.button.align_button === 'center',
              'justif-start': block.button.align_button === 'left',
              'justify-end': block.button.align_button === 'right',
            }"
          >
            <button
              @click="onSubmit"
              type="submit"
              class="custom_button_contact"
            >
              {{ block.button.text_button }}
            </button>
            <!-- <UButton :loading="isLoadingButton" @click="onSubmit" type="submit" class="custom_button_contact" :style="{
              borderRadius: block.button.border ? `${block.button.border}px` : '0px',
              color: block.button.color,
              backgroundColor: block.button.variant === 'solid' ? block.button.background : 'transparent',
              border: `2px solid ${block.button.background}`
            }" :class="{
              'w-auto': block.button.width_button === 'auto',
              'w-full': block.button.width_button === 'full',
              'w-1/2': block.button.width_button === '1/2',
              'w-1/3': block.button.width_button === '1/3',
              'w-1/4': block.button.width_button === '1/4'
            }">
              {{ block.button.text_button }}
            </UButton> -->
          </div>
        </div>
      </div>
    </div>
    <div
      class="popup-notification"
      v-if="showNotification"
      :class="{ active: showNotification === true }"
    >
      <div class="popup-content relative p-4">
        <div
          class="absolute top-2 right-2 w-[20px] h-[20px] cursor-pointer"
          @click="closePopup()"
        >
          <img src="./assets/images/close_icon.png" class="w-full h-full" />
        </div>
        <h2 :style="{ color: colorPopup }">{{ popupTitle }}</h2>
        <p :style="{ color: block.color_text }">{{ popupMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import dataJson from '../data.json';

interface Props {
  dataBinding: any;
  block: any;
}
console.log(dataJson);

const tenant_id = ref();
if (dataJson?.length > 0) {
  tenant_id.value = dataJson.find((item: any) => {
    console.log(item);
    return item.plugin_identity === 'com.newzen.contact-plugin';
  })?.data.tenant_id;
}

console.log(tenant_id);
const BASE_URL = 'https://contact-form-api.nz-service01.dtsmart.dev';
const props = defineProps<Props>();
const showNotification = ref(false);
const popupTitle = ref('');
const popupMessage = ref('');
const colorPopup = ref('');
const form_token = btoa(props.block.title);
const fieldError = reactive<any>({});
const formState = reactive<any>({});
const isLoadingButton = ref(false);
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const telRegex = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
const errorEmail = ref(false);
const errorPhone = ref(false);
const statusUploadFile = reactive<any>({});
const listFilesUpload = reactive<any>({});
const listFilesComplete = reactive<any>({});
const percentCompleteUploadFile = reactive<any>({});
const convertFormstate = () => {
  props.block.form.forEach((item: any, indexForm: number) => {
    formState[indexForm] = {
      value: null ? '' : '',
      type: item.fields,
      status_error: item.status_error,
      error: item.error,
    };
  });
};

function calculateMBtoBytes(mb: number) {
  const bytesPerMB = 1024 * 1024; // 1 MB = 1024 * 1024 bytes
  return mb * bytesPerMB;
}

const maxBytes = calculateMBtoBytes(15);

function ShowPopup(
  title: 'Success' | 'Error' | 'Warning',
  message: string,
  color: 'success' | 'error' | 'warning',
  active: boolean
) {
  popupTitle.value = title;
  popupMessage.value = message;
  if (color === 'success') {
    colorPopup.value = '#4BB543'; // Màu xanh lá cho success
  } else if (color === 'error') {
    colorPopup.value = '#FF0000'; // Màu đỏ cho error
  } else if (color === 'warning') {
    colorPopup.value = '#FFC107'; // Màu vàng cho warning
  }
  showNotification.value = active;
}

const handleOnchaneTypeFile = (event: any, key: any) => {
  const inputFile = event.target.files;
  const files = Array.from(inputFile);
  const sizeFiles = files.map((item) => item.size);
  const totalSizeFiles = sizeFiles.reduce(
    (accumulator, currentValue) => accumulator + currentValue
  );
  statusUploadFile[key] = {
    value: true,
  };
  percentCompleteUploadFile[key] = {
    value: 0,
  };
  if (totalSizeFiles > maxBytes) {
    ShowPopup(
      'Error',
      'PNG, JPG or PDF, smaller than 15MB dasds',
      'error',
      true
    );
    return;
  }
  const file = {};
  if (inputFile) {
    for (const key in inputFile) {
      if (inputFile[key] instanceof File) {
        file[key] = inputFile[key];
      }
    }
    UpdateListFiles(files, key);
  }
};

const handleDropFiles = (event: DragEvent, key: any) => {
  const files = event.dataTransfer?.files;
  const listFiles = Array.from(files);

  const sizeFiles = listFiles.map((item) => item.size);
  const totalSizeFiles = sizeFiles.reduce(
    (accumulator, currentValue) => accumulator + currentValue
  );
  if (totalSizeFiles > maxBytes) {
    ShowPopup(
      'Error',
      'PNG, JPG or PDF, smaller than 15MB dasds',
      'error',
      true
    );
    return;
  }
  statusUploadFile[key] = {
    value: true,
  };
  percentCompleteUploadFile[key] = {
    value: 0,
  };
  if (files) {
    UpdateListFiles(listFiles, key);
  }
};

function GetListUrlFormResponseFile(listFile: any) {
  const listUrl = listFile.map((item: any) => item.url);
  return listUrl;
}

function UpdateFilesComplete(listFile: any, key: number) {
  listFilesComplete[key] = {
    value: listFilesComplete[key]?.value
      ? [...listFilesComplete[key]?.value, listFile].flat()
      : listFile,
  };
}

function UpdateFormstateForFile(listUrl: any, key: number) {
  const values = [listUrl, ...formState[key].value].flat();

  const fileValue = {
    ...formState[key],
    value: listUrl.length > 0 ? values : '',
  };

  formState[key] = fileValue;
}

// function UpdateFormstateForFile(value: [], key: number) {
//   const listUrl = value.map((item) => item.url)

//   const values = [listUrl, ...formState[key].value].flat()

//   const fileValue = { ...formState[key], value: value.length > 0 ? values : '' }

//   listFilesComplete.value = [...listFilesComplete.value, value].flat()

//   formState[key] = fileValue;
// }

function UpdateListFiles(value: any[], key: any) {
  listFilesUpload[key] = {
    value: value.length > 0 ? value : [],
  };
  const formTest = {
    form_name: props.block.title,
    tenant_id: tenant_id.value,
    form_token: form_token,
  };

  const formData = new FormData();
  Object.entries(formTest).forEach(([key, value]) =>
    formData.append(`${key}`, value)
  );

  value.map((file, index) => {
    formData.append('file[]', file);
  });

  UploadFile(formData, key);
}

function ResetFileInput() {
  const inputFile = document.getElementById('fileInput');
  inputFile.value = '';
}

async function RemoveFile(index: number, key: any, url: string) {
  try {
    const body = {
      form_name: props.block.title,
      tenant_id: tenant_id.value,
      url: url,
      form_token: form_token,
    };

    ResetFileInput();

    formState[key].value.splice(index, 1);

    listFilesComplete[key]?.value.splice(index, 1);

    ShowPopup(
      'Success',
      'File has been successfully deleted!',
      'success',
      true
    );

    await $fetch(`${BASE_URL}/api/v1/end-user/storage/delete`, {
      method: 'POST',
      body: {
        ...body,
      },
    });
  } catch (error) {
    console.log('Error :', error);
  }
}

watch(
  () => props.block.form,
  () => {
    convertFormstate();
  },
  { deep: true, immediate: true }
);

const onPhoneNumberInput = (event: any) => {
  for (const key in formState) {
    if (formState.hasOwnProperty(key)) {
      const item = formState[key];
      if (item.type === 'tel') {
        let input = event.target.value.replace(/\D/g, '');
        // if (input.length > 0 && (input[0] === '0' || input[0] === '1')) {
        //   input = input.slice(1);
        // }
        const filteredInput = input
          .split('')
          .filter((char) => char >= '0' && char <= '9')
          .join('');
        let formattedInput;
        if (filteredInput.length > 6) {
          formattedInput = filteredInput.replace(
            /(\d{3})(\d{3})(\d{1,4})/,
            '$1-$2-$3'
          );
        } else if (filteredInput.length > 3) {
          formattedInput = filteredInput.replace(/(\d{3})(\d{1,3})/, '$1-$2');
        } else {
          formattedInput = filteredInput;
        }
        event.target.value = formattedInput;
        formState[key].value = formattedInput;
      }
    }
  }
};

const validateForm = () => {
  errorEmail.value = false;
  errorPhone.value = false;
  for (const key in formState) {
    if (formState.hasOwnProperty(key)) {
      const item = formState[key];
      if (item.status_error) {
        if (typeof item.value !== 'object' && !item.value.trim()) {
          fieldError[key] = true;
        } else {
          if (item.type === 'tel' && !telRegex.test(item.value.trim())) {
            fieldError[key] = true;
            errorPhone.value = true;
          } else if (
            item.type === 'email' &&
            !emailRegex.test(item.value.trim())
          ) {
            fieldError[key] = true;
            errorEmail.value = true;
          } else {
            fieldError[key] = false;
          }
        }
      }
    }
  }
  return !Object.values(fieldError).some((error) => error);
};

const clearFormData = () => {
  for (const key in formState) {
    if (formState.hasOwnProperty(key)) {
      formState[key].value = '';
      for (const keyListFiles in listFilesComplete) {
        delete listFilesComplete[keyListFiles];
      }
      errorEmail.value = false;
      errorPhone.value = false;
    }
  }
};

function UploadFile(formData: any, key: any) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        percentCompleteUploadFile[key] = {
          value: Math.round((event.loaded / event.total) * 100),
        };
      }
    };
    xhr.onload = function () {
      const response = xhr.response;
      if (xhr.status === 200) {
        statusUploadFile[key] = {
          value: response.status,
        };
        const listUrl = GetListUrlFormResponseFile(xhr.response.data.result);
        UpdateFilesComplete(xhr.response.data.result, key);
        UpdateFormstateForFile(listUrl, key);
        delete listFilesUpload[key];
        resolve();
      } else {
        statusUploadFile[key] = {
          value: response.status,
        };
        // UpdateFormstateForFile([], key)
        ShowPopup(
          'Error',
          'Only files with these MIME types are allowed: image`/*`, application/pdf.',
          'error',
          true
        );
        reject(new Error('Upload failed'));
      }
    };

    xhr.onerror = function () {
      statusUploadFile[key] = {
        value: false,
      };
      // UpdateFormstateForFile([], key)
      ShowPopup(
        'Error',
        'An error occurred during file upload. Please check the file format or size and try again. If the issue persists, contact support for assistance.',
        'error',
        true
      );
    };

    xhr.open('POST', `${BASE_URL}/api/v1/end-user/storage/upload`); // Thay URL với endpoint của bạn

    xhr.send(formData);

    console.log('xhr :', xhr);
  });
}

const onSubmit = async () => {
  try {
    isLoadingButton.value = true;
    if (!validateForm()) {
      ShowPopup('Error', 'Field entered is incorrect!', 'error', true);
      return;
    }
    const data_submission: any = [];
    for (const key in formState) {
      if (formState.hasOwnProperty(key)) {
        const item = formState[key];
        if (!Array.isArray(item.value)) {
          if (item.value.trim() || item.value.trim() === '') {
            data_submission.push({
              name: props.block.form[Number(key)].label,
              type: item.type,
              value: item.value ? item.value : '',
            });
          }
        } else {
          data_submission.push({
            name: props.block.form[Number(key)].label,
            type: item.type,
            value: item.value ? item.value : '',
          });
        }
      }
    }
    const body = {
      form_name: props.block.title,
      tenant_id: tenant_id.value,
      form_token: form_token,
      data_submission: data_submission,
    };
    await $fetch(
      'https://contact-form-api.nz-service01.dtsmart.dev/api/v1/form-submission',
      {
        method: 'POST',
        body: {
          ...body,
        },
      }
    );
    // clear data
    isLoadingButton.value = true;
    clearFormData();
    ShowPopup('Success', 'Submit Form Successfully!', 'success', true);
  } catch (error: any) {
    console.log(error);
    ShowPopup('Error', 'Submit Form Error!', 'error', true);
  } finally {
    isLoadingButton.value = false;
  }
};
const closePopup = () => {
  showNotification.value = false;
};
</script>

<style lang="scss" scoped>
.file-drop-area {
  border: 2px dashed #ccc;
  padding: 20px;
  text-align: center;
  cursor: pointer;
}

.file-drop-area:hover {
  background-color: #f9f9f9;
}

.popup-notification {
  display: none;
  z-index: 999999;
  visibility: visible;
  text-align: center;
  position: fixed;
  top: 10px;
  right: 10px;
  box-shadow: 1px 2px 3px #ccc;
  border-radius: 3px;
  background-color: #ffffff;
  transition: all 300ms linear 0ms;
}

.popup-notification.active {
  display: block;
  width: 300px;
  text-align: left;
}

.popup-content {
  h2 {
    font-size: 18px !important;
    text-align: left !important;
  }

  p {
    font-size: 14px !important;
    text-align: left !important;
  }
}

::v-deep .i-heroicons-arrow-path-20-solid {
  background-color: #ffffff !important;
  color: #ffffff !important;
}

.custom_title_plugin {
  font-weight: bold;
  color: #000;
  font-size: 32px !important;
  margin-bottom: 10px;
  padding-top: 40px;
}

.custom_subtitle {
  font-weight: 500;
  color: #000;
  font-size: 18px !important;
  margin-bottom: 20px;
}

.custom_button_contact {
  padding: 8px 26px;
  margin-bottom: 0;
  margin-top: 30px;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.6;
  text-transform: uppercase;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    opacity: 0.9;
    transition: all 0.3s ease-in-out;
  }
}

.custom_label {
  font-size: 14px;
  margin-bottom: 5px;
}

.border_error {
  border-color: red !important;
}

h1 {
  font-size: 32px;
}

h2 {
  font-size: 28px;
}

h3 {
  font-size: 24px;
}

h4 {
  font-size: 20px;
}

h5 {
  font-size: 18px;
}

h6 {
  font-size: 16px;
}
</style>
