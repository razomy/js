import { getCookie, H3Event } from 'h3';
import { withLocaleSchema } from '@razomy/schemas';
import { tryGetQueryFrom } from './get_query_from';
import { type RzmNuxtConfig } from '../interfaces';

export function getUserLocales(c: RzmNuxtConfig, event: H3Event) {
  // TODO: use whitelist enum instead
  const responses = tryGetQueryFrom(c, event, withLocaleSchema);
  if (responses?.locale) {
    return responses.locale || 'en';
  }

  const locale = (getCookie(event, c.cookie.session.locale) as any) || 'en';
  return locale;
}
