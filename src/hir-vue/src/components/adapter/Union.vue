<template>
  <v-card class="pa-4 mb-4" :class="{ 'opacity-80': props.meta.isReadonly }">
    <!-- Заголовок и селектор типа из Union -->
    <div class="d-flex align-center justify-space-between mb-2 flex-wrap gap-2">
      <div class="text-body-large font-weight-medium d-flex align-center">
        <v-icon start color="accent" size="small" icon="mdi-set-all"></v-icon>
        {{ meta.name || '' }}
      </div>

      <!-- Выбор одного из вариантов в schema.values -->
      <v-select
        v-model="selectedIndex"
        :items="unionOptions"
        item-title="title"
        item-value="value"
        label="Select Type (Union)"
        density="compact"
        variant="outlined"
        hide-details
        color="secondary"
        style="max-width: 250px; min-width: 180px"
        :readonly="props.meta.isReadonly"
        @update:model-value="onTypeChange"
      />
    </div>

    <div class="text-caption mb-4 text-medium-emphasis" v-if="meta.description">
      {{ meta.description }}
    </div>

    <!-- Рендер выбранной схемы -->
    <div class="pl-2 border-s-sm border-secondary">
      <template v-if="selectedSchema">
        <div class="bg-surface rounded">
          <!--
            Передаем тот же path, но явно указываем выбранную схему (если ваш Any.vue это поддерживает).
            Если Any.vue берет схему сам из стора, вам нужно обновить выбранную ветку в сторе или передать prop.
          -->
          <Any :path="[...path, selectedSchema['name']]" :schema="selectedSchema" />
        </div>
      </template>
      <div v-else class="text-caption text-medium-emphasis italic">Empty union schema.</div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import Any from './Any.vue';
import { useFormInject } from '../../stores/useForm';
import { OperationProps } from '../../stores/types';

const props = defineProps<OperationProps>();
const form = useFormInject();

// Индекс выбранного типа из массива schema.values (по умолчанию 0)
const selectedIndex = ref<number>(0);

// Доступные схемы из union
const schemaValues = computed<any[]>(() => {
  return Array.isArray(props.schema?.operands) ? props.schema.operands : [];
});

// Формируем список опций для v-select
const unionOptions = computed(() => {
  return schemaValues.value.map((item: any, index: number) => ({
    // Пытаемся достать красивое имя типа из схемы (подстройте под поля вашего AsnType)
    title: item.name || item.type || item.kind || `Option ${index + 1}`,
    value: index,
  }));
});

// Текущая активная схема
const selectedSchema = computed<any | undefined>(() => {
  return schemaValues.value[selectedIndex.value];
});

// При смене типа в селекте сбрасываем значение в форме по этому пути
function onTypeChange() {
  if (!props.meta.isReadonly) {
    form.setValue(undefined, props.path);
  }
}

// Если schema.values изменилась снаружи, проверяем валидность индекса
watch(schemaValues, (newVal) => {
  if (selectedIndex.value >= newVal.length) {
    selectedIndex.value = 0;
  }
});
</script>
