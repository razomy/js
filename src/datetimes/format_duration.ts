import { intervalToDuration } from 'date-fns';

export const SECOND_MS = 1000;
export const MINUTE_MS = SECOND_MS * 60;
export const HOUR_MS = MINUTE_MS * 60;
export const DAY_MS = HOUR_MS * 24;

export function formatDuration(durationInMs: number): string {
  const duration = intervalToDuration({ start: 0, end: durationInMs });

  if (duration.days && duration.days > 0) {
    return `${duration.days} day${duration.days > 1 ? 's' : ''}${
      duration.hours ? `, ${duration.hours} hour${duration.hours > 1 ? 's' : ''}` : ''
    }`;
  } else if (duration.hours && duration.hours > 0) {
    return `${duration.hours} hour${duration.hours > 1 ? 's' : ''}${
      duration.minutes ? `, ${duration.minutes} min` : ''
    }`;
  } else if (duration.minutes && duration.minutes > 0) {
    return `${duration.minutes} min`;
  } else {
    return `${duration.seconds} sec`; // Handle seconds explicitly
  }
}
