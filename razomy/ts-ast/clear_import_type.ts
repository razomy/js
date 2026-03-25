
export function clearImportType(rawType: string) {
    return rawType
    .replace(/import\([^)]+\)\./g, '') // removes import("...").
    .replace(/[a-zA-Z_$][\w$]*\./g, '');
}
