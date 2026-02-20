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
    <v-main>
      <slot/>
    </v-main>
    </Body>
    </Html>
  </div>
</template>
<script lang='ts' setup>
import {c} from '~~/content/context';

const {locale} = useI18n();

const cookie_session_locale = useCookie(c.cookie.session.locale);
cookie_session_locale.value = cookie_session_locale.value || locale.value;

const route = useRoute();
const {t} = useI18n();
const head = useLocaleHead({
  dir: true,
  lang: true,
  seo: true,
});
const title = computed(() => route.meta.title);

</script>
