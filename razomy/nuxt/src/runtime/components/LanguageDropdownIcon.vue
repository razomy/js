<template>
  <v-menu class="w-100">
    <!-- The Button that opens the menu -->
    <template v-slot:activator="{ props }">
      <v-btn
          v-bind="props"
          variant="text"
      >
        <!-- Display current locale name or code -->
        {{ locale }}
        <v-icon end>mdi-chevron-down</v-icon>
      </v-btn>
    </template>

    <!-- The List of Languages -->
    <v-list density="compact">
      <v-list-item
          v-for="item in locales"
          :key="item.code"
          :to="switchLocalePath(item.code)"
          :value="item.code"
          @click="setLocale(item.code)"
      >
        <v-list-item-title>{{ item.name }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script lang='ts' setup>
import {  useI18n, useLocalePath, useSwitchLocalePath } from '#imports';

const {locale, locales, setLocale} = useI18n();
const switchLocalePath = useSwitchLocalePath();
const localePath = useLocalePath();
</script>
<style scoped>
</style>
