<template>
  <!--  <DefineTemplate>-->
  <!--    <v-btn rounded='xl'-->
  <!--           v-for='link in c.headerLinks'-->
  <!--           :to='localePath(link.url)'> {{ t(link.text) }}</v-btn>-->
  <!--  </DefineTemplate>-->

  <v-app-bar border="0" density='compact'>
    <!-- :collapse='isMobile && !isDrawerOpen' :class='{-->
    <!--    "app-bar-desktop rounded-xl mt-2": !isMobile,-->
    <!--    "app-bar-mobile-drawer-open rounded-br-xl": isMobile && isDrawerOpen,-->
    <!--  }'>-->
    <template v-slot:prepend>
      <slot name="start"></slot>
    </template>
    <!--    <v-btn v-if='!isMobile || isDrawerOpen' rounded='xl' :to='localePath("/")'>-->
    <!--      <v-avatar>-->
    <!--        &lt;!&ndash;        <v-img src='/images/favicon/logo.png'></v-img>&ndash;&gt;-->
    <!--      </v-avatar>-->
    <!--      <span v-if='!isTablet'>{{ t('vue-nuxt.header.company-name') }}</span>-->
    <!--    </v-btn>-->

    <!--    <v-app-bar-nav-icon-->
    <!--        v-if='isMobile'-->
    <!--        :icon='isDrawerOpen ? "mdi-close" : "mdi-menu"'-->
    <!--        @click.stop='isDrawerOpen = !isDrawerOpen'></v-app-bar-nav-icon>-->

    <!--    <div class='mx-2' v-if='!isMobile'>-->
    <!--      <ReuseTemplate></ReuseTemplate>-->
    <!--    </div>-->

    <slot></slot>
    <template v-slot:append>
      <slot name="end"></slot>
    </template>
  </v-app-bar>
</template>
<script lang='ts' setup>
import {useDisplay} from 'vuetify';
import {createReusableTemplate} from '@vueuse/core';

const [DefineTemplate, ReuseTemplate] = createReusableTemplate();
const goHome = () => router.push(localePath('/'));
const router = useRouter();

const localePath = useLocalePath();
const {t} = useI18n();
const isDrawerOpen = ref(false);
const {xs: isMobile, sm: isTablet} = useDisplay();
</script>
<style>

.app-bar-desktop {
  width: fit-content !important;
  left: calc(-50vw + 50%);
  right: calc(-50vw + 50%);
  margin-left: auto;
  margin-right: auto;
}

.app-bar-mobile-drawer-open {
  max-width: fit-content !important;
}

.rounded-br-xl {
  border-bottom-right-radius: 4 *6px;
}

.d-grid {
  display: grid;
}

</style>
