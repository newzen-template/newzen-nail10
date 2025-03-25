<template>
  <section
    v-if="block.status"
    :style="{
      background: block.background_color,
      backgroundImage: block.background_image
        ? `url('${block.background_image}')`
        : 'none',
    }"
    :data-cms-bind="dataBinding"
    class="bg-cover bg-center"
    style="padding: 100px 0"
  >
    <div class="container-md">
      <div class="row">
        <!-- Left Column -->
        <div class="col-md-6 d-flex flex-column justify-content-center">
          <h6
            style="font-size: 14px"
            class="text-main mb-3 ckeditor-custom"
            v-html="block.title"
          ></h6>
          <h2 class="title mb-3 ckeditor-custom" v-html="block.sub_title"></h2>
          <!-- Map Info -->
          <div
            class="contact-item d-flex align-items-start mb-4"
            v-for="item in block.menu_items"
            :key="item.content"
          >
            <NuxtLink to="/" class="contact-content">
              <img
                v-if="item.image"
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

        <!-- Right Column - Contact Form -->
        <div class="col-md-6">
          <div
            class="card shadow-sm border-0"
            :style="{
              backgroundColor: block.form?.background_color,
              color: block.form?.color,
              padding: '45px',
            }"
          >
            <h2 v-if="block.form?.title" class="mb-3">
              {{ block.form.title }}
            </h2>
            <div v-if="block.form" class="row g-3">
              <div
                v-for="(item, key) in block.form.list_fields"
                :key="key"
                :class="{
                  'col-md-6': item.width_fields === '1/2',
                  'col-12': item.width_fields === 'full',
                }"
              >
                <!-- Text Field -->
                <div class="form-group" v-if="item.fields === 'text'">
                  <label class="custom_label">
                    {{ item.label
                    }}<span
                      class="text-danger ms-1 fw-light fs-6"
                      v-if="item.status_error"
                    ></span>
                  </label>
                  <input
                    :type="item.field"
                    v-model="formState[key].value"
                    :class="{
                      'border-danger':
                        (item.status_error &&
                          fieldError[key] &&
                          !formState[key].value) === true,
                    }"
                    class="form-control"
                    :placeholder="item.placehoder ? item.placehoder : ''"
                  />
                  <div
                    v-if="
                      item.status_error &&
                      fieldError[key] &&
                      !formState[key].value
                    "
                    class="form-text text-danger fw-medium"
                  >
                    {{ item.error }}
                  </div>
                </div>

                <!-- Email Field -->
                <div class="form-group" v-if="item.fields === 'email'">
                  <label class="custom_label">
                    {{ item.label
                    }}<span
                      class="text-danger ms-1 fw-light fs-6"
                      v-if="item.status_error"
                    ></span>
                  </label>
                  <input
                    type="email"
                    v-model="formState[key].value"
                    :class="{
                      'border-danger':
                        item.status_error === true &&
                        ((fieldError[key] === true && !formState[key].value) ||
                          errorEmail === true),
                    }"
                    class="form-control"
                    :placeholder="item.placehoder ? item.placehoder : ''"
                  />
                  <div v-if="item.status_error">
                    <div
                      v-if="fieldError[key] && !formState[key].value"
                      class="form-text text-danger fw-medium"
                    >
                      {{ item.error }}
                    </div>
                    <div
                      v-else-if="errorEmail"
                      class="form-text text-danger fw-medium"
                    >
                      Invalid email format.
                    </div>
                  </div>
                </div>

                <!-- Phone Field -->
                <div class="form-group" v-if="item.fields === 'tel'">
                  <label class="custom_label">
                    {{ item.label
                    }}<span
                      class="text-danger ms-1 fw-light fs-6"
                      v-if="item.status_error"
                    ></span>
                  </label>
                  <input
                    type="tel"
                    v-model="formState[key].value"
                    @input="onPhoneNumberInput($event)"
                    maxlength="12"
                    :class="{
                      'border-danger':
                        item.status_error === true &&
                        ((fieldError[key] === true && !formState[key].value) ||
                          errorPhone === true),
                    }"
                    class="form-control"
                    :placeholder="item.placehoder ? item.placehoder : ''"
                  />
                  <div v-if="item.status_error">
                    <div
                      v-if="fieldError[key] && !formState[key].value"
                      class="form-text text-danger fw-medium"
                    >
                      {{ item.error }}
                    </div>
                    <div
                      v-else-if="errorPhone"
                      class="form-text text-danger fw-medium"
                    >
                      Invalid phone number format.
                    </div>
                  </div>
                </div>

                <!-- Textarea Field -->
                <div class="form-group" v-if="item.fields === 'textarea'">
                  <label class="custom_label">
                    {{ item.label
                    }}<span
                      class="text-danger ms-1 fw-light fs-6"
                      v-if="item.status_error"
                    ></span>
                  </label>
                  <textarea
                    rows="5"
                    v-model="formState[key].value"
                    :class="{
                      'border-danger':
                        (item.status_error &&
                          fieldError[key] &&
                          !formState[key].value) === true,
                    }"
                    class="form-control"
                    :placeholder="item.placehoder ? item.placehoder : ''"
                  ></textarea>
                  <div
                    v-if="
                      item.status_error &&
                      fieldError[key] &&
                      !formState[key].value
                    "
                    class="form-text text-danger fw-medium"
                  >
                    {{ item.error }}
                  </div>
                </div>

                <!-- File Field -->
                <div class="form-group" v-if="item.fields === 'file'">
                  <label class="custom_label">
                    {{ item.label
                    }}<span
                      class="text-danger ms-1 fw-light fs-6"
                      v-if="item.status_error"
                    ></span>
                  </label>
                  <div
                    @dragover.prevent
                    @drop.prevent="handleDropFiles($event, key)"
                    :class="{
                      'border-danger':
                        (item.status_error &&
                          fieldError[key] &&
                          !formState[key].value) === true,
                    }"
                    class="p-3 bg-light rounded border border-secondary border-dashed d-grid gap-2"
                  >
                    <div class="text-center">
                      <p class="text-secondary mb-1">
                        PNG, JPG or PDF, smaller than 15MB
                      </p>
                      <p class="text-dark small mb-2">
                        Drag and Drop your file here or
                      </p>
                      <div class="d-flex justify-content-center">
                        <label>
                          <input
                            id="fileInput"
                            accept="image/*,.pdf"
                            type="file"
                            multiple
                            @change="handleFileChange($event, key)"
                            hidden
                          />
                          <div class="btn btn-primary btn-sm rounded-pill px-3">
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
                    class="form-text text-danger fw-medium"
                  >
                    {{ item.error }}
                  </div>

                  <!-- Completed Files -->
                  <div v-if="listFilesComplete[key]" class="mt-2 w-100">
                    <div
                      v-for="(file, index) in listFilesComplete[key]?.value"
                      :key="index + file?.url"
                      class="mb-2 border-bottom pb-2"
                    >
                      <div
                        class="d-flex justify-content-between align-items-center gap-2"
                      >
                        <div class="d-flex align-items-center gap-2">
                          <i class="bi bi-file-earmark fs-4"></i>
                          <div>
                            <p class="mb-0 small">{{ file.name }}</p>
                            <small class="text-secondary"
                              >Upload complete</small
                            >
                          </div>
                        </div>
                        <div class="d-flex align-items-center gap-2">
                          <div class="position-relative">
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
                          <button
                            @click="RemoveFile(index, key, file.url)"
                            class="btn btn-sm btn-outline-danger rounded-circle"
                            aria-label="Remove file"
                          >
                            <i class="bi bi-x"></i>
                          </button>
                        </div>
                      </div>
                      <div
                        class="position-relative d-flex align-items-center gap-2 py-1"
                      >
                        <div class="w-100 h-6 overflow-hidden rounded bg-light">
                          <div
                            role="progressbar"
                            aria-valuenow="100"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style="width: 100%"
                            class="h-100 d-flex align-items-center transition-all bg-success text-white rounded"
                          ></div>
                        </div>
                        <span class="ms-2 bg-white rounded text-dark small"
                          >100%</span
                        >
                      </div>
                    </div>
                  </div>

                  <!-- Files In Upload Process -->
                  <div v-if="listFilesUpload[key]" class="mt-2 w-100">
                    <div
                      v-for="(file, index) in listFilesUpload[key].value"
                      :key="index + file?.size"
                      class="mb-2 border-bottom pb-2"
                    >
                      <div
                        class="d-flex justify-content-between align-items-center gap-2"
                      >
                        <div class="d-flex align-items-center gap-2">
                          <i class="bi bi-file-earmark fs-4"></i>
                          <div>
                            <p class="mb-0 small">{{ file.name }}</p>
                            <small
                              v-if="!statusUploadFile[key]?.value"
                              class="text-danger fw-bold"
                              >Upload Failed</small
                            >
                            <small v-else class="text-secondary"
                              >In process</small
                            >
                          </div>
                        </div>
                        <div class="d-flex align-items-center gap-2">
                          <div v-if="!statusUploadFile[key]?.value">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="#eb0000"
                                fill-rule="evenodd"
                                d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5zM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75zm0 8.25a.75.75 0 1 0 0-1.5a.75.75 0 0 0 0 1.5z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </div>
                          <div
                            v-else
                            class="position-relative"
                            style="width: 24px; height: 24px"
                          >
                            <svg
                              class="w-100 h-100"
                              style="transform: rotate(-90deg)"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                cx="12"
                                cy="12"
                                r="10"
                                fill="none"
                                stroke="#e9ecef"
                                stroke-width="2"
                              ></circle>
                              <circle
                                cx="12"
                                cy="12"
                                r="10"
                                fill="none"
                                stroke="#0d6efd"
                                stroke-width="2"
                                stroke-dasharray="62.83"
                                :stroke-dashoffset="
                                  62.83 *
                                  (1 -
                                    percentCompleteUploadFile[key]?.value / 100)
                                "
                                stroke-linecap="round"
                              ></circle>
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div
                        class="position-relative d-flex align-items-center justify-content-between gap-2 py-1"
                      >
                        <div
                          v-if="!statusUploadFile[key]?.value"
                          class="text-danger"
                        >
                          Only files with these MIME types are allowed: image/*,
                          application/pdf.
                        </div>
                        <div
                          v-else
                          class="w-100 h-6 overflow-hidden rounded bg-light"
                        >
                          <div
                            role="progressbar"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            :style="{
                              width: percentCompleteUploadFile[key]?.value
                                ? `${percentCompleteUploadFile[key].value}%`
                                : '0%',
                            }"
                            class="h-100 d-flex align-items-center transition-all bg-primary text-white rounded"
                          ></div>
                        </div>
                        <div
                          v-if="statusUploadFile[key]?.value"
                          class="d-flex justify-content-center align-items-center"
                        >
                          <span class="ms-2 bg-white rounded text-dark small">
                            {{
                              percentCompleteUploadFile[key]?.value
                                ? `${percentCompleteUploadFile[key].value}%`
                                : '0%'
                            }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-4">
              <button
                @click="onSubmit"
                type="submit"
                class="btn rounded-pill px-4 py-2 w-100"
                :style="{
                  backgroundColor: block.form?.background_color_btn,
                  color: block.form?.color_btn,
                }"
              >
                {{ block.button?.text_button || 'Send Message' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Notification popup -->
    <div
      class="popup-notification"
      v-if="showNotification"
      :class="{ active: showNotification === true }"
    >
      <div class="popup-content position-relative p-4">
        <div
          class="position-absolute top-0 end-0 m-2 cursor-pointer"
          @click="closePopup()"
        >
          <i class="bi bi-x"></i>
        </div>
        <h2 :style="{ color: colorPopup }">{{ popupTitle }}</h2>
        <p>{{ popupMessage }}</p>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, reactive, watch } from 'vue';
import dataJson from '@/plugin/data.json';

interface Props {
  dataBinding: any;
  block: any;
}

const props = defineProps<Props>();

// Tenant ID for form submissions
const tenant_id = ref();
if (dataJson?.length > 0) {
  tenant_id.value = dataJson.find((item: any) => {
    return item.plugin_identity === 'com.newzen.contact-plugin';
  })?.data.tenant_id;
}

// Base URL for API calls
const BASE_URL = 'https://contact-form-api.nz-service01.dtsmart.dev';
console.log(props.block.form.list_fields);

// Form token
const form_token = btoa(props.block.title || 'Contact Form');

// UI state
const showNotification = ref(false);
const popupTitle = ref('');
const popupMessage = ref('');
const colorPopup = ref('');
const isLoadingButton = ref(false);
let popupTimeout: NodeJS.Timeout | null = null;

// Email and phone validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const telRegex = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
const errorEmail = ref(false);
const errorPhone = ref(false);

// Form state and validation
const fieldError = reactive<Record<string, boolean>>({});
const formState = reactive<Record<string, any>>({});

// File handling state
const statusUploadFile = reactive<Record<string, any>>({});
const listFilesUpload = reactive<Record<string, any>>({});
const listFilesComplete = reactive<Record<string, any>>({});
const percentCompleteUploadFile = reactive<Record<string, any>>({});

// Initialize form state
const convertFormstate = () => {
  if (props.block.form?.list_fields) {
    props.block.form.list_fields.forEach((item: any, indexForm: number) => {
      formState[indexForm] = {
        value: '',
        type: item.fields,
        status_error: item.status_error,
        error: item.error,
      };
    });
  }
};

// Calculate max file size (15MB)
function calculateMBtoBytes(mb: number) {
  const bytesPerMB = 1024 * 1024; // 1 MB = 1024 * 1024 bytes
  return mb * bytesPerMB;
}

const maxBytes = calculateMBtoBytes(15);

// Show popup notification
function showPopup(
  title: 'Success' | 'Error' | 'Warning',
  message: string,
  type: 'success' | 'error' | 'warning',
  active: boolean
) {
  // Clear any existing timeout
  if (popupTimeout) {
    clearTimeout(popupTimeout);
  }

  popupTitle.value = title;
  popupMessage.value = message;

  if (type === 'success') {
    colorPopup.value = '#4BB543';
  } else if (type === 'error') {
    colorPopup.value = '#FF0000';
  } else if (type === 'warning') {
    colorPopup.value = '#FFC107';
  }

  showNotification.value = active;

  // Set new timeout to close popup after 3 seconds
  popupTimeout = setTimeout(() => {
    closePopup();
  }, 3000);
}

// File handling functions
const handleFileChange = (event: Event, key: number) => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    const files = Array.from(target.files) as File[];
    const sizeFiles = files.map((item) => item.size);
    const totalSizeFiles = sizeFiles.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );

    statusUploadFile[key] = { value: true };
    percentCompleteUploadFile[key] = { value: 0 };

    if (totalSizeFiles > maxBytes) {
      showPopup(
        'Error',
        'Files must be smaller than 15MB in total',
        'error',
        true
      );
      return;
    }

    updateListFiles(files, key);
  }
};

const handleDropFiles = (event: DragEvent, key: number) => {
  if (event.dataTransfer?.files) {
    const files = Array.from(event.dataTransfer.files) as File[];
    const sizeFiles = files.map((item) => item.size);
    const totalSizeFiles = sizeFiles.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );

    if (totalSizeFiles > maxBytes) {
      showPopup(
        'Error',
        'Files must be smaller than 15MB in total',
        'error',
        true
      );
      return;
    }

    statusUploadFile[key] = { value: true };
    percentCompleteUploadFile[key] = { value: 0 };

    updateListFiles(files, key);
  }
};

function getListUrlFromResponseFile(listFile: any[]) {
  return listFile.map((item: any) => item.url);
}

function updateFilesComplete(listFile: any[], key: number) {
  listFilesComplete[key] = {
    value: listFilesComplete[key]?.value
      ? [...listFilesComplete[key].value, ...listFile]
      : listFile,
  };
}

function updateFormstateForFile(listUrl: string[], key: number) {
  const values = formState[key].value
    ? [...formState[key].value, ...listUrl]
    : listUrl;

  formState[key] = {
    ...formState[key],
    value: listUrl.length > 0 ? values : '',
  };
}

function updateListFiles(files: File[], key: number) {
  listFilesUpload[key] = {
    value: files.length > 0 ? files : [],
  };

  const formData = new FormData();
  formData.append('form_name', props.block.title || 'Contact Form');
  formData.append('tenant_id', tenant_id.value || '');
  formData.append('form_token', form_token);

  files.forEach((file) => {
    formData.append('file[]', file);
  });

  uploadFile(formData, key);
}

function resetFileInput() {
  const inputFile = document.getElementById('fileInput');
  if (inputFile) {
    (inputFile as HTMLInputElement).value = '';
  }
}

async function RemoveFile(index: number, key: number, url: string) {
  try {
    const body = {
      form_name: props.block.title || 'Contact Form',
      tenant_id: tenant_id.value,
      url: url,
      form_token: form_token,
    };

    resetFileInput();

    if (formState[key].value && Array.isArray(formState[key].value)) {
      formState[key].value.splice(index, 1);
    }

    if (listFilesComplete[key]?.value) {
      listFilesComplete[key].value.splice(index, 1);
    }

    showPopup(
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
    console.error('Error removing file:', error);
    showPopup(
      'Error',
      'Failed to delete the file. Please try again.',
      'error',
      true
    );
  }
}

// Phone number formatting
const onPhoneNumberInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  let input = target.value.replace(/\D/g, '');
  const filteredInput = input
    .split('')
    .filter((char: string) => char >= '0' && char <= '9')
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

  target.value = formattedInput;

  // Update the correct formState entry
  for (const key in formState) {
    if (formState[key].type === 'tel') {
      formState[key].value = formattedInput;
      break;
    }
  }
};

// Form validation
const validateForm = () => {
  errorEmail.value = false;
  errorPhone.value = false;

  for (const key in formState) {
    if (formState.hasOwnProperty(key)) {
      const item = formState[key];
      if (item?.status_error) {
        // Skip validation for file fields
        if (item.type === 'file') {
          fieldError[key] = false;
          continue;
        }

        if (
          typeof item.value !== 'object' &&
          (!item.value || !item.value.trim())
        ) {
          fieldError[key] = true;
        } else {
          if (item.type === 'tel' && !telRegex.test(item.value.trim())) {
            fieldError[key] = false;
            errorPhone.value = true;
          } else if (
            item.type === 'email' &&
            !emailRegex.test(item.value.trim())
          ) {
            fieldError[key] = false;
            errorEmail.value = true;
          } else {
            fieldError[key] = false;
          }
        }
      }
    }
  }

  return (
    !Object.values(fieldError).some((error) => error) &&
    !errorEmail.value &&
    !errorPhone.value
  );
};

// Clear form data
const clearFormData = () => {
  for (const key in formState) {
    if (formState.hasOwnProperty(key)) {
      formState[key] = {
        ...formState[key],
        value: '',
      };
    }
  }

  // Clear file data
  for (const key in listFilesComplete) {
    delete listFilesComplete[key];
  }

  errorEmail.value = false;
  errorPhone.value = false;
};

// Upload file function with progress tracking
function uploadFile(formData: FormData, key: number) {
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
        const listUrl = getListUrlFromResponseFile(xhr.response.data.result);
        updateFilesComplete(xhr.response.data.result, key);
        updateFormstateForFile(listUrl, key);
        delete listFilesUpload[key];
        resolve(true);
      } else {
        statusUploadFile[key] = {
          value: response.status,
        };
        showPopup(
          'Error',
          'Only files with these MIME types are allowed: image/*, application/pdf.',
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
      showPopup(
        'Error',
        'An error occurred during file upload. Please check the file format or size and try again.',
        'error',
        true
      );
      reject(new Error('Upload failed'));
    };

    xhr.open('POST', `${BASE_URL}/api/v1/end-user/storage/upload`);
    xhr.send(formData);
  });
}

// Form submission
const onSubmit = async () => {
  try {
    isLoadingButton.value = true;

    if (!validateForm()) {
      showPopup(
        'Error',
        'Please fill all required fields correctly',
        'error',
        true
      );
      return;
    }

    const data_submission: any[] = [];

    for (const key in formState) {
      if (formState.hasOwnProperty(key)) {
        const item = formState[key];
        const formField = props.block.form?.list_fields?.[Number(key)];

        if (formField) {
          if (Array.isArray(item.value)) {
            // Handle file arrays
            data_submission.push({
              name: formField.label || `Field ${Number(key) + 1}`,
              type: item.type,
              value: item.value,
            });
          } else if (item.value || item.value === '') {
            // Handle text values
            data_submission.push({
              name: formField.label || `Field ${Number(key) + 1}`,
              type: item.type,
              value: item.value,
            });
          }
        }
      }
    }

    const body = {
      form_name: 'Contact Form',
      tenant_id: tenant_id.value,
      form_token: form_token,
      data_submission: data_submission,
    };

    await $fetch(`${BASE_URL}/api/v1/form-submission`, {
      method: 'POST',
      body: {
        ...body,
      },
    });

    // Clear form on success
    clearFormData();
    showPopup(
      'Success',
      'Your message has been sent successfully!',
      'success',
      true
    );
  } catch (error) {
    console.error('Form submission error:', error);
    showPopup(
      'Error',
      'Failed to send your message. Please try again.',
      'error',
      true
    );
  } finally {
    isLoadingButton.value = false;
  }
};

// Close notification popup
const closePopup = () => {
  showNotification.value = false;
  if (popupTimeout) {
    clearTimeout(popupTimeout);
    popupTimeout = null;
  }
};

// Initialize form state when component loads or form structure changes
watch(
  () => props.block.form,
  () => {
    convertFormstate();
  },
  { deep: true, immediate: true }
);
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

/* Form styles */
.custom_label {
  font-size: 14px;
  margin-bottom: 5px;
}

.form-control {
  font-size: 14px;
}

textarea.form-control {
  height: auto;
}

.border-dashed {
  border-style: dashed !important;
}

/* Popup notification */
.popup-notification {
  display: none;
  z-index: 999999;
  visibility: visible;
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

.popup-content h2 {
  font-size: 18px !important;
  text-align: left !important;
}

.popup-content p {
  font-size: 14px !important;
  text-align: left !important;
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
