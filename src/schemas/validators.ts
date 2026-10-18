import * as schema from '@razomy/schema';

export const ID_SCHEMA = schema.object({
  id: schema.pipe(schema.string(), schema.minLength(1), schema.maxLength(255)),
});

export const WITH_LOCALE_SCHEMA = schema.object({
  locale: schema.pipe(schema.string(), schema.length(2)),
});
