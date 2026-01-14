import get from './get';

export default async function get_bool(query: string) {
    const r = await get(query);
    return r.toLowerCase().trim().startsWith('y');
}
