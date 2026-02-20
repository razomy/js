<template>
  <v-card
      class="mx-auto global-soft-card2 rounded-xl overflow-hidden"
      color="surface"
      max-width="800"
      variant="elevated"
  >
    <!-- Оверлей загрузки/обработки -->
    <v-overlay
        :model-value="isProcessing || isScanning"
        class="align-center justify-center"
        contained
        opacity="0.9"
        persistent
        z-index="5"
    >
      <div class="text-center">
        <v-progress-circular color="primary" indeterminate size="64" width="6"/>
        <h3 class="text-h6 mt-4 font-weight-bold text-white">
          {{ isScanning ? 'Сканирование папок...' : t('nuxt.dropzone.converting') + '...' }}
        </h3>
      </div>
    </v-overlay>

    <!-- Зона Drag & Drop -->
    <div
        :class="{ 'dragging': isDragging, 'has-files': modelValue.length > 0 }"
        class="dropzone-area rounded-xl bg-surface position-relative d-flex flex-column align-center justify-center pa-6"
        @dragover.prevent="isDragging = true"
        @dragleave.prevent="isDragging = false"
        @drop.prevent="onDrop"
    >

      <!-- Сценарий 1: Файлы еще не выбраны -->
      <template v-if="modelValue.length === 0">
        <div class="bg-primary-lighten-5 rounded-circle pa-6 mb-4 transition-swing">
          <v-icon color="primary" icon="mdi-folder-multiple-outline" size="64"/>
        </div>
        <h2 class="text-h5 font-weight-bold text-grey-darken-3 text-center">
          {{ t('nuxt.dropzone.drop_title') || 'Перетащите файлы или папки' }}
        </h2>
        <p class="text-body-1 text-grey-darken-1 mt-2 mb-6 text-center">
          Мы поддерживаем вложенные папки
        </p>

        <div class="d-flex gap-4">
          <!-- Кнопка выбора файлов -->
          <v-btn
              color="primary"
              prepend-icon="mdi-file-document-multiple"
              rounded="pill"
              size="large"
              variant="tonal"
              @click="triggerFileInput"
          >
            Выбрать файлы
          </v-btn>

          <!-- Кнопка выбора папки -->
          <v-btn
              color="secondary"
              prepend-icon="mdi-folder-open"
              rounded="pill"
              size="large"
              variant="tonal"
              @click="triggerFolderInput"
          >
            Выбрать папку
          </v-btn>
        </div>
      </template>

      <!-- Сценарий 2: Файлы выбраны (Список) -->
      <template v-else>
        <!-- Заголовок списка -->
        <div class="d-flex justify-space-between align-center w-100 mb-4 px-2">
          <div>
            <h4 class="text-h6 font-weight-bold">Выбрано файлов: {{ modelValue.length }}</h4>
            <span class="text-caption text-medium-emphasis">
              Общий размер: {{ totalSize }}
            </span>
          </div>
          <v-btn color="error" size="small" variant="text" @click="clearAll">
            Очистить все
          </v-btn>
        </div>

        <!-- Скроллируемый список файлов -->
        <v-list class="w-100 bg-transparent rounded-lg border overflow-y-auto" max-height="300">
          <v-list-item
              v-for="(file, index) in modelValue"
              :key="index"
              :subtitle="getFilePath(file)"
              :title="file.name"
              lines="two"
          >
            <template v-slot:prepend>
              <v-icon color="primary" icon="mdi-file-outline"/>
            </template>

            <template v-slot:append>
              <span class="text-caption mr-4 text-grey">{{ formatSize(file.size) }}</span>
              <v-btn color="error" icon="mdi-close" size="small" variant="text" @click.stop="removeFile(index)"/>
            </template>
          </v-list-item>
        </v-list>

        <!-- Кнопки действий -->
        <div class="d-flex gap-4 mt-6 w-100">
          <!-- Добавить еще -->
          <v-btn
              class="flex-grow-1"
              height="50"
              rounded="xl"
              variant="outlined"
              @click="triggerFileInput"
          >
            <v-icon icon="mdi-plus" start/>
            Добавить файлы
          </v-btn>

          <!-- Конвертировать -->
          <v-btn
              class="flex-grow-1 text-subtitle-1 font-weight-bold"
              color="primary"
              height="50"
              rounded="xl"
              variant="elevated"
              @click="$emit('convert')"
          >
            {{ t('nuxt.dropzone.convert_now') }}
            <v-icon end icon="mdi-arrow-right"/>
          </v-btn>
        </div>
      </template>

      <!-- Скрытые инпуты -->
      <!-- 1. Для обычных файлов (multiple) -->
      <input
          ref="fileInput"
          :accept="accept"
          class="d-none"
          multiple
          type="file"
          @change="onFileChange"
      />

      <!-- 2. Для выбора папки (webkitdirectory) -->
      <!-- @ts-ignore: webkitdirectory is not standard in types yet -->
      <input
          ref="folderInput"
          class="d-none"
          multiple
          type="file"
          webkitdirectory
          @change="onFileChange"
      />
    </div>
  </v-card>
