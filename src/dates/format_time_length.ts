export default function format_time_length(milliseconds: number) {
    const time_units: string[] = [];
    const seconds = Math.floor(milliseconds / 1000);
    const years = Math.floor(seconds / (3600 * 24 * 365));
    const months = Math.floor((seconds % (3600 * 24 * 365)) / (3600 * 24 * 30));
    const days = Math.floor((seconds % (3600 * 24 * 30)) / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remaining_seconds = seconds % 60;
    const remaining_milliseconds = milliseconds % 1000;
    if (years > 0) time_units.push(`${years}y`);
    if (months > 0) time_units.push(`${months}mo`);
    if (days > 0) time_units.push(`${days}d`);
    if (hours > 0) time_units.push(`${hours}h`);
    if (minutes > 0) time_units.push(`${minutes}m`);
    if (remaining_seconds > 0) time_units.push(`${remaining_seconds}s`);
    if (remaining_milliseconds > 0) time_units.push(`${remaining_milliseconds}ms`);
    const formatted_time = time_units.join(' ');
    return formatted_time;
}
