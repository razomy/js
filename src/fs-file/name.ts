
export function name(prefix: string, ...extensions: string[]) {
    return [prefix, ...extensions].filter(Boolean).join('.');
}
