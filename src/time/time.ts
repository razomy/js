import { intervalToDuration } from "date-fns";

export const secondMs = 1000;
export const minuteMs = secondMs * 60;
export const hourMs = minuteMs * 60;
export const dayMs = hourMs * 24;

export const format_duration = (durationInMs: number): string => {
  const duration = intervalToDuration({ start: 0, end: durationInMs });

  if (duration.days && duration.days > 0) {
    return `${duration.days} day${duration.days > 1 ? "s" : ""}${
      duration.hours
        ? `, ${duration.hours} hour${duration.hours > 1 ? "s" : ""}`
        : ""
    }`;
  } else if (duration.hours && duration.hours > 0) {
    return `${duration.hours} hour${duration.hours > 1 ? "s" : ""}${
      duration.minutes ? `, ${duration.minutes} min` : ""
    }`;
  } else if (duration.minutes && duration.minutes > 0) {
    return `${duration.minutes} min`;
  } else {
    return `${duration.seconds} sec`; // Handle seconds explicitly
  }
};

// converts milliseconds into a formatted string (for ex., "3h15m" or "16m").
export const format_milliseconds = (milliseconds: number): string => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours > 0) {
    return `${hours}h ${remainingMinutes}m`;
  } else if (minutes > 0) {
    return `${remainingMinutes}m ${seconds}s`;
  } else {
    return `${seconds}s`;
  }
};
