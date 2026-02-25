import { getQuery, H3Event } from 'h3';
import { type RzmNuxtConfig } from '../interfaces';
import * as s from '@razomy/schema';

export function tryGetQueryFrom<S extends s.GenericSchema>(c: RzmNuxtConfig, event: H3Event, schema: S) {
  let responses = getQuery(event);

  try {
    return s.parse(schema, responses);
  } catch (err) {
    console.log(err);
    return null;
  }
}
