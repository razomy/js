import { H3Event, getCookie, getQuery } from 'h3';
import {z} from '@razomy/schema';
// export const id_schema = zod.object({
//   id: zod.string()
//     .min(1)
//     .max(255)
//   ,
// });
//
export function getQueryFrom(c, event: H3Event, schema: z.ZodObject) {
  let responses = getQuery(event);

  try {
    responses = schema.parse(responses) as any;
  } catch (err) {
    console.log(err);
    return null;
  }

  return responses;
}

//
// export function getPath(event: H3Event, _default: string) {
//   let responses = getQueryFrom<{ path: string }>(
//     event,
//     zod.object({
//       path: zod.string()
//         .required(),
//     }),
//   );
//   if (responses?.path) {
//     return responses?.path;
//   }
//   return _default;
// }
