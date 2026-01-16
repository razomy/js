
export function format_milliseconds(milliseconds: number): string {
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
}
