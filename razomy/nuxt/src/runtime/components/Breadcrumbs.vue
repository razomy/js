<template>
  <!--  <div class="d-flex align-center flex-wrap justify-start">-->
  <!--    <slot></slot>-->
  <!--    &lt;!&ndash; 1. HOME &ndash;&gt;-->
  <!--    <v-icon-btn-->
  <!--        :to="localePath('/')"-->
  <!--        density="compact"-->
  <!--    >-->
  <!--      <v-icon icon="mdi-home"></v-icon>-->
  <!--    </v-icon-btn>-->

  <!--    <v-icon icon="mdi-chevron-right" opacity="50" size="small"/>-->
  <!--    -->
  <!--    &lt;!&ndash; 2. CATEGORY DROPDOWN &ndash;&gt;-->
  <!--    <v-menu location="bottom center" transition="slide-y-transition">-->
  <!--      <template v-slot:activator="{ props }">-->
  <!--        <v-btn-->
  <!--            v-if="groupSlug"-->
  <!--            v-bind="props"-->
  <!--            variant="text"-->
  <!--            density="compact"-->
  <!--            class="text-capitalize px-2"-->
  <!--            append-icon="mdi-chevron-down"-->
  <!--        >-->
  <!--          {{ groups[groupSlug]?.labelKey }}-->
  <!--        </v-btn>-->
  <!--        <v-icon-btn v-bind="props" v-else icon="mdi-plus"></v-icon-btn>-->
  <!--      </template>-->
  <!--      -->
  <!--      <v-list density="compact" nav class="rounded-lg" elevation="4">-->
  <!--        <v-list-subheader class="  text-caption">-->
  <!--          {{ $t('nuxt.breadcrumb.select_category') }}-->
  <!--        </v-list-subheader>-->
  <!--        <v-list-item-->
  <!--            v-for="groupKey in categories"-->
  <!--            :key="groupKey"-->
  <!--            :title="$t(groups[groupKey]?.labelKey || groupKey)"-->
  <!--            :prepend-icon="groups[groupKey]?.icon"-->
  <!--            :to="localePath(`/${groupKey}`)"-->
  <!--            :active="groupKey === groupSlug"-->
  <!--            color="primary"-->
  <!--        />-->
  <!--      </v-list>-->
  <!--    </v-menu>-->

  <!--    &lt;!&ndash; 3. SOURCE DROPDOWN (If category selected) &ndash;&gt;-->
  <!--    <template v-if="groupSlug">-->
  <!--      <v-icon icon="mdi-chevron-right" opacity="50" size="small"/>-->

  <!--      <v-menu location="bottom center" transition="slide-y-transition" max-height="300">-->
  <!--        <template v-slot:activator="{ props }">-->
  <!--          <v-btn-->
  <!--              v-if="inputSlug"-->
  <!--              v-bind="props"-->
  <!--              density="compact"-->
  <!--              variant="text"-->
  <!--              class=" px-2"-->
  <!--              append-icon="mdi-chevron-down"-->
  <!--          >-->
  <!--            .{{ inputSlug }}-->
  <!--          </v-btn>-->
  <!--          <v-icon-btn v-bind="props" v-else icon="mdi-plus"></v-icon-btn>-->
  <!--        </template>-->

  <!--        <v-list density="compact" nav class="rounded-lg elevation-4">-->
  <!--          <v-list-subheader class="  text-caption">-->
  <!--            {{ $t('nuxt.breadcrumb.select_source') }}-->
  <!--          </v-list-subheader>-->

  <!--          <v-list-item-->
  <!--              v-for="inputKey in formatsInCategory"-->
  <!--              :key="inputKey"-->
  <!--              :title="`.${inputKey.toUpperCase()}`"-->
  <!--              :to="localePath(`/${groupSlug}/${inputKey}`)"-->
  <!--              :active="inputKey === inputSlug"-->
  <!--              color="primary"-->
  <!--          />-->
  <!--        </v-list>-->
  <!--      </v-menu>-->
  <!--    </template>-->

  <!--    &lt;!&ndash; 4. TARGET DROPDOWN (If source selected) &ndash;&gt;-->
  <!--    <template v-if="inputSlug">-->
  <!--      <v-icon icon="mdi-chevron-right" opacity="50" size="small"/>-->

  <!--      <v-menu location="bottom center" transition="slide-y-transition">-->
  <!--        <template v-slot:activator="{ props }">-->
  <!--          <v-btn-->
  <!--              v-if="outputSlug"-->
  <!--              v-bind="props"-->
  <!--              density="compact"-->
  <!--              variant="text"-->
  <!--              class="px-2"-->
  <!--              append-icon="mdi-chevron-down"-->
  <!--          >-->
  <!--            {{ outputSlug }}-->
  <!--          </v-btn>-->
  <!--          <v-icon-btn v-bind="props" v-else icon="mdi-plus"></v-icon-btn>-->

  <!--        </template>-->
  <!--        <v-list density="compact" nav class="rounded-lg elevation-4">-->
  <!--          <v-list-subheader class="  text-caption">-->
  <!--            {{ $t('nuxt.breadcrumb.select_target') }}-->
  <!--          </v-list-subheader>-->

  <!--          <v-list-item-->
  <!--              v-for="outputKey in availableTargets"-->
  <!--              :key="outputKey"-->
  <!--              :title="`To ${outputKey.toUpperCase()}`"-->
  <!--              :to="localePath(`/${groupSlug}/${inputSlug}/${outputKey}`)"-->
  <!--              :active="outputKey === outputSlug"-->
  <!--              prepend-icon="mdi-arrow-right"-->
  <!--              color="primary"-->
  <!--          />-->
  <!--        </v-list>-->
  <!--      </v-menu>-->
  <!--    </template>-->

  <!--  </div>-->
</template>

<!--<script setup lang="ts">-->
<!--import {EXT_TO_EXTS_MAP, groups, EXT_TO_GROUP_MAP} from '~~/content/context';-->

<!--const route = useRoute();-->
<!--const localePath = useLocalePath();-->
<!--const {t} = useI18n();-->

<!--// 1. Текущие параметры из URL-->
<!--const groupSlug = computed(() => (route.params.group as string)?.toLowerCase());-->
<!--const inputSlug = computed(() => (route.params.input as string)?.toLowerCase());-->
<!--const outputSlug = computed(() => (route.params.output as string)?.toLowerCase());-->

<!--// 3. Списки для меню-->
<!--const categories = computed(() => Object.keys(groups));-->

<!--const formatsInCategory = computed(() => {-->
<!--  // Фильтруем все форматы, которые принадлежат текущей категории-->
<!--  return Object.keys(EXT_TO_EXTS_MAP).filter(fmt =>-->
<!--      (EXT_TO_GROUP_MAP[fmt] || 'other') === groupSlug.value-->
<!--  );-->
<!--});-->

<!--const availableTargets = computed(() => {-->
<!--  if (!inputSlug.value) return [];-->
<!--  return EXT_TO_EXTS_MAP[inputSlug.value as keyof typeof EXT_TO_EXTS_MAP] || [];-->
<!--});-->

<!--</script>-->

<!--<style scoped>-->
<!--.gap-1 {-->
<!--  gap: 4px;-->
<!--}-->
<!--</style>-->
