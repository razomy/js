import get_status from './get_status';

export async function is_clean_status(dir_path: string) {
    return (await get_status(dir_path)).clean;
}
