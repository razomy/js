export function isDateToday(inputDate: Date) {
  const currentDate = new Date(new Date().toISOString().split('T')[0]);
  const inputDateObj = new Date(inputDate);

  return (
    currentDate.getFullYear() === inputDateObj.getFullYear() &&
    currentDate.getMonth() === inputDateObj.getMonth() &&
    currentDate.getDate() === inputDateObj.getDate()
  );
}

export function formatTimeLength(milliseconds: number) {
  const timeUnits: string[] = [];

  const seconds = Math.floor(milliseconds / 1000);
  const years = Math.floor(seconds / (3600 * 24 * 365));
  const months = Math.floor((seconds % (3600 * 24 * 365)) / (3600 * 24 * 30));
  const days = Math.floor((seconds % (3600 * 24 * 30)) / (3600 * 24));
  const hours = Math.floor((seconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  const remainingMilliseconds = milliseconds % 1000;

  if (years > 0) timeUnits.push(`${years}y`);
  if (months > 0) timeUnits.push(`${months}mo`);
  if (days > 0) timeUnits.push(`${days}d`);
  if (hours > 0) timeUnits.push(`${hours}h`);
  if (minutes > 0) timeUnits.push(`${minutes}m`);
  if (remainingSeconds > 0) timeUnits.push(`${remainingSeconds}s`);
  if (remainingMilliseconds > 0) timeUnits.push(`${remainingMilliseconds}ms`);

  const formattedTime = timeUnits.join(':');
  return formattedTime;
}
