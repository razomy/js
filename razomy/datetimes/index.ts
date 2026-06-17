// Imports
import { cronStringToDate } from './cron_string_to_date';
import type { HasDatetime } from './datetime';
import { ExpiringInMemoryCache } from './expiring_in_memory_cache';
import type { CacheEntry } from './expiring_in_memory_cache';
import { DAY_MS, HOUR_MS, MINUTE_MS, SECOND_MS, formatDuration } from './format_duration';
import { formatMilliseconds } from './format_milliseconds';
import { formatTimeLength } from './format_time_length';
import { isDateToday } from './is_date_today';
import { stringToDate } from './string_to_date';

// Named exports
export {
  DAY_MS,
  ExpiringInMemoryCache,
  HOUR_MS,
  MINUTE_MS,
  SECOND_MS,
  cronStringToDate,
  formatDuration,
  formatMilliseconds,
  formatTimeLength,
  isDateToday,
  stringToDate
};
export type {
  CacheEntry,
  HasDatetime
};

// Default export
const datetimes = {
  cronStringToDate,
  ExpiringInMemoryCache,
  DAY_MS,
  HOUR_MS,
  MINUTE_MS,
  SECOND_MS,
  formatDuration,
  formatMilliseconds,
  formatTimeLength,
  isDateToday,
  stringToDate,
};


export default datetimes;
