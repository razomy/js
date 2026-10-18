
export async function tryExecuteSync<T>(path: string) {
    try {
    return await execute<T>(path);
    } catch (error) {
    return null;
    }
}
