import sub_has from 'razomy.array/sub_has';

export default function is_cache_has_sub_array(master: string[], sub: string | string[]): boolean {
    if (Array.isArray(sub)) {
    return sub_has(master, sub)

    }

    return master.includes(sub)
}
