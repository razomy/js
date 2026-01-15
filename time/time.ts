import { intervalToDuration } from 'date-fns';

export const second_ms = 1000;
export const minute_ms = second_ms * 60;
export const hour_ms = minute_ms * 60;
export const day_ms = hour_ms * 24;

export function format_duration (duration_in_ms: number) : string {
  const duration = intervalToDuration({ start: 0, end: duration_in_ms });

  if (duration.days && duration.days > 0) {
    return `${duration.days} day${duration.days > 1 ? "s" : ''}${
      duration.hours
        ? `, ${duration.hours} hour${duration.hours > 1 ? "s" : ''}`
        : ''
    }`;
  } else if (duration.hours && duration.hours > 0) {
    return `${duration.hours} hour${duration.hours > 1 ? "s" : ''}${
      duration.minutes ? `, ${duration.minutes} min` : ''
    }`;
  } else if (duration.minutes && duration.minutes > 0) {
    return `${duration.minutes} min`;
  } else {
    return `${duration.seconds} sec`; // Handle seconds explicitly
  }
}


