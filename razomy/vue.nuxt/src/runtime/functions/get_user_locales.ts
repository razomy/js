import { H3Event, getCookie, getQuery} from 'h3';
import { z } from "@razomy/schema";
import {getQueryFrom} from './get_query_from';

export function getUserLocales(c, event: H3Event){
    let responses = getQueryFrom(c,
            event,
            z.object({
              locale: z.string()
                .length(2),
            }),
          ) as { locale: any };
    if (responses?.locale) {
    return responses.locale || 'en';
    }

    const locale = getCookie(event, c.cookie.session.locale) as any || 'en';
    return locale;
}
