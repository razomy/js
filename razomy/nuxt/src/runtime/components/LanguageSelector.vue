<template>
  <div class='language-selector'>
    <v-select id='select-language'
              v-model='locale'
              :items='locales'
              density='compact'
              item-title='name'
              item-value='code'
              variant="plain"
    >
      <template v-slot:item='{ props, item }'>
        <v-list-item :to='switchLocalePath(item.value)'
                     v-bind='props'
                     @click.prevent.stop='setLocale(item.value)'></v-list-item>
      </template>
    </v-select>
  </div>
</template>
<script lang='ts' setup>
const {locale, locales, setLocale} = useI18n();
const switchLocalePath = useSwitchLocalePath();
const localePath = useLocalePath();
</script>
<style scoped>
</style>
