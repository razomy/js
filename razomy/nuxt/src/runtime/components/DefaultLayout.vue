<template>
  <div>
    <Html :dir='head.htmlAttrs.dir' :lang='head.htmlAttrs.lang'>
    <Head>
      <Title>{{ title }}</Title>
      <template v-for='link in head.link' :key='link.id'>
        <Link :id='link.id' :href='link.href' :hreflang='link.hreflang' :rel='link.rel'/>
      </template>
      <template v-for='meta in head.meta' :key='meta.id'>
        <Meta :id='meta.id' :content='meta.content' :property='meta.property'/>
      </template>
    </Head>
    <Body>
    <v-app>
      <!-- Сайдбар -->
      <rzm-sidebar v-model="drawer"/>
      <v-main>
        <!--        <rzm-default-header>-->
        <!--          <template v-slot:start>-->
        <!--            <v-icon-btn @click="drawer = !drawer">-->
        <!--              <v-icon :icon="drawer ? 'mdi-close': 'mdi-menu'"></v-icon>-->
        <!--            </v-icon-btn>-->
        <!--            <rzm-language-dropdown-icon></rzm-language-dropdown-icon>-->
        <!--            <slot name="header-start"></slot>-->
        <!--            <rzm-breadcrumbs></rzm-breadcrumbs>-->
        <!--            <slot name="header-finish"></slot>-->
        <!--          </template>-->
        <!--          <template v-slot:end>-->
        <!--            <v-btn color="primary">Login/Up</v-btn>-->
        <!--          </template>-->
        <!--        </rzm-default-header>-->
        <!-- Контент -->
        <slot/>
        <rzm-default-footer></rzm-default-footer>
      </v-main>

    </v-app>
    </Body>
    </Html>
  </div>
</template>
<script lang='ts' setup>
import {c} from '~~/content/context';

const {locale} = useI18n();
const route = useRoute();
const {t} = useI18n();

const drawer = ref(true); // По умолчанию открыт на больших экранах
const cookie_session_locale = useCookie(c.cookie.session.locale);
cookie_session_locale.value = cookie_session_locale.value || locale.value;

const head = useLocaleHead({
  dir: true,
  lang: true,
  seo: true,
});

const title = computed(() => route.meta.title);

</script>
