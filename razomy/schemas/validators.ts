import * as s from '@razomy/schema'

export const idSchema = s.object({
  id: s.pipe(
    s.string(),
    s.minLength(1),
    s.maxLength(255)
  ),
});

export const withLocaleSchema= s.object({
  locale: s.pipe(
    s.string(),
    s.length(2)
  ),
});