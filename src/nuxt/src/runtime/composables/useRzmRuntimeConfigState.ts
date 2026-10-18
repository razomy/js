import { RzmNuxtRuntimeConfig } from '../functions';
import { useState } from 'nuxt/app';

export const useRzmRuntimeConfigState = () => {
  const c = useState<RzmNuxtRuntimeConfig>('useRzmRuntimeConfigState.c', () => null);

  const set = (c_: RzmNuxtRuntimeConfig) => {
    c.value = c_;
  };

  return {
    c,
    set,
  };
};
