<template>
  <v-navigation-drawer
      v-model="model"
      :permanent="!isMobile"
      :floating="isMobile"
      app
      border="1"
      class="bordere-1 bg-surface-light sidebar"
      width="180"
  >
    <!-- Search Input -->
    <div class="pa-1 sticky-top z-index-10 border-b">
      <v-text-field
          v-model="search"
          :label="t('vue-nuxt.sidebar.search')"
          :placeholder="t('vue-nuxt.sidebar.search')"
          prepend-inner-icon="mdi-magnify"
          variant="plain"
          class="bg-surface-light"
          rounded="lg"
          clearable
      />
    </div>

    <v-list
        nav
        open-strategy="single"
        density="compact"
    >

      <template v-if="search?.length">
        <div class="text-caption text-medium-emphasis mb-2 ml-2">
          {{ t('vue-nuxt.sidebar.results_for') }} "{{ search }}"
        </div>

        <!-- Added density="compact" -->
        <v-list-item
            v-for="item in searchResults"
            :key="`${item.from}-${item.to}`"
            :to="localePath(`/${item.category}/${item.from}/${item.to}`)"
            color="primary"
            rounded="lg"
            class="mb-1"
            density="compact"
        >
          <template v-slot:prepend>
            <v-icon size="small" icon="mdi-swap-horizontal" color="grey"/>
          </template>
          <v-list-item-title class="font-weight-medium">
            <span class="text-uppercase">{{ item.from }}</span>
            <span class="text-grey mx-1">→</span>
            <span class="text-uppercase">{{ item.to }}</span>
          </v-list-item-title>
        </v-list-item>

        <div v-if="searchResults?.length === 0" class="text-center py-4 text-grey">
          {{ t('vue-nuxt.sidebar.no_results') }}
        </div>
      </template>

      <template v-else>
        <div
            v-for="group in groups"
            :key="group.key"
            :value="group.key"
        >
          <div class="my-1">{{ group.key }}</div>
          <v-list-group
              v-for="category in group.categories"
              :key="category"
              density="compact"
              :value="category"
              :active="category === input1Slug"
          >
            <template v-slot:activator="{ props }">
              <!-- Added density="compact" and pl-4 for visual hierarchy -->
              <v-list-item
                  v-bind="props"
                  :title="category"
                  :to="localePath(`/${group.key}/${category}`)"
                  color="secondary"
                  density="compact"
                  :active="category === input1Slug"
              />
            </template>

            <!-- Level 3: Target Formats -->
            <v-list-item
                v-for="output in group.items.filter(i=>i[1]===category)"
                :key="output.at(-1)"
                class="pa-0"
                :title="`${output.at(-1)}`"
                :to="localePath(`/${group.key}/${category}/${output.at(-1)}`)"
                density="compact"
                color="secondary"
                :active="output.at(-1) === outputSlug"
            />
          </v-list-group>
        </div>

      </template>

    </v-list>
  </v-navigation-drawer>
  <!--  v-if="isMobile && !model"-->
  <v-fab
      @click="model=!model"
      icon="mdi-magnify"
      v-if="!model"
      fixed
      app
      class="z-index-10"
  ></v-fab>
</template>

<script setup lang="ts">
import {c} from '~~/content/context';
import {computed, ref, watch} from 'vue';

const {xs: isMobile, sm: isTablet} = useDisplay();

const {t} = useI18n();
const localePath = useLocalePath();
const route = useRoute();

const props = defineProps<{ modelValue: boolean }>();
const emit = defineEmits(['update:modelValue']);
const model = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});

if (isMobile) {
  model.value = false;
}

const input0Slug = ref<string>('');
const input1Slug = ref<string>('');
const outputSlug = ref<string>('');
watch(() => route.params, (route) => {
  input0Slug.value = route.input0 as string;
  input1Slug.value = route.input1 as string;
  outputSlug.value = route.output as string;
}, {immediate: true, deep: true});


const groups = computed(() => {
  const set: Record<string, { key: string, categories: string[], items: string[][] }> = {}
  c.categories
      .filter(i => {
        if (input0Slug) {
          return i[0] === input0Slug.value;
        }
        return true;
      })
      .forEach(i => {
        const key = i[0]!;
        if (set[key]) {
          set[key].items.push(i);
          if (!set[key].categories.includes(i[1]!)) {
            set[key].categories.push(i[1]!);
          }
        } else {
          set[key] = {key, categories: [], items: [i]}
        }
      });
  return Object.values(set);
});

const search = ref('');
// --- Search Logic ---
const searchResults = computed(() => {
  if (!search.value) return c.categories.map(([category, input, output]) => ({from: input, to: output, category}));
  const q = search.value.toLowerCase().trim();
  const parts = q.split(/[\s\-\/>]+|\sto\s+/).filter(Boolean);
  const results: { from: string, to: string, category: string }[] = [];
  c.categories
      .forEach(([category, input, output]: any) => {
        if (parts.length >= 2) {
          const fromPart = parts[0];
          const toPart = parts.slice(1);
          if (input.includes(fromPart as any) && toPart.find(i => output?.includes(i))) {
            results.push({from: input, to: output, category});
          }
        } else {
          if (input.includes(q) || output?.includes(q)) {
            results.push({from: input, to: output, category});
          }
        }
      });
  return results;
});
</script>

<style scoped>
.v-list-item--one-line {
  min-height: 32px;
  max-height: 32px;
  padding: 0;
  margin: 0;
}
</style>