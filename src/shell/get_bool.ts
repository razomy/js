import {get} from './get';

export async function get_bool(query: string) {
    const r = await get(query);
    return r.toLowerCase().trim().startsWith('y');
}