</template>

<script lang="ts" setup>
import {computed, ref, useI18n} from '#imports';

const props = defineProps<{
  modelValue: File[], // Было File | null
  accept?: string,
  isProcessing: boolean
}>()
const emit = defineEmits(['update:modelValue', 'convert'])

const {t} = useI18n();

const isDragging = ref(false)
const isScanning = ref(false) // Состояние для отображения процесса обхода папок
const fileInput = ref<HTMLInputElement | null>(null)
const folderInput = ref<HTMLInputElement | null>(null)

// --- Вычисляемые свойства ---

const totalSize = computed(() => {
  const bytes = props.modelValue.reduce((acc, file) => acc + file.size, 0)
  return formatSize(bytes)
})

// --- Форматирование ---

const formatSize = (bytes: number) => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Получаем путь файла (если папка, путь будет длинный, иначе просто имя)
const getFilePath = (file: File & { webkitRelativePath?: string }) => {
  // webkitRelativePath заполняется браузером при выборе папки
  // Для Drag&Drop мы можем хранить путь в кастомном свойстве, если нужно
  return file.webkitRelativePath || file.name
}

// --- Управление инпутами ---

const triggerFileInput = () => fileInput.value?.click()
const triggerFolderInput = () => folderInput.value?.click()

// Обработка стандартного выбора через диалог
const onFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    addFiles(Array.from(target.files))
  }
  // Сбрасываем value, чтобы можно было выбрать те же файлы повторно
  target.value = ''
}

// --- Логика Drag & Drop (Самая сложная часть) ---

const onDrop = async (e: DragEvent) => {
  isDragging.value = false
  const items = e.dataTransfer?.items

  if (!items) return

  isScanning.value = true
  try {
    const files: File[] = []

    // Используем Promise.all для параллельной обработки элементов верхнего уровня
    const promises = []
    for (let i = 0; i < items.length; i++) {
      const item = items[i]!.webkitGetAsEntry() // Получаем FileSystemEntry
      if (item) {
        promises.push(traverseFileTree(item))
      }
    }

    const results = await Promise.all(promises)
    // Объединяем результаты рекурсии в один плоский массив
    results.forEach(fileArray => files.push(...fileArray))

    addFiles(files)
  } catch (err) {
    console.error('Ошибка при чтении папок:', err)
  } finally {
    isScanning.value = false
  }
}

// Рекурсивная функция обхода дерева файлов
const traverseFileTree = (item: any, path = ''): Promise<File[]> => {
  return new Promise((resolve) => {
    if (item.isFile) {
      // Это файл
      item.file((file: File) => {
        // Опционально: можно записать полный путь в объект файла, если нужно для API
        // Object.defineProperty(file, 'fullPath', { value: path + file.name });
        resolve([file])
      })
    } else if (item.isDirectory) {
      // Это папка
      const dirReader = item.createReader()
      const entries: File[] = []

      const readEntries = () => {
        dirReader.readEntries(async (result: any[]) => {
          if (result.length === 0) {
            // Чтение папки завершено
            resolve(entries)
          } else {
            // Рекурсивно обрабатываем содержимое
            const promises = result.map(entry => traverseFileTree(entry, path + item.name + '/'))
            const subResults = await Promise.all(promises)
            subResults.forEach(files => entries.push(...files))

            // Продолжаем читать (нужно для больших папок, браузер отдает частями)
            readEntries()
          }
        })
      }
      readEntries()
    } else {
      resolve([])
    }
  })
}

// --- Управление состоянием ---

const addFiles = (newFiles: File[]) => {
  // Добавляем новые файлы к старым (или заменяем, зависит от логики, тут добавляем)
  // Можно добавить фильтрацию дубликатов здесь
  const updatedList = [...props.modelValue, ...newFiles]
  emit('update:modelValue', updatedList)
}

const removeFile = (index: number) => {
  const updatedList = [...props.modelValue]
  updatedList.splice(index, 1)
  emit('update:modelValue', updatedList)
}

const clearAll = () => {
  emit('update:modelValue', [])
  if (fileInput.value) fileInput.value.value = ''
  if (folderInput.value) folderInput.value.value = ''
}
</script>

<style scoped>
.dropzone-area {
  min-height: 350px;
  border-spacing: 3px;
  border-style: dashed;
  border-width: 3px;
  border-color: rgba(var(--v-theme-on-surface), 0.2);
  transition: all 0.3s ease;
}

.dropzone-area.dragging {
  border-color: rgb(var(--v-theme-primary));
  background-color: rgb(var(--v-theme-primary), 0.05);
  transform: scale(1.01);
}

.dropzone-area.has-files {
  border-style: solid;
  border-width: 1px;
  border-color: rgba(var(--v-theme-border), 0.5);
  justify-content: flex-start !important; /* Чтобы список начинался сверху */
}

.gap-4 {
  gap: 16px;
}

.transition-swing {
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}
</style>