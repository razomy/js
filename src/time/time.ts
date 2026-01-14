import { intervalToDuration } from 'date-fns';

export const second_ms = 1000;
export const minute_ms = second_ms * 60;
export const hour_ms = minute_ms * 60;
export const day_ms = hour_ms * 24;

export const format_duration = (durationInMs: number): string => {
  const duration = intervalToDuration({ start: 0, end: durationInMs });

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
};

// converts milliseconds into a formatted string (for ex., "3h15m" or "16m").
export const format_milliseconds = (milliseconds: number): string => {
  const total_seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(total_seconds / 60);
  const seconds = total_seconds % 60;

  const hours = Math.floor(minutes / 60);
  const remaining_minutes = minutes % 60;

  if (hours > 0) {
    return `${hours}h ${remaining_minutes}m`;
  } else if (minutes > 0) {
    return `${remaining_minutes}m ${seconds}s`;
  } else {
    return `${seconds}s`;
  }
};
