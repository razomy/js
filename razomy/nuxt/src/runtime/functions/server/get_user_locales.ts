import {getCookie, H3Event} from 'h3';
import {withLocaleSchema} from '@razomy/schemas';
import {tryGetQueryFrom} from './get_query_from';
import {type RazomyVueNuxtConfig} from '../default_nuxt_config';

export function getUserLocales(c: RazomyVueNuxtConfig, event: H3Event) {
  // TODO: use whitelist enum instead
  let responses = tryGetQueryFrom(c,
    event,
    withLocaleSchema,
  );
  if (responses?.locale) {
    return responses.locale || 'en';
  }

  const locale = getCookie(event, c.cookie.session.locale) as any || 'en';
  return locale;
}
