import { LeafPathGenerator, RzmNuxtStaticConfig, RzmNuxtRuntimeConfig } from './runtime/functions';

export const c: RzmNuxtStaticConfig | RzmNuxtRuntimeConfig = null as any;

export const useI18n = () => ({ locale: { value: '' }, t: (_: LeafPathGenerator<RzmNuxtTranslate>) => '' });
export const useLocalePath = () => (_: string) => '';
export const useRoute = () => ({ path: '', meta: { title: '' } });
export const computed = <T>(_: () => T) => _();
export const ref = <T>(_: T) => ({});
export const useDisplay = () => ({ xs: { value: false } });
