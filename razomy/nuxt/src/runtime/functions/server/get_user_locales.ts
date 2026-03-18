import {getCookie, H3Event} from 'h3';
import {withLocaleSchema} from '@razomy/schemas';
import {tryGetQueryFrom} from './get_query_from';
import {type RzmNuxtStaticConfig} from '../interfaces';

export function getUserLocales(c: RzmNuxtStaticConfig, event: H3Event) {
  // TODO: use whitelist enum instead
  const responses = tryGetQueryFrom(event, withLocaleSchema);
  if (responses?.locale) {
    return responses.locale || 'en';
  }

  const locale = (getCookie(event, c.cookie.session.locale) as any) || 'en';
  return locale;
}
