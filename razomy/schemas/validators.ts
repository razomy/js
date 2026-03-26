import * as s from '@razomy/schema';

export const ID_SCHEMA = s.object({
  id: s.pipe(s.string(), s.minLength(1), s.maxLength(255)),
});

export const WITH_LOCALE_SCHEMA = s.object({
  locale: s.pipe(s.string(), s.length(2)),
});
